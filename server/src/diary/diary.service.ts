import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiaryDto } from './dto/diary.dto';
import {
  SearchDiariesDto,
  SearchDiaryYearMonthDto,
} from './dto/searchDiary.dto';
import { Page } from 'src/common/utils/Page/Page';
import { DateUtils } from 'src/common/utils/DateUtils';

@Injectable()
export class DiaryService {
  constructor(private prismaService: PrismaService) {}

  getDiaryDateFilter(
    searchQueryParam: SearchDiariesDto | SearchDiaryYearMonthDto,
  ) {
    const { year, month } = searchQueryParam;

    let dateFilter = {};
    if (year && month) {
      const numberYear = Number(year);
      const numberMonth = Number(month);

      dateFilter = {
        createdAt: {
          gte: new Date(`${numberYear}-${numberMonth}-01`),
          lt: new Date(
            numberMonth < 12
              ? `${numberYear}-${numberMonth + 1}-01`
              : `${numberYear + 1}-01-01`,
          ),
        },
      };
    }

    return { dateFilter };
  }

  async getAllDiaries(searchQueryParam: SearchDiariesDto, userId: number) {
    const contentContains = searchQueryParam.content;

    const { dateFilter } = this.getDiaryDateFilter(searchQueryParam);

    const diaries = await this.prismaService.diary.findMany({
      where: {
        userId,
        content: {
          contains: contentContains,
        },
        ...dateFilter,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: searchQueryParam.getLimit(),
      skip: searchQueryParam.getOffset(),
    });

    return {
      message: '다이어리 조회가 성공했습니다.',
      data: new Page({
        totalCount: diaries.length,
        page: searchQueryParam.page,
        size: searchQueryParam.size,
        items: diaries,
      }),
    };
  }

  async getDiaryById(userId: number, diaryId: number) {
    const diary = await this.prismaService.diary.findUnique({
      where: {
        id: diaryId,
      },
      include: {
        tags: {
          select: {
            tag: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    if (!diary) {
      throw new NotFoundException('Diary not found');
    }

    if (diary.userId !== userId) {
      throw new ForbiddenException('Unauthorized access to diary');
    }

    const tags = diary.tags.map((tagItem) => tagItem.tag.title);

    const copyDiary = {
      ...diary,
      tags,
    };

    return {
      message: '다이어리 조회가 성공했습니다.',
      data: copyDiary,
    };
  }

  async getDiarySummary(
    searchQueryParam: SearchDiaryYearMonthDto,
    userId: number,
  ) {
    const { dateFilter } = this.getDiaryDateFilter(searchQueryParam);

    const diaries = await this.prismaService.diary.findMany({
      where: {
        userId,
        ...dateFilter,
      },
    });

    const uniqueDiaryDates = new Set();

    diaries.forEach((diary) => {
      const date = new Date(diary.createdAt);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const dateString = `${year}-${month}-${day}`;

      if (!uniqueDiaryDates.has(dateString)) {
        uniqueDiaryDates.add(dateString);
      }
    });

    const userDiaryDateList = [...uniqueDiaryDates];

    console.log(userDiaryDateList);

    const moodCountMap = {};
    const weatherCountMap = {};

    diaries.forEach((diary) => {
      const mood = diary.mood;
      const weather = diary.weather;

      if (mood) {
        moodCountMap[mood] = (moodCountMap[mood] || 0) + 1;
      }

      if (weather) {
        weatherCountMap[weather] = (weatherCountMap[weather] || 0) + 1;
      }
    });

    const monthDiariesCount = userDiaryDateList.length;

    const totalDayCount = DateUtils.monthTotalDayCount(
      searchQueryParam.year,
      searchQueryParam.month,
    );

    const diaryWritePercentage = Math.round(
      (monthDiariesCount / totalDayCount) * 100,
    );

    const response = {
      totalDayCount,
      monthDiariesCount,
      diaryWritePercentage,
      userDiaryDateList,
      moodCountMap,
      weatherCountMap,
    };

    return {
      message: '일기 요약 조회에 성공 했습니다.',
      data: response,
    };
  }

  async createDiary(userId: number, createDiaryDto: CreateDiaryDto) {
    const tagMaps = {
      create: createDiaryDto?.tags.map((tag) => ({
        tag: {
          connectOrCreate: {
            where: { title: tag },
            create: { title: tag },
          },
        },
      })),
    };

    await this.prismaService.diary.create({
      data: {
        userId,
        title: createDiaryDto.title,
        content: createDiaryDto.content,
        mood: createDiaryDto.mood,
        weather: createDiaryDto.weather,
        tags: tagMaps,
      },
    });

    return {
      message: '일기가 정상적으로 등록되었습니다.',
    };
  }

  async updateDiary(
    userId: number,
    diaryId: number,
    updateDiaryDto: CreateDiaryDto,
  ) {
    await this.getDiaryById(userId, diaryId);

    await this.prismaService.diary.update({
      where: {
        id: diaryId,
      },
      data: {
        userId,
        title: updateDiaryDto.title,
        content: updateDiaryDto.content,
        mood: updateDiaryDto.mood,
        weather: updateDiaryDto.weather,
        tags: {
          set: [],
        },
      },
    });

    const tagMaps = {
      create: updateDiaryDto?.tags.map((tag) => ({
        tag: {
          connectOrCreate: {
            where: { title: tag },
            create: { title: tag },
          },
        },
      })),
    };

    await this.prismaService.diary.update({
      where: {
        id: diaryId,
      },
      data: {
        tags: tagMaps,
      },
    });

    return {
      message: '다이어리 수정이 성공했습니다.',
    };
  }

  async deleteDiary(userId: number, diaryId: number) {
    await this.getDiaryById(userId, diaryId);

    await this.prismaService.diary.deleteMany({
      where: {
        id: diaryId,
        userId: userId,
      },
    });

    return {
      message: '일기가 성공적으로 삭제되었습니다.',
    };
  }
}
