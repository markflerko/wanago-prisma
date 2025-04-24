import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ArticlesSearchParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  textSearch?: string | null;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  upvotesGreaterThan?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  categoryName?: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  authorNameToAvoid?: string;
}
