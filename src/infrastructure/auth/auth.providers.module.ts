import { Module } from "@nestjs/common";
import { SupabaseAuth } from "./supabase/supabase.auth";
import { ICredentialAuthProvider } from '@infrastructure/auth/i.credential.auth.provider';

@Module({
  providers: [{
    provide: ICredentialAuthProvider, useClass: SupabaseAuth
  }],
  exports: [ICredentialAuthProvider],
})
export class AuthProvidersModule {}