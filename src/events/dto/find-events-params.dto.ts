import { IsISO8601, IsOptional } from 'class-validator';

export class FindEventsParamsDto {
  @IsOptional()
  @IsISO8601({
    strict: true,
  })
  date?: string;
}
