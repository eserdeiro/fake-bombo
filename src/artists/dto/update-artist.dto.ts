import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSocialMediaDto } from './create-social-media.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
    @ApiPropertyOptional({
        description: 'Name of the artist',
        example: 'The Beatles',
    })
    name?: string;

    @ApiPropertyOptional({
        description: 'About the artist',
        example: 'The Beatles were an English rock band formed in Liverpool in 1960.',
    })
    about?: string;

    @ApiPropertyOptional({
        description: 'Image URL for the artist',
        example: '/default.png',
    })
    image?: string;

    @ApiPropertyOptional({
        description: 'Country code of the artist',
        example: 'GB',
    })
    country_code?: string;

    @ApiPropertyOptional({
        description: 'Unique slug for the artist',
        example: 'the-beatles',
    })
    slug?: string;

    @ApiPropertyOptional({
        description: 'List of social media links for the artist',
        type: [CreateSocialMediaDto],
    })
    social_media?: CreateSocialMediaDto[]
}
