import { ArrayUnique, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ValidRoles } from "../interfaces/valid-roles.interface";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a uppercase, lowercase letter and a number'
    })
    password: string

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    fullname: string

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
