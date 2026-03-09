import { ICredentialAuthProvider } from '@infrastructure/auth/i.credential.auth.provider';
import { SessionResponseDto } from '@/modules/auth/dto/session.response.dto';
import { BadRequestException, ConflictException, HttpException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '@/modules/account/dto/register.dto';
import { SupabaseService } from '@infrastructure/supabase/supabase.service';

@Injectable()
export class SupabaseAuth implements ICredentialAuthProvider {
  constructor(private readonly supabase: SupabaseService) {}

  async registerWithPassword(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();

    const { data, error } = await this.supabase.client.auth.signUp({
      email,
      password: input.password,
    });

    if (error) this.processError(error)

    const userId = data.user?.id;
    if (!userId) {
      throw new HttpException("Authentication error 1", 500)
    }
    
    const session = data.session ? new SessionResponseDto(
      data.session.access_token, 
      data.session.token_type,
      data.session.expires_in,
      data.session.expires_at, 
      data.session.refresh_token) : null;
      
    return { externalUserId: userId, email: data.user?.email ?? email, session };
  }

  async loginWithPassword(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();

    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password: input.password,
    });

    if (error) this.processError(error)

    const userId = data.user?.id;
    if (!userId || !data.user || !data.session) throw new HttpException("2 Authentication error", 500)

    const session = new SessionResponseDto(
      data.session.access_token, 
      data.session.token_type,
      data.session.expires_in,
      data.session.expires_at, 
      data.session.refresh_token)
      
    return { externalUserId: userId, email: data.user?.email ?? email, session };
  }

  async deleteUser(authId:string) {
      const { data, error } = await this.supabase.adminClient.auth.admin.deleteUser(authId)

      if (error) this.processError(error);
      return data
  }

  // TODO :
  async requestPasswordReset(email: string) {
    const { data, error } = await this.supabase.client.auth.resetPasswordForEmail(email, {
      // URL factice nécessaire, mais non utilisée dans le flux OTP API
      redirectTo: 'http://localhost:3000/callback',
    });

    if (error) throw new Error(error.message);

    return { message: 'Code de réinitialisation envoyé par email' };
  }

  // TODO :
  async resetPassword(otp: string, dto:RegisterDto) {

  // 1. Vérifier le code OTP reçu par email
  const { data, error: verifyError } = await this.supabase.client.auth.verifyOtp({
    email:dto.email,
    token: otp,
    type: 'recovery', // Indique qu'on vérifie un code de reset
  });

  if (verifyError) throw new Error(verifyError.message);

  // 2. Mettre à jour le mot de passe
  const { error: updateError } = await this.supabase.client.auth.updateUser({
    password: dto.password,
  });

  if (updateError) throw new Error(updateError.message);

  return { message: 'Mot de passe mis à jour avec succès' };
}

  private processError(error) {
    if (!error) return;
    switch (error.code) {
        case "user_already_exists":
        case "email_exists":
          throw new ConflictException("User already exists");
        case "weak_password":
          throw new BadRequestException("Password is too weak")
        case "over_request_rate_limit":
          throw new HttpException("Rate limit reached", 429)
        case "validation_failed":
          throw new BadRequestException("Invalid email format")
      case "invalid_credentials":
        throw new BadRequestException("Invalid email or password")
      default:
        throw new HttpException("Authentication error : "+error.message, 500)
      }
  }
}