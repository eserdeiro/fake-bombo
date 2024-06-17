import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

export const ROLES_KEY = 'roles';

export const RoleProtected = (...args: ValidRoles[]) => {
    return SetMetadata(ROLES_KEY, args);
}
