import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReplacePostDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];

  @IsISO8601({
    strict: true,
  })
  @IsOptional()
  scheduledDate: string | null = null;
}
