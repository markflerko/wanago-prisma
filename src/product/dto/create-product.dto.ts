import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import IsJsonObject from 'src/utils/isJsonObject';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsJsonObject()
  @IsOptional()
  properties?: Prisma.InputJsonObject;
}
