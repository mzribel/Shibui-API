import { Injectable } from "@nestjs/common";

import { PrismaDbContext } from "@/infrastructure/database/prisma/prisma-db-context";
import { User as PrismaUser } from '@prisma/client';
import { User } from "@/modules/users/models/user"

@Injectable() 
export class PrismaUserRepository {
  constructor(private readonly ctx:PrismaDbContext) {}

    async findByUserId(userId: number): Promise<User | null> {
      const record:PrismaUser|null = await this.ctx.db.user.findUnique({
        where: { id:userId },
      })
      if (!record) return null;
      return User.fromObject(record);
    }
    
    async findBySupabaseId(externalUserId: string): Promise<User|null> {
        const user:PrismaUser|null = await this.ctx.db.user.findUnique({
            where: {externalUserId}
        })

        if (!user) return null;

        return User.fromObject(user);
    }
    
    async create(userData: User): Promise<User> {
        const user:PrismaUser = await this.ctx.db.user.create({
            data: {
                externalUserId: userData.externalUserId, 
                email: userData.email,
                role: userData.role
            }
        });

        return User.fromObject(user);
    }

    async deleteUser(userId:number):Promise<void> {
        await this.ctx.db.user.delete({where:{id:userId}})
    }
}
