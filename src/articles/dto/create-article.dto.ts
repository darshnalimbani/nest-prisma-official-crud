import { ApiProperty } from '@nestjs/swagger';
import { IsString , IsBoolean, IsOptional} from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}