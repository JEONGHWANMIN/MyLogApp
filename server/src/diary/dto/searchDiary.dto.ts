import { IsOptional, IsString } from 'class-validator';
import { PageRequest } from 'src/common/utils/Page/PageRequest';

export class SearchDiariesDto extends PageRequest {
  @IsString()
  @IsOptional()
  content?: string;
}
