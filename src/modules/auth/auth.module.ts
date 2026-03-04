import { Module } from '@nestjs/common';
import { AuthProvidersModule } from '@infrastructure/auth/auth.providers.module';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { UserModule } from '../users/user.module';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import { SupabaseAuthGuard } from '@/modules/auth/guards/supabase-auth.guard';

@Module({
  imports: [AuthProvidersModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    RolesGuard,
    SupabaseAuthGuard
  ],
  exports: [
    RolesGuard,
    SupabaseAuthGuard,
    AuthService
  ]
})
export class AuthModule {}