import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  public client: SupabaseClient;      // Pour les opérations utilisateurs (anon key)
  public adminClient: SupabaseClient; // Pour les opérations admin (service role key)

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const url = this.configService.get<string>('SUPABASE_URL') ?? "";
    const anonKey = this.configService.get<string>('SUPABASE_ANON_KEY') ?? "";
    const serviceRoleKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') ?? "";

    if (!url) throw new Error("Supabase Client: SUPABASE_URL is missing");
    if (!anonKey) throw new Error("Supabase Client: SUPABASE_ANON_KEY is missing");
    if (!serviceRoleKey) throw new Error("Supabase Client: SUPABASE_SERVICE_ROLE_KEY is missing")

    const authConfig = {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    };

    this.client = createClient(url, anonKey, authConfig);
    this.adminClient = createClient(url, serviceRoleKey, authConfig);

  }
}