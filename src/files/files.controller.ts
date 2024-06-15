import { Controller, Post, UploadedFile, UseInterceptors, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, BadRequestException, Inject } from '@nestjs/common';
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

  @Post('event')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)', }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 })
        ],
        exceptionFactory: (error: string) => handleFileError(error)
      })

    ) file: Express.Multer.File,
  ) {
    const response = await this._cloudinaryService.uploadImage(file)
    return { url: response.url };
  }
}

function handleFileError(error: string): BadRequestException {
  let message: string;

  switch (true) {
    case error.includes('expected type is'):
      message = 'Invalid file type. Only PNG | JPEG | JPG are allowed.';
      break;
    case error.includes('expected size is less than'):
      message = 'File size too large. Maximum size allowed is 3MB.';
      break;
    default:
      message = 'An error occurred during file validation.';
      break;
  }

  return new BadRequestException(message);

}
