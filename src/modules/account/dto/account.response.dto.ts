import { StudentProfile } from "@/modules/students/models/student-profile";
import { UserResponseDto } from "@/modules/users/dto/user.response.dto";
import { CompanyProfile } from '@modules/companies/models/company-profile';

export class AccountResponseDto {
    user:UserResponseDto;
    constructor(user:UserResponseDto) { this.user = user; }
}

export class StudentAccountResponseDto extends AccountResponseDto {
    profile: StudentProfile;

    constructor(user:UserResponseDto, profile:StudentProfile) {
        super(user);
        this.profile = profile;
    }
}

export class CompanyAccountResponseDto extends AccountResponseDto {
  profile: CompanyProfile;

  constructor(user: UserResponseDto, profile: CompanyProfile) {
    super(user);
    this.profile = profile;
  }
}