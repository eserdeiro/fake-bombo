import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class EventsService {

  private readonly logger = new Logger('EventsService')

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ) { }

  async create(createEventDto: CreateEventDto) {
    try {
      const event = this.eventRepository.create(createEventDto);
      event.tickets = this.ticketRepository.create(createEventDto.tickets);
      event.tickets.forEach(ticket => {
        ticket.event = event;
      });
      await this.eventRepository.save(event);

      const result = {
        ...event,
        tickets: event.tickets.map(ticket => {
          const { event, ...ticketData } = ticket;
          return ticketData;
        })
      };

      return result;

    } catch (error) {
      this.handleExeptions(error)
    }

  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  private handleExeptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check the server logs')
  }
}
