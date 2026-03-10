import {
  IsString,
  IsEnum,
  IsOptional,
  Length,
  IsNumber,
  IsArray,
  IsUrl,
  IsEmail,
  Matches,
  IsDateString,
  IsBoolean
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudyLevel } from '@common/enums/study-level.enum';
import { FieldOfStudy } from '@common/enums/field-of-study.enum';
import { ContractType } from '@common/enums/contract-type.enum';

export class StudentProfileDto {

  @ApiProperty({ example: 'Jean' })
  @Length(1, 50)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u)
  firstName: string;

  @ApiProperty({ example: 'Dupont' })
  @Length(1, 50)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u)
  lastName: string;

  @ApiPropertyOptional({ example: 'Étudiant en informatique passionné par le backend.' })
  @IsOptional()
  @IsString()
  biography?: string | null;

  @ApiPropertyOptional({ example: '2002-05-14' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string | null;

  @ApiPropertyOptional({ example: 'Marseille' })
  @IsOptional()
  @IsString()
  city?: string | null;

  @ApiPropertyOptional({ example: 'France' })
  @IsOptional()
  @IsString()
  country?: string | null;

  @ApiPropertyOptional({ example: '+33600000000' })
  @IsOptional()
  @IsString()
  contactPhone?: string | null;

  @ApiPropertyOptional({ example: 'jean.dupont@example.com' })
  @IsOptional()
  @IsEmail()
  contactEmail?: string | null;

  @ApiPropertyOptional({ example: 'Aix-Marseille Université' })
  @IsOptional()
  @IsString()
  schoolName?: string | null;

  @ApiPropertyOptional({ example: 'Master Informatique' })
  @IsOptional()
  @IsString()
  degreeName?: string | null;

  @ApiPropertyOptional({ enum: FieldOfStudy })
  @IsOptional()
  @IsEnum(FieldOfStudy)
  fieldOfStudy?: FieldOfStudy | null;

  @ApiPropertyOptional({ example: 2022 })
  @IsOptional()
  @IsNumber()
  startYear?: number | null;

  @ApiPropertyOptional({ example: 2025 })
  @IsOptional()
  @IsNumber()
  graduationYear?: number | null;

  @ApiPropertyOptional({ enum: StudyLevel })
  @IsOptional()
  @IsEnum(StudyLevel)
  currentLevel?: StudyLevel | null;

  @ApiPropertyOptional({ enum: StudyLevel })
  @IsOptional()
  @IsEnum(StudyLevel)
  targetLevel?: StudyLevel | null;

  @ApiPropertyOptional({ example: ['JavaScript', 'NestJS'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[] | null;

  @ApiPropertyOptional({ example: ['French', 'English'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[] | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/cv.pdf' })
  @IsOptional()
  @IsUrl()
  cvUrl?: string | null;

  @ApiPropertyOptional({ example: 'https://portfolio.example.com' })
  @IsOptional()
  @IsUrl()
  portfolioUrl?: string | null;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/jeandupont' })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string | null;

  @ApiPropertyOptional({ example: 'https://github.com/jeandupont' })
  @IsOptional()
  @IsUrl()
  githubUrl?: string | null;

  @ApiPropertyOptional({ enum: ContractType, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(ContractType, { each: true })
  openTo?: ContractType[] | null;

  @ApiPropertyOptional({ example: ['Marseille', 'Paris'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredLocations?: string[] | null;

  @ApiPropertyOptional({ example: '2025-09-01' })
  @IsOptional()
  @IsDateString()
  availableOn?: string | null;

  @ApiPropertyOptional({ example: true, description: 'Whether the profile is visible to others' })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Whether to show the last name' })
  @IsOptional()
  @IsBoolean()
  showLastName?: boolean;
}