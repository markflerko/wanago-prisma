import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import IsJsonObject from 'src/utils/isJsonObject';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsJsonObject()
  @IsOptional()
  properties?: Prisma.InputJsonObject;
}
