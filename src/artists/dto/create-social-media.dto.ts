import { IsString, MaxLength, MinLength, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateSocialMediaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    type: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    url: string;
}