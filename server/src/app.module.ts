import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigsModule } from './configs/configs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigsModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
