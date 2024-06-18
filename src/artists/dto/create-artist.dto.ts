import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreateSocialMediaDto } from "./create-social-media.dto"
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
    @ApiProperty({
        description: 'Name of the artist',
        example: 'The Beatles'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string

    @ApiProperty({
        description: 'About the artist',
        example: 'The Beatles were an English rock band formed in Liverpool in 1960.'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    about: string

    @ApiProperty({
        description: 'Image URL for the artist',
        example: '/default.png',
        required: false
    })
    @IsString()
    @IsOptional()
    image?: string

    @ApiProperty({
        description: 'Country code of the artist',
        example: 'GB'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(2)
    country_code: string

    @ApiProperty({
        description: 'Unique slug for the artist',
        example: 'the-beatles',
        required: false
    })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    slug?: string

    @ApiProperty({
        description: 'List of social media links for the artist',
        type: [CreateSocialMediaDto],
        required: false
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSocialMediaDto)
    @IsOptional()
    social_media?: CreateSocialMediaDto[]
}
