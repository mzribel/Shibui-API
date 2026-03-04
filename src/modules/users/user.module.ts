import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaUserRepository } from "./repositories/prisma.user.repository";

@Module({
    providers: [
      UserService,
      PrismaUserRepository,
    ],
    exports: [UserService]
})
export class UserModule {}