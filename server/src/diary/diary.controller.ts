import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards';
import { DiaryService } from './diary.service';
import { GetTokenUser } from 'src/common/decorator/user.decorator';
import { AccessTokenPayload } from 'src/users/types/tokenPayload';
import { CreateDiaryDto } from './dto/diary.dto';
import { SearchDiariesDto } from './dto/searchDiary.dto';

@Injectable()
@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  async getAllDiaries(
    @Query() searchQueryParam: SearchDiariesDto,
    @GetTokenUser() user: AccessTokenPayload,
  ) {
    return await this.diaryService.getAllDiaries(searchQueryParam, user.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async getDiaryById(
    @GetTokenUser() user: AccessTokenPayload,
    @Param('id', ParseIntPipe) diaryId: number,
  ) {
    const userId = user.userId;
    return await this.diaryService.getDiaryById(userId, diaryId);
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

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  async updateDiary(
    @GetTokenUser() user: AccessTokenPayload,
    @Param('id', ParseIntPipe) diaryId,
    @Body() updateDiaryDto: CreateDiaryDto,
  ) {
    return this.diaryService.updateDiary(user.userId, diaryId, updateDiaryDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteDiary(
    @Param('id', ParseIntPipe) diaryId: number,
    @GetTokenUser() user: AccessTokenPayload,
  ) {
    return await this.diaryService.deleteDiary(user.userId, diaryId);
  }
}
