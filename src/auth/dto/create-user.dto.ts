import { ArrayUnique, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ValidRoles } from "../interfaces/valid-roles.interface";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'User email',
        example: 'john.doe@example.com'
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'User password',
        example: 'P@$$wOrd1'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a uppercase, lowercase letter and a number'
    })
    password: string

    @ApiProperty({
        description: 'User fullname',
        example: 'John Doe'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    fullname: string

    @ApiProperty({
        description: 'User roles',
        example: ['admin'],
        required: false
    })
    @IsArray()
    @ArrayUnique()
    @IsEnum(ValidRoles, {
        each: true,
        message: (args) => `Role must be one of the following: ${Object.values(ValidRoles).join(', ')}.'
        ' Your input: ${args.value}`
    })
    @IsOptional()
    roles?: ValidRoles[];
}
