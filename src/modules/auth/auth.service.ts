import { Injectable } from '@nestjs/common';
import { ICredentialAuthProvider } from '@infrastructure/auth/i.credential.auth.provider';
import { RegisterDto } from '../account/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly credentialAuth: ICredentialAuthProvider,
  ) {}

  async requestPasswordReset(email: string) {
    return this.credentialAuth.requestPasswordReset(email);
  }

  async registerWithPassword(email: string, password: string) {
    return this.credentialAuth.registerWithPassword({ email, password });
  }

  async loginWithPassword(email: string, password: string) {
    return await this.credentialAuth.loginWithPassword({ email, password });
  }

  async deleteUser(authId: string) {
    return this.credentialAuth.deleteUser(authId);
  }

  async resetPassword(otp:string, dto:RegisterDto) {
    return this.credentialAuth.resetPassword(otp, dto);
  }

  async refreshToken(token: string) {
    return await this.credentialAuth.refreshToken({refreshToken:token});
  }

  async logout(token:string) {
    return await this.credentialAuth.logout({token});
  }
}
