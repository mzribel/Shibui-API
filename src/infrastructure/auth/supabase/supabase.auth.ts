import { ICredentialAuthProvider } from '@infrastructure/auth/i.credential.auth.provider';
import { SessionResponseDto } from '@/modules/auth/dto/session.response.dto';
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BadRequestException, ConflictException, HttpException } from '@nestjs/common';
import { RegisterDto } from '@/modules/account/dto/register.dto';

export class SupabaseAuth implements ICredentialAuthProvider {
  private readonly client: SupabaseClient;
  private readonly adminClient:SupabaseClient;

  constructor(params?: {
    supabaseUrl?: string;
    supabaseAnonKey?: string;
    supabaseServiceRoleKey?:string;
    client?: SupabaseClient; 
    adminClient?:SupabaseClient;
  }) {
    if (params?.client) {
      this.client = params.client;
      return;
    }

    // TODO : sortir le client du constructeur tbh
    const supabaseUrl = params?.supabaseUrl ?? process.env.SUPABASE_URL;
    const supabaseAnonKey = params?.supabaseAnonKey ?? process.env.SUPABASE_ANON_KEY;
    const supabaseServiceRoleKey = params?.supabaseServiceRoleKey ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) throw new Error("SupabaseAuth: SUPABASE_URL is missing");
    if (!supabaseAnonKey) throw new Error("SupabaseAuth: SUPABASE_ANON_KEY is missing");
    if (!supabaseServiceRoleKey) throw new Error("SupabaseAuth: SUPABASE_SERVICE_ROLE_KEY is missing")

    this.client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
        this.adminClient =
      params?.adminClient ??
      createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      });
  }

  async registerWithPassword(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();

    const { data, error } = await this.client.auth.signUp({
      email,
      password: input.password,
    });

    if (error) this.processError(error)

    const userId = data.user?.id;
    if (!userId) {
      throw new HttpException("Authentication error", 500)
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

    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password: input.password,
    });

    if (error) this.processError(error)

    const userId = data.user?.id;
    if (!userId || !data.user || !data.session) throw new HttpException("Authentication error", 500)

    const session = new SessionResponseDto(
      data.session.access_token, 
      data.session.token_type,
      data.session.expires_in,
      data.session.expires_at, 
      data.session.refresh_token)
      
    return { externalUserId: userId, email: data.user?.email ?? email, session };
  }

  async deleteUser(authId:string) {
      const { data, error } = await this.adminClient.auth.admin.deleteUser(authId)

      if (error) this.processError(error);
      return data
  }

  // TODO :
  async requestPasswordReset(email: string) {
    const { data, error } = await this.client.auth.resetPasswordForEmail(email, {
      // URL factice nécessaire, mais non utilisée dans le flux OTP API
      redirectTo: 'http://localhost:3000/callback',
    });

    if (error) throw new Error(error.message);

    return { message: 'Code de réinitialisation envoyé par email' };
  }

  // TODO :
  async resetPassword(otp: string, dto:RegisterDto) {

  // 1. Vérifier le code OTP reçu par email
  const { data, error: verifyError } = await this.client.auth.verifyOtp({
    email:dto.email,
    token: otp,
    type: 'recovery', // Indique qu'on vérifie un code de reset
  });

  if (verifyError) throw new Error(verifyError.message);

  // 2. Mettre à jour le mot de passe
  const { error: updateError } = await this.client.auth.updateUser({
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
        default:
          throw new HttpException("Authentication error", 500)
      }
  }
}