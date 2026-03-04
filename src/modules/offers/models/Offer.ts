import { FieldOfStudy } from '@common/enums/field-of-study.enum';
import { OfferStatus } from "@common/enums/offer-status.enum"
import { CreateOfferDto, UpdateOfferDto } from '@modules/offers/dto/offer.dto'; // Import de l'enum Prisma

export class Offer {
  constructor(
    public readonly id: number,
    public title: string,
    public description: string,
    public companyId: number,
    public location: string,
    public salary: number | null,
    public status: OfferStatus, // DRAFT, PUBLISHED, CLOSED
    public fieldOfStudy: FieldOfStudy,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public isDraft():boolean {
    return this.status == OfferStatus.DRAFT;
  }
  public isApplicable():boolean {
    return this.status == OfferStatus.PUBLISHED;
  }

  public updateFromDto(dto: UpdateOfferDto): void {
    if (dto.title) this.title = dto.title;
    if (dto.description) this.description = dto.description;
    if (dto.location) this.location = dto.location;
    if (dto.salary) this.salary = dto.salary;
    if (dto.fieldOfStudy) this.fieldOfStudy = dto.fieldOfStudy;
    this.updatedAt = new Date();
  }

  static fromObject(data: any): Offer {
    return new Offer(
      data.id,
      data.title,
      data.description,
      data.companyId,
      data.location,
      data.salary,
      data.status,
      data.fieldOfStudy as FieldOfStudy,
      data.createdAt,
      data.updatedAt
    );
  }

  static fromDto(companyId: number, dto: CreateOfferDto): Offer {
    return new Offer(
      0,
      dto.title,
      dto.description,
      companyId,
      dto.location,
      dto.salary ?? null,
      OfferStatus.DRAFT, // Statut par défaut
      dto.fieldOfStudy,
      new Date(),
      new Date()
    );
  }

  static fromUpdateDto(dto: Partial<UpdateOfferDto>): Partial<Offer> {
    const update: any = {};
    if (dto.title !== undefined) update.title = dto.title;
    if (dto.description !== undefined) update.description = dto.description;
    if (dto.location !== undefined) update.location = dto.location;
    if (dto.salary !== undefined) update.salary = dto.salary;
    if (dto.fieldOfStudy !== undefined) update.fieldOfStudy = dto.fieldOfStudy;
    return update;
  }
}