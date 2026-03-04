import { IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldOfStudy } from '@common/enums/field-of-study.enum';
import { OfferStatus } from '@common/enums/offer-status.enum';

export class CreateOfferDto {
  @ApiProperty({ example: 'Fullstack Developer Internship', description: 'Title of the job offer' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 'We are looking for a motivated intern to join our team.', description: 'Detailed job description' })
  @IsString()
  @Length(1, 5000)
  description: string;

  @ApiProperty({ example: 'Paris, France', description: 'Location of the job' })
  @IsString()
  @Length(1, 255)
  location: string;

  @ApiPropertyOptional({ example: 1200, description: 'Monthly salary in EUR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salary?: number | null;

  @ApiProperty({
    example: FieldOfStudy.COMPUTER_SCIENCE,
    enum: FieldOfStudy,
    description: 'Required field of study for the offer'
  })
  @IsEnum(FieldOfStudy)
  fieldOfStudy: FieldOfStudy;

  @ApiPropertyOptional({
    example: OfferStatus.DRAFT,
    enum: [OfferStatus.DRAFT, OfferStatus.PUBLISHED], // Limité aux deux valeurs autorisées
    description: 'Status of the offer. Defaults to DRAFT'
  })
  @IsOptional()
  @IsEnum([OfferStatus.DRAFT, OfferStatus.PUBLISHED])
  status?: OfferStatus = OfferStatus.DRAFT;
}

export class UpdateOfferDto {
  @ApiPropertyOptional({ example: 'Fullstack Developer Internship', description: 'Title of the job offer' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  title?: string;

  @ApiPropertyOptional({ example: 'We are looking for a motivated intern to join our team.', description: 'Detailed job description' })
  @IsOptional()
  @IsString()
  @Length(1, 5000)
  description?: string;

  @ApiPropertyOptional({ example: 'Paris, France', description: 'Location of the job' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  location?: string;

  @ApiPropertyOptional({ example: 1200, description: 'Monthly salary in EUR' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salary?: number | null;

  @ApiPropertyOptional({
    example: FieldOfStudy.COMPUTER_SCIENCE,
    enum: FieldOfStudy,
    description: 'Required field of study for the offer'
  })
  @IsOptional()
  @IsEnum(FieldOfStudy)
  fieldOfStudy?: FieldOfStudy;
}