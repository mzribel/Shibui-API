import { CompanySize } from '@common/enums/company-size.enum';
import { Industry } from '@common/enums/industry.enum';
import { UpdateCompanyProfileDto } from '../dto/company-profile.dto';

export class CompanyProfile {
  constructor(
    public userId: number,
    public createdAt: Date,
    public updatedAt: Date | null,

    public legalName: string,
    public siret: string | null,
    public description: string | null,
    public slogan: string | null,
    public industry: Industry | null,
    public size: CompanySize | null,
    public employeeCount: number | null,

    public address: string | null,
    public city: string | null,
    public postalCode: string | null,
    public country: string | null,

    public foundedIn: Date | null,
    public values: string[],
    public benefits: string[],

    public logoUrl: string | null,
    public coverUrl: string | null,
    public primaryColor: string | null,

    public websiteUrl: string | null,
    public linkedinUrl: string | null,

    public contactPhone: string | null,
    public contactEmail: string | null,
  ) {}

  static fromObject(data: any): CompanyProfile {
    return new CompanyProfile(
      data.userId ?? null,
      data.createdAt ? new Date(data.createdAt) : new Date(),
      data.updatedAt ? new Date(data.updatedAt) : null,

      data.legalName,
      data.siret ?? null,
      data.description ?? null,
      data.slogan ?? null,
      (data.industry as Industry) ?? null,
      (data.size as CompanySize) ?? null,
      data.employeeCount ?? null,

      data.address ?? null,
      data.city ?? null,
      data.postalCode ?? null,
      data.country ?? 'France',

      data.foundedIn ? new Date(data.foundedIn) : null,
      data.values ?? [],
      data.benefits ?? [],

      data.logoUrl ?? null,
      data.coverUrl ?? null,
      data.primaryColor ?? '#EE7527',

      data.websiteUrl ?? null,
      data.linkedinUrl ?? null,

      data.contactPhone ?? null,
      data.contactEmail ?? null,
    );
  }

  static toUpdateData(dto: UpdateCompanyProfileDto) {
  return Object.fromEntries(
    Object.entries({
      legalName: dto.legalName,
      siret: dto.siret,
      description: dto.description,
      slogan: dto.slogan,
      industry: dto.industry,
      size: dto.size,
      employeeCount: dto.employeeCount,
      address: dto.address,
      city: dto.city,
      postalCode: dto.postalCode,
      country: dto.country,
      foundedIn:
        dto.foundedIn === undefined
          ? undefined
          : dto.foundedIn === null
            ? null
            : new Date(dto.foundedIn),
      values: dto.values,
      benefits: dto.benefits,
      primaryColor: dto.primaryColor,
      websiteUrl: dto.websiteUrl,
      linkedinUrl: dto.linkedinUrl,
      contactPhone: dto.contactPhone,
      contactEmail: dto.contactEmail,
    }).filter(([, value]) => value !== undefined),
  );
}

replaceFileKeysWithUrls(files) {
  if (!files) return;

  if (files.cover?.url) 
    this.coverUrl = files.cover?.url;
  if (files.logo?.url)
    this.coverUrl = files.cover?.url;
}
}
