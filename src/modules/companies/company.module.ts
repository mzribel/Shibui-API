import { Module } from "@nestjs/common";
import { CompanyProfileService } from "./company.service";
import { PrismaCompanyProfileRepository } from "./repositories/prisma.company-profile.repository";
import { CompanyController } from '@modules/companies/company.controller';

@Module({
  controllers: [CompanyController],
  providers:[
    CompanyProfileService,
    PrismaCompanyProfileRepository,
  ],
  exports: [CompanyProfileService]
})
export class CompanyModule {}