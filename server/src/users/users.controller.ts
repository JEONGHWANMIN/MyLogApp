import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';

@Injectable()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/signin')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@Req() req: Request) {
    return this.usersService.logout(req.user['userId']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['userId'];
    const refreshToken = req.user['refreshToken'];
    return this.usersService.refreshTokens(userId, refreshToken);
  }
}
