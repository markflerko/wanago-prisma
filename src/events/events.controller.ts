import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransformPlainToInstance } from 'class-transformer';
import { CreateEventDto } from 'src/events/dto/events.dto';
import { FindEventsParamsDto } from 'src/events/dto/find-events-params.dto';
import { EventsService } from 'src/events/events.service';
import { EventResponseDto } from 'src/events/response/event-response.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @TransformPlainToInstance(EventResponseDto)
  getAll(@Query() { date }: FindEventsParamsDto) {
    if (date) {
      return this.eventsService.search(date);
    }
    return this.eventsService.getAll();
  }

  @Post()
  @TransformPlainToInstance(EventResponseDto)
  async create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }
}
