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

  /**
   * Creates a new event with associated tickets.
   * @param createEventDto The DTO containing event details and tickets.
   * @returns The newly created event.
   */
  async create(createEventDto: CreateEventDto) {
    try {
      const { tickets = [], ...eventDetails } = createEventDto;

      // Create a new event entity with the provided details.
      const event = this.eventRepository.create({
        ...eventDetails,
        // Map the provided tickets to Ticket entities.
        tickets: tickets.map(ticket => this.ticketRepository.create(ticket))
      });

      // Save the event to the database.
      await this.eventRepository.save(event);

      // Return the created event.
      return event;

    } catch (error) {
      // Handle database errors using the error handling service.
      this.errorHandlingService.handleDatabaseErrors(error);
    }
  }

  /**
   * Retrieves all events with optional pagination and search functionality.
   * @param querysDto The DTO containing query parameters.
   * @returns An array of events.
   */
  async findAll(querysDto: QuerysDto) {
    const { limit = 10, offset = 0, search } = querysDto;
    // Find events with specified parameters, including tickets.
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

  /**
   * Retrieves a single event by its ID.
   * @param id The ID of the event to retrieve.
   * @returns The event with the specified ID.
   */
  async findOne(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: {
        tickets: true
      }
    });

    // Throw a NotFoundException if the event is not found.
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  /**
   * Updates an existing event.
   * @param id The ID of the event to update.
   * @param updateEventDto The DTO containing the updated event details.
   * @returns The updated event.
   */
  async update(id: string, updateEventDto: UpdateEventDto) {
    const { tickets, ...toUpdate } = updateEventDto;

    // Preload the event with the specified ID and update it with the provided data.
    const event = await this.eventRepository.preload({ id, ...toUpdate });

    // Throw a NotFoundException if the event is not found.
    if (!event) throw new NotFoundException(`Event with ${id} not found`);

    // Create a query runner for transaction management.
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect to the database and start a transaction.
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // If tickets are provided, delete existing tickets and create new ones.
      if (tickets) {
        await queryRunner.manager.delete(Ticket, { event: id });
        event.tickets = tickets.map(ticket => this.ticketRepository.create(ticket));
      }

      // Save the updated event to the database.
      await queryRunner.manager.save(event);

      // Commit the transaction and release the query runner.
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // Return the updated event.
      return this.findOne(id);
    } catch (error) {
      // Rollback the transaction and release the query runner if an error occurs.
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      // Handle database errors using the error handling service.
      this.errorHandlingService.handleDatabaseErrors(error);
    }
  }

  /**
   * Deletes an event by its ID.
   * @param id The ID of the event to delete.
   * @returns A success message.
   */
  async remove(id: string) {
    const event = await this.findOne(id);

    // Remove the event from the database.
    await this.eventRepository.remove(event);

    return { message: `Event with id ${id} has been removed` };
  }

  /**
   * Deletes all events.
   * @returns The result of the delete operation.
   */
  async deleteAll() {
    const query = this.eventRepository.createQueryBuilder('event');

    try {
      // Delete all events using a query builder.
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      // Handle database errors using the error handling service.
      this.errorHandlingService.handleDatabaseErrors(error);
    }
  }
}
