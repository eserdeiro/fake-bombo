import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
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

    @IsDateString()
    date: Date;

    @IsString()
    @IsOptional()
    slug?: string

    @IsString()
    @IsOptional()
    image: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTicketDto)
    tickets: CreateTicketDto[];
}
