import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }
}
