import { Role } from '@common/enums/role.enum';

export class User {
    constructor(
        public readonly id:number,
        public readonly supabaseUserId:string,
        public readonly email:string,
        public readonly role:Role,
        public readonly isActive:boolean,
        public readonly createdAt: Date,
        public readonly updatedAt:Date|null,
    ){}

    isAdmin() {
      return this.role == Role.ADMIN;
    }
    isStudent() {
      return this.role == Role.STUDENT;
    }
    isCompany() {
      return this.role == Role.COMPANY;
    }

    isSelfOrAdmin(userId:number) {
      return this.id == userId || this.role == Role.ADMIN;
    }

    static fromAuth(supabaseUserId:string, email:string, role:Role):User {
        return new User(
          0,                // Temporaire
          supabaseUserId,
          email,
          role,
          true,
          new Date(),
          new Date()
        );
    }

    static fromObject(data:any): User {
      return new User(
        data.id,
        data.supabaseUserId,
        data.email,
        data.role as Role,
        data.isActive,
        data.createdAt,
        data.updatedAt,
      );
    }
}