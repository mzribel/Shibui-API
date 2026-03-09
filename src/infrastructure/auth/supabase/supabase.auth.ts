import { ICredentialAuthProvider } from '@infrastructure/auth/i.credential.auth.provider';
import { Session } from '@modules/auth/dto/session';
import {
  BadRequestException,
  ConflictException, ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from '@/modules/account/dto/register.dto';
import { SupabaseService } from '@infrastructure/supabase/supabase.service';
import * as process from 'node:process';

@Injectable()
export class SupabaseAuth implements ICredentialAuthProvider {
  constructor(private readonly supabase: SupabaseService) {}

  // Attention : Ca n'invalide pas un access_token en cours,
  // ça ne fait que bloquer le refresh token
  async logout(input:{token:string}): Promise<void> {
    await this.supabase.client.auth.admin.signOut(input.token);
  }

  async refreshToken(input: { refreshToken: string }):Promise<Session> {
    const { data, error } = await this.supabase.client.auth.refreshSession({
      refresh_token: input.refreshToken,
    });
    if (error) this.processError(error);

    return this.parseSessionData(data.session);
  }

  async registerWithPassword(input: { email: string; password: string }):Promise<Session> {
    const email = input.email.trim().toLowerCase();

    const { data, error } = await this.supabase.client.auth.signUp({
      email,
      password: input.password,
    });

    if (error) this.processError(error);

    const userId = data.user?.id;
    if (!userId) {
      throw new HttpException('Authentication error 1', 500);
    }

    return this.parseSessionData(data.session);
  }

  async loginWithPassword(input: { email: string; password: string }):Promise<Session> {
    const email = input.email.trim().toLowerCase();

    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password: input.password,
    });

    if (error) this.processError(error);

    const userId = data.user?.id;
    if (!userId || !data.user || !data.session)
      throw new HttpException('2 Authentication error', 500);

    return this.parseSessionData(data.session);
  }

  async deleteUser(authId: string):Promise<void> {
    const { data, error } = await this.supabase.adminClient.auth.admin.deleteUser(authId);

    if (error) this.processError(error);
  }

  async requestPasswordReset(email: string) {
    const { data, error } =
      await this.supabase.client.auth.resetPasswordForEmail(email, {
        // URL non-utilisée mais nécessaire dans les paramètres
        redirectTo: 'http://localhost:3000/callback',
      });

    if (error) throw new Error(error.message);

    return { message: 'Code de réinitialisation envoyé par email' };
  }

  async resetPassword(otp: string, dto: RegisterDto) {
    const { data, error } =
      await this.supabase.client.auth.verifyOtp({
        email: dto.email,
        token: otp,
        type: 'recovery', // Code de réinitialisation
      });

    if (error)  this.processError(error);

    const { error: updateError } = await this.supabase.client.auth.updateUser({
      password: dto.password,
    });

    if (updateError) throw new Error(updateError.message);

    return { message: 'Mot de passe mis à jour avec succès' };
  }

  private processError(error) {
    if (!error) return;
    switch (error.code) {
      case 'user_already_exists':
      case 'email_exists':
        throw new ConflictException(error.message);
      case 'weak_password':
        throw new BadRequestException(error.message);
      case 'over_request_rate_limit':
        throw new HttpException('Rate limit reached', 429);
      case 'invalid_credentials':
        throw new BadRequestException(error.message);
      case 'validation_failed':
        throw new BadRequestException(error.message);
      case 'otp_expired':
        throw new ForbiddenException(error.message);
      default:
        throw new HttpException('Authentication error : ' + error.message, 500);
    }
  }

  private parseSessionData(data: any): Session {
    return new Session(
      'SUPABASE',
      data.user.id,
      data.user.email,
      data.access_token,
      data.token_type,
      data.expires_in,
      data.expires_at,
      data.refresh_token,
    );
  }
}