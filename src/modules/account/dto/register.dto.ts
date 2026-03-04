import { IsDefined, IsEmail, IsNotEmpty, ValidateNested, IsString, Length, IsOptional, IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyProfileDto } from '@modules/companies/dto/company-profile.dto';
import { CreateStudentProfileDto } from '@modules/students/dto/student-profile.dto';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'User password' })
  @IsNotEmpty()
  password!: string;
}

export class RegisterCompanyDto extends RegisterDto {
  @ApiProperty({ description: 'Company profile details' })
  @IsDefined()
  @ValidateNested()
  profile!: CreateCompanyProfileDto;
}

export class RegisterStudentDto extends RegisterDto {
  @ApiProperty({ description: 'Student profile details' })
  @IsDefined()
  @ValidateNested()
  profile!: CreateStudentProfileDto;
}