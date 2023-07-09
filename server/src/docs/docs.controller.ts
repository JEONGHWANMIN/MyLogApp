import { Controller, Get, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
@Controller('api-docs')
export class DocsController {
  @Get('/')
  async getOpenAPi() {
    const openapi = fs.readFileSync('generate/openapi.json', 'utf-8');
    return openapi;
  }
}
