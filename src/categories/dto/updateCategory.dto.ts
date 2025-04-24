import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CanBeUndefined } from 'src/utils/canBeUndefined';

export class UpdateCategoryDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsInt({ each: true })
  @CanBeUndefined()
  nestedCategoryIds?: number[];
}

export default UpdateCategoryDto;
