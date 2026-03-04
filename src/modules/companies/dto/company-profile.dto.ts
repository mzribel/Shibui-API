import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Industry } from '@common/enums/industry.enum';

export class CreateCompanyProfileDto {
  @ApiProperty({ example: 'Tech Solutions SAS', description: 'Legal name of the company' })
  @IsString()
  @Length(1, 255)
  legalName: string;

  @ApiPropertyOptional({
    example: Industry.IT_SERVICES,
    enum: Industry,
    description: 'Company industry sector'
  })  @IsOptional()
  @IsEnum(Industry)
  industry?: Industry | null;

  @ApiPropertyOptional({ example: 'We build innovative software solutions.', description: 'Company description' })
  @IsOptional()
  @IsString()
  @Length(0, 2000)
  description?: string | null;

  @ApiPropertyOptional({ example: '12345678901234', description: '14-digit SIRET number' })
  @IsOptional()
  @Matches(/^\d{14}$/)
  siret?: string | null;
}

export class UpdateCompanyProfileDto {
  @ApiPropertyOptional({ example: 'Tech Solutions SAS', description: 'Legal name of the company' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  legalName?: string;

  @ApiPropertyOptional({
    example: Industry.IT_SERVICES,
    enum: Industry,               
    description: 'Company industry sector'
  })  @IsOptional()
  @IsEnum(Industry)
  industry?: Industry;

  @ApiPropertyOptional({ example: 'We build innovative software solutions.', description: 'Company description' })
  @IsOptional()
  @IsString()
  @Length(0, 2000)
  description?: string;

  @ApiPropertyOptional({ example: '12345678901234', description: '14-digit SIRET number' })
  @IsOptional()
  @Matches(/^\d{14}$/)
  siret?: string;
}