import { RegisterDto } from "@modules/account/dto/register.dto";

export abstract class ICredentialAuthProvider {
  abstract registerWithPassword(input: { email: string; password: string }): Promise<{ externalUserId: string; email?: string }>;
  abstract loginWithPassword(input: { email: string; password: string }): Promise<{ externalUserId: string; email?: string }>;
  abstract deleteUser(authId:string);
  abstract requestPasswordReset(email:string);
  abstract resetPassword(otp:string, dto:RegisterDto)
}