import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ValidRoles } from '../interfaces/valid-roles.interface';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({
        description: 'User email',
        example: 'john.doe@example.com',
    })
    email?: string;

    @ApiPropertyOptional({
        description: 'User fullname',
        example: 'John Doe',
    })
    fullname?: string;

    @ApiPropertyOptional({
        description: 'User roles',
        example: ['admin'],
    })
    roles?: ValidRoles[];
}
