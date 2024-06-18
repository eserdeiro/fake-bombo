import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QuerysDto } from 'src/common/dto/querys.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBody, ApiQuery, ApiParam, ApiBadRequestResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { Event } from './entities/event.entity';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  @ApiCreatedResponse({ type: Event })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: CreateEventDto })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOkResponse({ type: Event })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limit the number of events returned.' })
  @ApiQuery({ name: 'offset', required: false, description: 'Offset the starting point of the returned events.' })
  @ApiQuery({ name: 'search', required: false, description: 'Search for events by title.' })
  findAll(@Query() querysDto: QuerysDto) {
    return this.eventsService.findAll(querysDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The event has been successfully retrieved.', type: Event })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Event with ID ${id} not found' })
  @ApiParam({ name: 'id', description: 'The ID of the event to retrieve.', required: true, type: 'string' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Event })
  @ApiNotFoundResponse({ description: 'Event with ID ${id} not found' })
  @ApiParam({ name: 'id', description: 'The ID of the event to update.', required: true, type: 'string' })
  @ApiBody({ type: UpdateEventDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Event with id ${id} has been removed' })
  @ApiNotFoundResponse({ description: 'Event with ID ${id} not found' })
  @ApiParam({ name: 'id', description: 'The ID of the event to delete.', required: true, type: 'string' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.remove(id);
  }
}
