import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { PrismaModule } from '@infrastructure/database/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { SupabaseAuthGuard } from '@modules/auth/guards/supabase-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { UserModule } from '@modules/users/user.module';
import { AccountModule } from '@modules/account/account.module';
import { OfferApplicationModule } from '@modules/offerApplications/offer-application.module';
import { CompanyModule } from '@modules/companies/company.module';
import { OfferModule } from '@modules/offers/offer.module';
import { StudentModule } from '@modules/students/student.module';
import { TestModule } from '@modules/route-test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AccountModule,
    OfferApplicationModule,
    AuthModule,
    CompanyModule,
    OfferModule,
    StudentModule,
    UserModule,
    TestModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: SupabaseAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AppModule {}
