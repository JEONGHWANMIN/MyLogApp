import {
  Body,
  Controller,
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

  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@GetTokenUser() user: AccessTokenPayload) {
    return this.usersService.logout(user.userId);
  }

  @Get('/check')
  findEmail(@Query('email') email: string) {
    return this.usersService.checkDuplicateEmail(email);
  }

  /**
   * TODO: 회원 탈퇴 기능 만들어야 한다.
   */

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@GetTokenUser() user: RefreshTokenPayload) {
    const userId = user.userId;
    const refreshToken = user.refreshToken;
    return this.usersService.refreshTokens(userId, refreshToken);
  }
}
