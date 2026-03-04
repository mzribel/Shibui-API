import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfferApplicationDto {
  @ApiProperty({ example: 1, description: 'ID of the student' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiPropertyOptional({
    example: 'I am very motivated by this internship because...',
    description: 'Cover letter or short pitch'
  })
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description: string;

  @ApiProperty({
    example: 'https://supabase.co/storage/v1/object/public/cv/my-cv.pdf',
    description: 'URL to the student CV'
  })
  @IsNotEmpty()
  @IsUrl()
  cvUrl: string;
}

export class UpdateOfferApplicationDto {
  @ApiPropertyOptional({
    example: 'I am very motivated by this internship because...',
    description: 'Cover letter or short pitch'
  })
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description: string;

  @ApiProperty({
    example: 'https://supabase.co/storage/v1/object/public/cv/my-cv.pdf',
    description: 'URL to the student CV'
  })
  @IsOptional()
  @IsUrl()
  cvUrl: string;
}