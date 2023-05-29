import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiaryDto } from './dto/diary.dto';
import { SearchDiariesDto } from './dto/searchDiary.dto';
import { Page } from 'src/common/utils/Page/Page';

@Injectable()
export class DiaryService {
  constructor(private prismaService: PrismaService) {}

  async getAllDiaries(pageDto: SearchDiariesDto) {
    const totalCount = await this.prismaService.diary.count();

    const diaries = await this.prismaService.diary.findMany({
      take: pageDto.getLimit(),
      skip: pageDto.getOffset(),
    });

    return {
      message: '다이어리 조회가 성공했습니다.',
      data: new Page({
        totalCount,
        page: pageDto.page,
        size: pageDto.size,
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
