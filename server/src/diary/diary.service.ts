import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiaryDto } from './dto/diary.dto';

// https://velog.io/@jonghyun3668/Nestjs-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

@Injectable()
export class DiaryService {
  constructor(private prismaService: PrismaService) {}

  async getAllDiaries() {
    // 특정 사용자의 모든 다이어리 가져오기 로직

    const diaries = await this.prismaService.diary.findMany();

    return {
      message: '다이어리 조회가 성공했습니다.',
      data: diaries,
    };
  }

  async getDiaryById(userId: number, diaryId: number) {
    const diary = await this.prismaService.diary.findUnique({
      where: {
        id: diaryId,
      },
    });

    return {
      message: '다이어리 조회가 성공했습니다.',
      data: diary,
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
}
