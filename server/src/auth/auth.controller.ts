import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('/signup')
  signUp(): string {
    return 'This action returns all cats';
  }
}
