import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  BadRequestException,
  Inject,
  InternalServerErrorException
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    @Inject(CloudinaryService)
    private readonly _cloudinaryService: CloudinaryService
  ) { }

  @Post('image')
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      files: 1,
    },
  }))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)', }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
        ],
        exceptionFactory: (error: string) => handleFileErrorImage(error)
      })
    ) file: Express.Multer.File,
  ) {
    const response = await this._cloudinaryService.uploadImage(file).catch(err => {
      throw new InternalServerErrorException('An error has occurred while uploading the image')
    })
    return { url: response.url };
  }
}

function handleFileErrorImage(error: string): BadRequestException {
  let message: string;

  switch (true) {
    case error.includes('expected type is'):
      message = 'Invalid file type. Only PNG | JPEG | JPG are allowed.';
      break;
    case error.includes('expected size is less than'):
      message = 'File size too large. Maximum size allowed is 3MB.';
      break;
    default:
      message = `An error occurred, ${error}`;
      break;
  }

  return new BadRequestException(message);

}
