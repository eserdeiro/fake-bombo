import { IsString, MaxLength, IsNotEmpty, IsIn } from 'class-validator';
import { IsValidSocialURL } from '../validators/custom-validators';
import { socialMediaTypesList } from '../constants/social-media-types'

export class CreateSocialMediaDto {
    @IsIn(socialMediaTypesList, { message: `Type must be one of the following: ${socialMediaTypesList.join(', ')}` })
    type: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @IsValidSocialURL()
    url: string;
}