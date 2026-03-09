import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Le nouveau mot de passe est obligatoire' })
  password!: string;

  @IsNotEmpty({ message: 'Le code OTP est obligatoire' })
  otp!: string;
}