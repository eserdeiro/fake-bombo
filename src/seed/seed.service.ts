import { Injectable } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';
import { seedEventData } from './data/seed-event-data';
import { ArtistsService } from 'src/artists/artists.service';
import { seedArtistData } from './data/seed-artist-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly eventService: EventsService,
    private readonly artistService: ArtistsService
  ) { }

  /**
   * Executes the seed process, inserting events and artists into the database.
   * @returns An object containing the seed execution message, total items inserted, and detailed results.
   */
  async executeSeed() {
    const results = await this.insertNewProducts()
    return {
      message: 'Seed executed',
      allItems: results.artists.count + results.events.count,
      results: results
    };
  }

  /**
   * Inserts new events and artists into the database.
   * @returns An object containing the count and data of inserted events and artists.
   */
  async insertNewProducts() {
    const eventService = this.eventService;
    const artistService = this.artistService;

    // Delete all existing events and artists before seeding.
    await eventService.deleteAll();
    await artistService.deleteAll();

    const { events } = seedEventData;
    const { artists } = seedArtistData;

    // Create promises for inserting each event and artist.
    const eventPromises = events.map(event => eventService.create(event));
    const artistPromises = artists.map(artist => artistService.create(artist));

    // Execute the promises concurrently and wait for all to complete.
    const eventResults = await Promise.all(eventPromises);
    const artistResults = await Promise.all(artistPromises);

    // Return the results of the seed operation.
    const results = {
      events: {
        count: eventResults.length,
        data: eventResults
      },
      artists: {
        count: artistResults.length,
        data: artistResults
      }
    };
    return results;
  }

}
