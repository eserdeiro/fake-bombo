import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialMediaDto } from './create-social-media.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSocialMediaDto extends PartialType(CreateSocialMediaDto) {
    @ApiPropertyOptional({
        description: 'Type of social media link',
        example: 'soundcloud',
    })
    type?: string;

    @ApiPropertyOptional({
        description: 'URL of the social media link',
        example: 'https://soundcloud.com/thebeatles',
    })
    url?: string;
}
