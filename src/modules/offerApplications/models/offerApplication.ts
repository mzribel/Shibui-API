import { CreateOfferApplicationDto } from '@modules/offerApplications/dto/offer-application.dto';
import { OfferApplicationStatus } from '@common/enums/offer-application-status';

export class OfferApplication {
  constructor(
    public readonly id:number,
    public readonly studentId: number,
    public readonly offerId:number,
    public readonly description:string,
    public readonly cvUrl:string,
    public readonly createdAt:Date,
    public readonly updatedAt:Date|null,
    public readonly status : OfferApplicationStatus
  ){}

  // Modifiable tant que pas acceptée/refusée/annulée
  canBeModified():boolean {
    return this.status == OfferApplicationStatus.SUBMITTED;
  }

  static fromObject(data:any):OfferApplication {
    return new OfferApplication(
      data.id,
      data.studentId,
      data.offerId,
      data.description,
      data.cvUrl,
      data.createdAt,
      data.updatedAt,
      data.status,
    )
  }

  static fromDto(offerId:number, dto:CreateOfferApplicationDto):OfferApplication {
    return new OfferApplication(
      0,
      dto.studentId,
      offerId,
      dto.description,
      dto.cvUrl,
      new Date(),
      null,
      OfferApplicationStatus.SUBMITTED
    );
  }
}