import { Injectable } from "@nestjs/common";
import { UserResponseDto } from "./dto/user.response.dto";
import { User } from "./models/user";
import { PrismaUserRepository } from "./repositories/prisma.user.repository";
import { Role } from '@common/enums/role.enum';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: PrismaUserRepository
    ){}

    async createUser(externalUserId:string, email:string, role:Role): Promise<UserResponseDto> {
        const userInput = User.fromAuth(externalUserId, email, role);
        const userModel = await this.userRepository.create(userInput);
        return new UserResponseDto(userModel);
    }

    async getByexternalUserId(externalUserId:string): Promise<User|null> {
      return this.userRepository.findBySupabaseId(externalUserId)
    }

    async getByUserId(userId:number):Promise<User|null> {
      return this.userRepository.findByUserId(userId);
    }

    async deleteUser(userId:number):Promise<void> {
      return this.userRepository.deleteUser(userId);
    }
}