import { IsOptional, IsString } from 'class-validator';
import { PageRequest } from 'src/common/utils/Page/PageRequest';

export class SearchDiariesDto extends PageRequest {
  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  year?: string;

  @IsString()
  @IsOptional()
  month?: string;
}

export class SearchDiaryYearMonthDto {
  @IsString()
  @IsOptional()
  year?: string;

  @IsString()
  @IsOptional()
  month?: string;
}
