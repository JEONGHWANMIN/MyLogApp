import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards';
import { DiaryService } from './diary.service';
import { GetTokenUser } from 'src/common/decorator/user.decorator';
import { AccessTokenPayload } from 'src/users/types/TokenPayload.type';
import { CreateDiaryDto } from './dto/diary.dto';
import { SearchDiariesDto } from './dto/searchDiary.dto';

@Injectable()
@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  async getAllDiaries(@Query() pageDto: SearchDiariesDto) {
    return await this.diaryService.getAllDiaries(pageDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async getDiaryById(
    @GetTokenUser() user: AccessTokenPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = user.userId;
    return await this.diaryService.getDiaryById(userId, id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/')
  async createDiary(
    @GetTokenUser() user: AccessTokenPayload,
    @Body() createDiaryDto: CreateDiaryDto,
  ) {
    const userId = user.userId;
    return await this.diaryService.createDiary(userId, createDiaryDto);
  }

  // TODO: 다이어리 수정하기

  // TODO: 다이어리 삭제하기
}
