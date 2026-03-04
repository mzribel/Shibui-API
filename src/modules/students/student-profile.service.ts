import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaStudentProfileRepository } from '@modules/students/repositories/prisma.student-profile.repository';
import { CreateStudentProfileDto, UpdateStudentProfileDto } from '@modules/students/dto/student-profile.dto';
import { StudentProfile } from '@modules/students/models/student-profile';
import { User } from '@modules/users/models/user';

@Injectable()
export class StudentProfileService {
  constructor(
    private readonly profileRepository: PrismaStudentProfileRepository
  ){}

  async getStudentProfile(userId:number){
    const profile = await this.profileRepository.findByUserId(userId);
    if (!profile){ throw new NotFoundException() }

    return profile;
  };

  async createStudentProfile(userId:number, dto:CreateStudentProfileDto) {
    const existing = await this.profileRepository.findByUserId(userId);
    if (existing){ throw new ConflictException() }

    const profile = StudentProfile.fromDto(userId, dto);
    return await this.profileRepository.createProfile(profile);
  }

  async updateStudentProfile(userId:number, dto:UpdateStudentProfileDto, requestingUser:User) {
    if (!requestingUser.isSelfOrAdmin(userId)) throw new ForbiddenException();

    const existing = this.profileRepository.findByUserId(userId);
    if (!existing) throw new NotFoundException();

    const updated = StudentProfile.fromUpdateDto(dto);
    return await this.profileRepository.updateProfile(userId, updated);
  }
  async setProfileVisibility(userId:number, isVisible:boolean, requestingUser:User) {
    if (!requestingUser.isSelfOrAdmin(userId)) throw new ForbiddenException();

    const existing = this.profileRepository.findByUserId(userId);
    if (!existing) throw new NotFoundException();

    return await this.profileRepository.updateProfile(userId, { isVisible })
  }
  searchStudentProfiles(filters:any) {
    throw new Error("Method not implemented.")
  }
}