import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [UsersService],
  controllers: [UsersController, AccessTokenStrategy, RefreshTokenStrategy],
})
export class UsersModule {}
