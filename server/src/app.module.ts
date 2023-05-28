import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigsModule } from './configs/configs.module';
import { UsersModule } from './users/users.module';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [ConfigsModule, PrismaModule, UsersModule, DiaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
