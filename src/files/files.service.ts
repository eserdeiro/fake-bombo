import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FilesService {
    constructor(
        @Inject(CloudinaryService)
        private readonly _cloudinaryService: CloudinaryService
    ) { }

    async uploadImage(file: Express.Multer.File) {
        try {
            const response = await this._cloudinaryService.uploadImage(file);
            return { url: response.url };
        } catch (err) {
            throw new InternalServerErrorException('An error has occurred while uploading the image');
        }
    }
}
