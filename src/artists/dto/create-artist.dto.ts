import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator"
import { SocialMedia } from "../entities/social-media.entity"
import { Type } from "class-transformer"
import { CreateSocialMediaDto } from "./create-social-media.dto"

export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    about: string

    @IsString()
    @IsOptional()
    image?: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(2)
    country_code: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSocialMediaDto)
    @IsOptional()
    social_media: SocialMedia[]
}
