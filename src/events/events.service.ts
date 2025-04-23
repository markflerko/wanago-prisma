import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Range, RANGE_LB_INC, RANGE_UB_INC, serialize } from 'postgres-range';
import { CreateEventDto } from 'src/events/dto/events.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  search(date: string) {
    return this.prismaService.$queryRaw`
      SELECT id, name, "dateRange"::text FROM "Event"
      WHERE "dateRange" @> ${date}::timestamptz
    `;
  }

  getAll() {
    return this.prismaService.$queryRaw`
      SELECT id, name, "dateRange"::text FROM "Event"
    `;
  }

  async create(eventData: CreateEventDto) {
    const range = new Range(
      eventData.startDate,
      eventData.endDate,
      RANGE_LB_INC | RANGE_UB_INC,
    );

    const queryResponse = await this.prismaService.$queryRaw`
      INSERT INTO "Event"(
        name, "dateRange"  
      )
      VALUES (
        ${eventData.name},
        ${serialize(range)}::tstzrange
      )
      RETURNING id, name, "dateRange"::text
    `;
    if (Array.isArray(queryResponse) && queryResponse.length === 1) {
      return queryResponse[0];
    }
    throw new InternalServerErrorException();
  }
}
