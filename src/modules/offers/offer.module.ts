import { OfferController } from '@modules/offers/offer.controller';
import { OfferService } from '@modules/offers/offer.service';
import { Module } from '@nestjs/common';
import { PrismaOfferRepository } from '@modules/offers/repositories/prisma.offer.repository';
import { CompanyModule } from '@modules/companies/company.module';

@Module({
  imports: [CompanyModule],
  controllers: [OfferController],
  providers:[
    OfferService,
    PrismaOfferRepository,
  ],
  exports:[OfferService]
})
export class OfferModule {}