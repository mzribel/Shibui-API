import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaTransactionRunner } from '@/infrastructure/database/prisma/prisma.transaction-runner';
import { Role } from '@common/enums/role.enum'
import { RegisterCompanyDto, RegisterDto, RegisterStudentDto } from '@modules/account/dto/register.dto';
import { User } from "@modules/users/models/user"
import { AccountResponseDto, CompanyAccountResponseDto, StudentAccountResponseDto } from './dto/account.response.dto';
import { UserResponseDto } from '../users/dto/user.response.dto';
import { CompanyProfile } from '@modules/companies/models/company-profile';
import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/users/user.service';
import { CompanyProfileService } from '@modules/companies/company.service';
import { StudentProfileService } from '@modules/students/student-profile.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly tx: PrismaTransactionRunner,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly companyProfileService: CompanyProfileService,
    private readonly studentProfileService: StudentProfileService
  ) {}


  private async createBaseUser(dto: RegisterDto, role:Role) {
    // Utilisateur supabase
    const auth = await this.authService.registerWithPassword(dto.email, dto.password);
    // Utilisateur applicatif
    try {
      const user = await this.userService.createUser(auth.externalUserId, dto.email ?? '', role);
      return { auth, user };
    } catch (e) {
      await this.authService.deleteUser(auth.externalUserId);
      throw e;
    }
  }

  async registerCompany(dto: RegisterCompanyDto) {
    const { auth, user } = await this.createBaseUser(dto, Role.COMPANY);
    
    try {
      return await this.tx.run(async () => {
        await this.companyProfileService.createCompanyProfile(user.id, dto.profile);
        return auth;
      });
    } catch (e) {
      await this.authService.deleteUser(auth.externalUserId);
      await this.userService.deleteUser(user.id);
      throw e;
    }
  }

  async registerStudent(dto: RegisterStudentDto) {
    const { auth, user } = await this.createBaseUser(dto, Role.STUDENT);
    try {
      return await this.tx.run(async () => {
        await this.studentProfileService.createStudentProfile(user.id, dto.profile);
        return auth;
      });
    } catch (e) {
      await this.authService.deleteUser(auth.externalUserId);
      await this.userService.deleteUser(user.id)
      throw e;
    }
  }

  async getAccount(userId: number, requestingUser:User):Promise<AccountResponseDto> {
    if (!requestingUser.isSelfOrAdmin(userId))
      throw new ForbiddenException()

    const user:User|null = await this.userService.getByUserId(userId);
    if (!user) 
      throw new NotFoundException();
    
    const userDto = new UserResponseDto(user);

    switch (user.role) {
      case Role.COMPANY: {
        let profile:CompanyProfile = await this.companyProfileService.getCompanyProfile(user.id);
        return new CompanyAccountResponseDto(userDto, profile);
      }
      case Role.STUDENT: {
        let profile = await this.studentProfileService.getStudentProfile(user.id);
        return new StudentAccountResponseDto(userDto, profile);
      }
      default:
        return new AccountResponseDto(userDto);
    }
  }

  async deleteAccount(userId: number, requestingUser:User) {
    if (!requestingUser.isSelfOrAdmin(userId))
      throw new ForbiddenException();

    const user = await this.userService.getByUserId(userId);
    if (!user) throw new NotFoundException();

    return await this.tx.run(async () => {
      await this.userService.deleteUser(userId);
      await this.authService.deleteUser(user.supabaseUserId)
    });
  }
}