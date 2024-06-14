import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class QuerysDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // Convert string to number
    limit?: number

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number


    @IsOptional()
    @MinLength(1)
    @IsString()
    search?: string
}