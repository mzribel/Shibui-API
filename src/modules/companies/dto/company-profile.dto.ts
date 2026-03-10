import {
  IsArray,
  ArrayMaxSize,
  ArrayUnique,
  IsEmail,
  IsEnum,
  IsHexColor,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  Min,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Industry } from '@common/enums/industry.enum';
import { CompanySize } from '@/common/enums/company-size.enum';
import { PartialType } from '@nestjs/swagger';

export class CreateCompanyProfileDto {
  @ApiProperty({
    example: 'Tech Solutions SAS',
    description: 'Legal name of the company',
  })
  @IsString()
  @Length(1, 255)
  legalName: string;

  @ApiPropertyOptional({
    example: '12345678901234',
    description: '14-digit SIRET number',
  })
  @IsOptional()
  @Matches(/^\d{14}$/)
  siret?: string;

  @ApiPropertyOptional({
    example: 'We build innovative software solutions.',
    description: 'Company description',
  })
  @IsOptional()
  @IsString()
  @Length(0, 2000)
  description?: string;

  @ApiPropertyOptional({
    example: 'Build the future.',
    description: 'Company slogan',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  slogan?: string;

  @ApiPropertyOptional({
    example: Industry.IT_SERVICES,
    enum: Industry,
    description: 'Company industry sector',
  })
  @IsOptional()
  @IsEnum(Industry)
  industry?: Industry | null;

  @ApiPropertyOptional({
    example: CompanySize.TPE,
    enum: CompanySize,
    description: 'Company size category',
  })
  @IsOptional()
  @IsEnum(CompanySize)
  size?: CompanySize | null;

  @ApiPropertyOptional({
    example: 42,
    description: 'Number of employees',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  employeeCount?: number | null;

  @ApiPropertyOptional({
    example: '10 rue de la Paix',
    description: 'Street address',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({
    example: 'Paris',
    description: 'City',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiPropertyOptional({
    example: '75001',
    description: 'Postal code',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  postalCode?: string;

  @ApiPropertyOptional({
    example: 'France',
    description: 'Country',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({
    example: '2015-01-01',
    description: 'Company founding date',
  })
  @IsOptional()
  @IsDateString()
  foundedIn?: string;

  @ApiPropertyOptional({
    example: ['Innovation', 'Collaboration'],
    description: 'Company values',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  values?: string[];

  @ApiPropertyOptional({
    example: ['Remote work', 'Meal vouchers'],
    description: 'Company benefits',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  benefits?: string[];

  @ApiPropertyOptional({
    example: '#EE7527',
    description: 'Primary brand color',
  })
  @IsOptional()
  @IsHexColor()
  primaryColor?: string;

  @ApiPropertyOptional({
    example: 'https://example.com',
    description: 'Company website URL',
  })
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @ApiPropertyOptional({
    example: 'https://linkedin.com/company/tech-solutions',
    description: 'Company LinkedIn URL',
  })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @ApiPropertyOptional({
    example: '+33123456789',
    description: 'Contact phone number',
  })
  @IsOptional()
  @IsPhoneNumber()
  contactPhone?: string;

  @ApiPropertyOptional({
    example: 'contact@techsolutions.com',
    description: 'Contact email',
  })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}

export interface CompanyProfileFileDto {
  logo?: Express.Multer.File;
  cover?: Express.Multer.File;
}

export class UpdateCompanyProfileDto extends PartialType(CreateCompanyProfileDto) {}