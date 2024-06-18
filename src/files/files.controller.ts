import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiProduces, ApiBody, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) { }

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Upload an image file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'The image file to upload',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'The URL of the uploaded image',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: 'http://example.com/image.jpg',
              description: 'The URL of the uploaded image',
            },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid file type or file size exceeds the limit' })
  @UseInterceptors(FileInterceptor('image', {
    limits: {
      files: 1,
    },
  }))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),  // 3 MB
        ],
        exceptionFactory: (error: string) => handleFileErrorImage(error)
      })
    ) file: Express.Multer.File,
  ) {
    const response = await this.filesService.uploadImage(file);
    return response;
  }
}

function handleFileErrorImage(error: string): BadRequestException {
  let message: string;

  switch (true) {
    case error.includes('expected type is'):
      message = 'Invalid file type. Only PNG, JPEG, and JPG are allowed.';
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
