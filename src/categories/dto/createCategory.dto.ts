import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CanBeUndefined } from 'src/utils/canBeUndefined';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt({ each: true })
  @CanBeUndefined()
  nestedCategoryIds?: number[];
}

export default CreateCategoryDto;
