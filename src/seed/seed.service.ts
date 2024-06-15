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

  async executeSeed() {
    const results = await this.insertNewProducts()
    return {
      message: 'Seed executed',
      allItems: results.artists.count + results.events.count,
      results: results
    };
  }

  async insertNewProducts() {
    const eventService = this.eventService;
    const artistService = this.artistService;

    await eventService.deleteAll();
    await artistService.deleteAll();

    const { events } = seedEventData;
    const { artists } = seedArtistData;

    const eventPromises = events.map(event => eventService.create(event));
    const artistPromises = artists.map(artist => artistService.create(artist));

    const eventResults = await Promise.all(eventPromises);
    const artistResults = await Promise.all(artistPromises);

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
