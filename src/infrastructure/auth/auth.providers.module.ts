import { Module } from "@nestjs/common";
import { SupabaseAuth } from "./supabase/supabase.auth";
import { ICredentialAuthProvider } from '@infrastructure/auth/i.credential.auth.provider';
import { SupabaseModule } from '@infrastructure/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [{
    provide: ICredentialAuthProvider, useClass: SupabaseAuth
  }],
  exports: [ICredentialAuthProvider],
})
export class AuthProvidersModule {}