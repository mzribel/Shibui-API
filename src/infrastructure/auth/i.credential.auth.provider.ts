import { RegisterDto } from "@modules/account/dto/register.dto";
import { Session } from '@modules/auth/dto/session';

export abstract class ICredentialAuthProvider {
  abstract registerWithPassword(input: { email: string; password: string }): Promise<Session>;
  abstract loginWithPassword(input: { email: string; password: string }): Promise<Session>;
  abstract deleteUser(authId:string);
  abstract requestPasswordReset(email:string);
  abstract resetPassword(otp:string, dto:RegisterDto);
  abstract logout(): Promise<void>;
  abstract refreshToken(input: { refreshToken:string}):Promise<Session>;
}