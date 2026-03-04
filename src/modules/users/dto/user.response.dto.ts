import { Role } from '@common/enums/role.enum';
import { User } from '../models/user';

export class UserResponseDto {
    id: number;
    email:string;
    role: Role;
    createdAt: Date;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.role = user.role;
        this.createdAt = user.createdAt;
    }
}


