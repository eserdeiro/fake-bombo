import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, ValidateNested } from "class-validator";
import { CreateTicketDto } from "./create-ticket.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
    @ApiProperty({
        description: 'Title of the event',
        example: 'Concert of the Year'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @ApiProperty({
        description: 'Description of the event',
        example: 'An amazing concert with the best artists of the year'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;

    @ApiProperty({
        description: 'Date of the event in ISO 8601 format with time component, e.g., 2024-07-15T15:00:00Z',
        example: '2024-07-15T15:00:00Z'
    })
    //@IsDateString({ strict: true })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, {
        message: 'Date must be in ISO 8601 format with time component, e.g., 2024-07-15T15:00:00Z'
    })
    date: string;

    @ApiProperty({
        description: 'Unique slug for the event',
        example: 'concert-of-the-year',
        required: false
    })
    @IsString()
    @IsOptional()
    slug?: string

    @ApiProperty({
        description: 'Image URL for the event',
        example: '/default.png',
        required: false
    })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({
        description: 'List of tickets associated with the event',
        type: [CreateTicketDto],
        required: false
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTicketDto)
    @IsOptional()
    tickets?: CreateTicketDto[];
}
