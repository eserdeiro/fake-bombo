import { IsString, MaxLength, MinLength, IsUrl } from 'class-validator';

export class CreateSocialMediaDto {

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    type: string;

    @IsUrl()
    @MaxLength(255)
    url: string;

}