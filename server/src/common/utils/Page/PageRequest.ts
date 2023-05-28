//pageRequest.ts
import { IsOptional, IsString } from 'class-validator';

export class PageRequest {
  @IsString()
  @IsOptional()
  page?: number | 1;

  @IsString()
  @IsOptional()
  size?: number | 10;

  getOffset(): number {
    if (this.page < 1 || this.page === null || this.page === undefined) {
      this.page = 1;
    }

    if (this.size < 1 || this.size === null || this.size === undefined) {
      this.size = 10;
    }

    return (Number(this.page) - 1) * Number(this.size);
  }

  getLimit(): number {
    if (this.size < 1 || this.size === null || this.size === undefined) {
      this.size = 10;
    }
    return Number(this.size);
  }
}
