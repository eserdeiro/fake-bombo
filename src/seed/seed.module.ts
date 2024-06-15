import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { EventsModule } from 'src/events/events.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [EventsModule, ArtistsModule]
})
export class SeedModule { }
