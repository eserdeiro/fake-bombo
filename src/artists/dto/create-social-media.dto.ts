import { IsString, MaxLength, IsNotEmpty, IsIn } from 'class-validator';
import { IsValidSocialURL } from '../validators/custom-validators';
import { socialMediaTypesList } from '../constants/social-media-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSocialMediaDto {
    @ApiProperty({
        description: 'Type of social media link',
        example: 'soundcloud',
        enum: socialMediaTypesList,
    })
    @IsIn(socialMediaTypesList, { message: `Type must be one of the following: ${socialMediaTypesList.join(', ')}` })
    type: string;

    @ApiProperty({
        description: 'URL of the social media link',
        example: 'https://soundcloud.com/thebeatles',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @IsValidSocialURL()
    url: string;
}
