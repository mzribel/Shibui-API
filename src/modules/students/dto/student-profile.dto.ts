import { IsString, IsEnum, IsOptional, Length, IsNumber, IsBoolean, IsArray, IsUrl, IsEmail, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudyLevel } from '@common/enums/study-level.enum';
import { FieldOfStudy } from '@common/enums/field-of-study.enum';

export class CreateStudentProfileDto {
  @ApiProperty({ example: 'Jean', description: 'Student first name' })
  @Length(1, 50)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u)
  firstName: string;

  @ApiProperty({ example: 'Dupont', description: 'Student last name' })
  @Length(1, 50)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u)
  lastName: string;

  @ApiPropertyOptional({ example: 'Sorbonne University', description: 'Name of the school' })
  @IsOptional()
  school?: string | null;

  @ApiPropertyOptional({ example: 'Computer Science', description: 'Name of the degree' })
  @IsOptional()
  degreeName?: string | null;

  @ApiPropertyOptional({ example: 2022, description: 'Start year of studies' })
  @IsOptional()
  @IsNumber()
  startYear?: number | null;

  @ApiPropertyOptional({ example: 2025, description: 'Expected end year' })
  @IsOptional()
  @IsNumber()
  endYear?: number | null;

  @ApiPropertyOptional({ example: StudyLevel.BAC_PLUS_5, enum: StudyLevel, description: 'Current study level' })
  @IsOptional()
  @IsEnum(StudyLevel)
  currentLevel?: StudyLevel | null;

  @ApiPropertyOptional({ example: StudyLevel.DOCTORATE, enum: StudyLevel, description: 'Target study level' })
  @IsOptional()
  @IsEnum(StudyLevel)
  targetLevel?: StudyLevel | null;

  @ApiPropertyOptional({ example: ['Bachelor'], description: 'List of past degrees' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pastDegrees?: string[] | null;

  @ApiPropertyOptional({ example: ['JavaScript', 'Python'], description: 'List of technical skills' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[] | null;

  @ApiPropertyOptional({
    example: FieldOfStudy.COMPUTER_SCIENCE,
    enum: FieldOfStudy,
    description: 'Main field of study'
  })  @IsOptional()
  @IsEnum(FieldOfStudy)
  fieldOfStudy?: FieldOfStudy | null;

  @ApiPropertyOptional({ example: 'https://cv.example.com/jean-dupont.pdf', description: 'URL to the CV' })
  @IsOptional()
  @IsUrl()
  cvUrl?: string | null;

  @ApiPropertyOptional({ example: '+33600000000', description: 'Contact phone number' })
  @IsOptional()
  @IsString()
  contactPhoneNumber?: string | null;

  @ApiPropertyOptional({ example: 'jean.dupont@example.com', description: 'Contact email address' })
  @IsOptional()
  @IsEmail()
  contactEmail?: string | null;
}

export class UpdateStudentProfileDto {
  @ApiPropertyOptional({ example: 'Jean', description: 'Student first name' })
  @IsOptional()
  @Length(1, 50)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Dupont', description: 'Student last name' })
  @IsOptional()
  @Length(1, 50)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u)
  lastName?: string;

  @ApiPropertyOptional({ example: 'Sorbonne University', description: 'Name of the school' })
  @IsOptional()
  school?: string | null;

  @ApiPropertyOptional({ example: 'Computer Science', description: 'Name of the degree' })
  @IsOptional()
  degreeName?: string | null;

  @ApiPropertyOptional({ example: 2022, description: 'Start year of studies' })
  @IsOptional()
  @IsNumber()
  startYear?: number | null;

  @ApiPropertyOptional({ example: 2025, description: 'Expected end year' })
  @IsOptional()
  @IsNumber()
  endYear?: number | null;

  @ApiPropertyOptional({ example: StudyLevel.BAC_PLUS_5, enum: StudyLevel, description: 'Current study level' })
  @IsOptional()
  @IsEnum(StudyLevel)
  currentLevel?: StudyLevel | null;

  @ApiPropertyOptional({ example: StudyLevel.DOCTORATE, enum: StudyLevel, description: 'Target study level' })
  @IsOptional()
  @IsEnum(StudyLevel)
  targetLevel?: StudyLevel | null;

  @ApiPropertyOptional({ example: ['Bachelor in IT - 2023'], description: 'List of past degrees' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pastDegrees?: string[] | null;

  @ApiPropertyOptional({ example: ['JavaScript', 'Python'], description: 'List of technical skills' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[] | null;

  @ApiPropertyOptional({
    example: FieldOfStudy.COMPUTER_SCIENCE,
    enum: FieldOfStudy,
    description: 'Main field of study'
  })  @IsOptional()
  @IsEnum(FieldOfStudy)
  fieldOfStudy?: FieldOfStudy | null;

  @ApiPropertyOptional({ example: 'https://cv.example.com/jean-dupont.pdf', description: 'URL to the CV' })
  @IsOptional()
  @IsUrl()
  cvUrl?: string | null;

  @ApiPropertyOptional({ example: true, description: 'Whether the profile is visible to others' })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Whether to show the last name' })
  @IsOptional()
  @IsBoolean()
  showLastName?: boolean;

  @ApiPropertyOptional({ example: '+33600000000', description: 'Contact phone number' })
  @IsOptional()
  contactPhoneNumber?: string | null;

  @ApiPropertyOptional({ example: 'jean.dupont@example.com', description: 'Contact email address' })
  @IsOptional()
  @IsEmail()
  contactEmail?: string | null;
}