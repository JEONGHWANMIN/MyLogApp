import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { UsersService } from './users.service';
import { GetTokenUser } from 'src/common/decorator/user.decorator';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './types/TokenPayload.type';

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

  @Get('/check')
  findEmail(@Query('email') email: string) {
    return this.usersService.checkDuplicateEmail(email);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/')
  logout(@GetTokenUser() user: AccessTokenPayload) {
    return this.usersService.logout(user.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/')
  deleteUser(@GetTokenUser() user: AccessTokenPayload) {
    return this.usersService.delete(user.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/renew')
  refreshTokens(@GetTokenUser() user: RefreshTokenPayload) {
    const userId = user.userId;
    const refreshToken = user.refreshToken;
    return this.usersService.refreshTokens(userId, refreshToken);
  }
}
