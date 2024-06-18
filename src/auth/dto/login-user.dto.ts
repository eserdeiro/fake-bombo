import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
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
}
