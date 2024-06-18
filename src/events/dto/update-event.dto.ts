import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @ApiPropertyOptional({
        description: 'Title of the event',
        example: 'Concert of the Year',
    })
    title?: string;

    @ApiPropertyOptional({
        description: 'Description of the event',
        example: 'An amazing concert with the best artists of the year',
    })
    description?: string;

    @ApiPropertyOptional({
        description: 'Date of the event in ISO 8601 format with time component, e.g., 2024-07-15T15:00:00Z',
        example: '2024-07-15T15:00:00Z',
    })
    date?: string;

    @ApiPropertyOptional({
        description: 'Unique slug for the event',
        example: 'concert-of-the-year',
    })
    slug?: string;

    @ApiPropertyOptional({
        description: 'Image URL for the event',
        example: '/default.png',
    })
    image?: string;

    @ApiPropertyOptional({
        description: 'List of tickets associated with the event',
        type: [CreateTicketDto],
    })
    tickets?: CreateTicketDto[];
}
