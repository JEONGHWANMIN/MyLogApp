import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [DocsController],
})
export class DocsModule {}
