import { Injectable } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';
import { seedData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly eventService: EventsService
  ) { }

  async executeSeed() {
    const result = await this.insertNewProducts()
    return {
      message: 'Seed executed',
      count: result.length,
      results: result
    };
  }

  async insertNewProducts() {
    await this.eventService.deleteAllEvents()

    const events = seedData.events

    const insertPromises = []

    events.forEach(event => {
      insertPromises.push(this.eventService.create(event))
    });
    const results = await Promise.all(insertPromises)
    return results
  }
}
