import { IsNotEmpty, IsString, MaxLength, IsInt, Min, IsOptional, MinLength, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {

    @ApiProperty({
        description: 'Title of the ticket',
        example: 'General Admission'
    })
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    title: string;

    @ApiProperty({
        description: 'Description of the ticket',
        example: 'General admission to the event'
    })
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @ApiProperty({
        description: 'Price of the ticket',
        example: 50
    })
    @IsNumber()
    @IsPositive()
    @Min(0)
    price: number;

    @ApiProperty({
        description: 'Stock of the ticket',
        example: 100,
        required: false
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;
}
