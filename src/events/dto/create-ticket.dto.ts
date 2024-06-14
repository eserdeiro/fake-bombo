import { IsNotEmpty, IsString, MaxLength, IsInt, Min, IsOptional, MinLength, IsNumber, IsPositive } from 'class-validator';

export class CreateTicketDto {

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    title: string;

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @IsNumber()
    @IsPositive()
    @Min(0)
    price: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;
}