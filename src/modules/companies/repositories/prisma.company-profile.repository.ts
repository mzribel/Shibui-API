import { CompanyProfile } from '../models/company-profile';
import { CompanyProfile as PrismaCompanyProfile } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaDbContext } from "@/infrastructure/database/prisma/prisma-db-context";

@Injectable()
export class PrismaCompanyProfileRepository {
    constructor(private readonly ctx:PrismaDbContext) {}
    
    async createProfile(data:CompanyProfile) {
        const saved:PrismaCompanyProfile = await this.ctx.db.companyProfile.create({ data })
        return CompanyProfile.fromObject(saved);
    }

    async existsBySiret(siret: string): Promise<boolean> {
        const profile:PrismaCompanyProfile|null = await this.ctx.db.companyProfile.findFirst({ where: { siret } });
        return profile !== null;
    }

    async findByUserId(userId: number): Promise<CompanyProfile | null> {
      const record = await this.ctx.db.companyProfile.findUnique({ where: { userId }, })
      if (!record) { return null;}
      return CompanyProfile.fromObject(record);
    }

  async updateProfile(userId: number, data: Partial<CompanyProfile>): Promise<CompanyProfile> {
      const updated = await this.ctx.db.companyProfile.update({
      where: { userId },
      data: data
    });
    return CompanyProfile.fromObject(updated);
  }
}