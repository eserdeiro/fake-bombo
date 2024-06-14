import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [EventsModule]
})
export class SeedModule { }
