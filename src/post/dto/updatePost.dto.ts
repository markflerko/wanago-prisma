import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CanBeNull } from '../../utils/canBeNull';
import { CanBeUndefined } from '../../utils/canBeUndefined';

export class UpdatePostDto {
  @IsNumber()
  @CanBeUndefined()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @CanBeUndefined()
  title?: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @CanBeUndefined()
  paragraphs?: string[];

  @IsISO8601({
    strict: true,
  })
  @CanBeUndefined()
  @CanBeNull()
  scheduledDate?: string | null;
}
