import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';
import { QuerysDto as QuerysDto } from 'src/common/dto/querys.dto';
import { ErrorHandlingService } from 'src/common/error-handling/error-handling.service';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly dataSource: DataSource
  ) { }

  async create(createEventDto: CreateEventDto) {
    try {
      const { tickets = [], ...eventDetails } = createEventDto

      const event = this.eventRepository.create({
        ...eventDetails,
        tickets: tickets.map(ticket => this.ticketRepository.create(ticket))
      })

      await this.eventRepository.save(event)

      return event

    } catch (error) {
      this.errorHandlingService.handleDatabaseErrors(error)
    }

  }

  async findAll(querysDto: QuerysDto) {
    const { limit = 10, offset = 0, search } = querysDto
    const events = await this.eventRepository.find({
      take: limit,
      skip: offset,
      where: search ? { title: ILike(`%${search}%`) } : {},
      relations: {
        tickets: true
      }
    });

    return events;
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: {
        tickets: true
      }
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const { tickets, ...toUpdate } = updateEventDto

    const event = await this.eventRepository.preload({ id, ...toUpdate })

    if (!event) throw new NotFoundException(`Event with ${id} not found`)

    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      if (tickets) {
        await queryRunner.manager.delete(Ticket, { event: id })
        event.tickets = tickets.map(ticket => this.ticketRepository.create(ticket))
      }

      await queryRunner.manager.save(event)
      await queryRunner.commitTransaction()
      await queryRunner.release()
      return this.findOne(id)
    } catch (error) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      this.errorHandlingService.handleDatabaseErrors(error)
    }
  }

  async remove(id: string) {
    const event = await this.findOne(id)

    await this.eventRepository.remove(event);

    return { message: `Event with id ${id} has been removed` };

  }

  async deleteAll() {
    const query = this.eventRepository.createQueryBuilder('event')

    try {
      return await query
        .delete()
        .where({})
        .execute()
    } catch (error) {
      this.errorHandlingService.handleDatabaseErrors(error)
    }
  }
}
