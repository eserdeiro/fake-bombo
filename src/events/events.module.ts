import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    TypeOrmModule.forFeature([Event, Ticket]), // Event entity
    CommonModule
  ],
  exports: [EventsService, TypeOrmModule]
})
export class EventsModule { }
