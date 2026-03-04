import { Industry } from '@common/enums/industry.enum';
import { CreateCompanyProfileDto } from '@modules/companies/dto/company-profile.dto';

export class CompanyProfile {
  constructor(
    public readonly userId: number,
    public readonly legalName: string,
    public readonly industry: Industry | null,
    public readonly description: string | null,
    public readonly siret: string | null,
    public readonly isVerified: boolean,
  ) {
  }

  static fromObject(data: any): CompanyProfile {
    return new CompanyProfile(
      data.userId,
      data.legalName,
      data.industry as Industry | null,
      data.description,
      data.siret,
      data.isVerified
    );
  }

  static fromDto(userId:number, dto:CreateCompanyProfileDto) {
    return new CompanyProfile(
      userId,
      dto.legalName,
      dto.industry ?? null,
      dto.description ?? null,
      dto.siret ?? null,
      false
    )
  }

  static fromUpdateDto(dto: Partial<CreateCompanyProfileDto>): Partial<CompanyProfile> {
    const update: any = {};
    if (dto.legalName !== undefined) update.legalName = dto.legalName;
    if (dto.industry !== undefined) update.industry = dto.industry;
    if (dto.description !== undefined) update.description = dto.description;
    if (dto.siret !== undefined) update.siret = dto.siret;
    return update;
  }
}
