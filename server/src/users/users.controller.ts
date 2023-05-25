import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Injectable()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
