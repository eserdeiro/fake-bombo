import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ErrorHandlingService {
    handleDatabaseErrors(error: any): never {
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }
        console.error(error);
        throw new InternalServerErrorException('Please check server logs');
    }
}
