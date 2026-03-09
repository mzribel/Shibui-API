import { Injectable } from '@nestjs/common';
import { PrismaDbContext } from '@infrastructure/database/prisma/prisma-db-context';
import { Offer } from '@modules/offers/models/Offer';
import { Offer as PrismaOffer } from '@prisma/client';
import { OfferStatus } from '@common/enums/offer-status.enum';

@Injectable()
export class PrismaOfferRepository {
  constructor(private readonly ctx:PrismaDbContext) {}

  async createOffer(data:Offer) {
    const saved:PrismaOffer = await this.ctx.db.offer.create({
      data: {
        title: data.title,
        description: data.description,
        companyId: data.companyId,
        location: data.location,
        salary: data.salary,
        status: data.status,
        fieldOfStudy: data.fieldOfStudy,
      }
    });
    return Offer.fromObject(saved);
  }

  async updateOffer(offerId:number, data:Partial<Offer>) {
    const updated = await this.ctx.db.offer.update({
      where:{id:offerId},
      data:data
    })
    return Offer.fromObject(updated);
  }

  async getOfferById(id:number) {
    const data:PrismaOffer|null = await this.ctx.db.offer.findUnique({where:{id}});
    if (!data) return null;
    return Offer.fromObject(data);
  }

  async updateStatus(offerId:number, status:OfferStatus) {
    await this.ctx.db.offer.update({
      where:{id:offerId},
      data: { status: status, updatedAt: new Date() }
    })
  }

  async getOffersByCompanyIdAndStatus(companyId:number, offerStatus:OfferStatus) {
    const offers = await this.ctx.db.offer.findMany({
      where:{companyId:companyId, status:offerStatus},
    })
    return offers.map(offer => Offer.fromObject(offer));
  }
  async getOffersByCompanyId(companyId:number) {
    const offers = await this.ctx.db.offer.findMany({
      where:{companyId:companyId},
    })
    return offers.map(offer => Offer.fromObject(offer));
  }

  async deleteOffer(offerId:number) {
    await this.ctx.db.offer.delete({where:{id:offerId}});
  }

  async getVisibleOffers(): Promise<Offer[]> {
    const offersData = await this.ctx.db.offer.findMany({
      where: {
        company: {
          isVerified: true
        }
      }
    });

    return offersData.map(data => Offer.fromObject(data));
  }
}