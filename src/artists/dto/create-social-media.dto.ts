import { IsString, MaxLength, IsNotEmpty, IsIn } from 'class-validator';
import { IsValidSocialURL } from '../../common/validators/custom-validators';

export class CreateSocialMediaDto {
    @IsIn(['soundcloud', 'spotify', 'instagram'], { message: 'Type must be one of the following: soundcloud, spotify, instagram' })
    type: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @IsValidSocialURL()
    url: string;
}