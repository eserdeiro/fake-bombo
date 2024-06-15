import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, HttpException, HttpStatus, ValidationError, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('event')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
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
    return file
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
