import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'L\'email est obligatoire' })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  password: string;
}