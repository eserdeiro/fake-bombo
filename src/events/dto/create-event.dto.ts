import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, ValidateNested } from "class-validator";
import { CreateTicketDto } from "./create-ticket.dto";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;

    //@IsDateString({ strict: true })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, {
        message: 'Date must be in ISO 8601 format with time component, e.g., 2024-07-15T15:00:00Z'
    })
    date: string;

    @IsString()
    @IsOptional()
    slug?: string

    @IsString()
    @IsOptional()
    image: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTicketDto)
    @IsOptional()
    tickets?: CreateTicketDto[];
}
