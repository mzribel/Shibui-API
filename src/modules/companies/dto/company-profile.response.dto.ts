import { Industry } from "@/common/enums/industry.enum";
import { CompanyProfile } from "@prisma/client";

export class CompanyProfileResponseDto {
  userId: number;
  legalName: string;
  industry: Industry | null;
  description: string | null;
  siret: string | null;
  isVerified: boolean;

  constructor(profile: CompanyProfile) {
    this.userId = profile.userId;
    this.legalName = profile.legalName;
    this.industry = profile.industry;
    this.description = profile.description;
    this.siret = profile.siret;
    this.isVerified = profile.isVerified;
  }
}