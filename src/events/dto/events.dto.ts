import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsISO8601({
    strict: true,
  })
  startDate: string;

  @IsISO8601({
    strict: true,
  })
  endDate: string;
}
