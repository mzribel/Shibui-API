import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaOfferRepository } from '@modules/offers/repositories/prisma.offer.repository';
import { User } from '@modules/users/models/user';
import { CreateOfferDto, UpdateOfferDto } from '@modules/offers/dto/offer.dto';
import { Offer } from '@modules/offers/models/Offer';
import { OfferStatus } from '@common/enums/offer-status.enum';
import { CompanyProfile } from '@modules/companies/models/company-profile';
import { CompanyProfileService } from '@modules/companies/company.service';

@Injectable()
export class OfferService {
  constructor(private readonly offerRepository: PrismaOfferRepository,
              private readonly companyProfileService: CompanyProfileService) {}

  getOffersByCompanyId(companyId:number, requestingUser:User) {
    throw new NotImplementedException("Method not implemented.");
  }

  async getVisibleOffersByCompanyId(companyId:number, requestingUser:User|null) {
    const companyProfile = await this.companyProfileService.getCompanyProfileOrNull(companyId);
    if (!companyProfile) throw new NotFoundException()

    // if (!requestingUser?.isSelfOrAdmin(companyId)) {
    //   if (!companyProfile.isVerified) throw new NotFoundException()
    //   return this.offerRepository.getOffersByCompanyIdAndStatus(companyId, OfferStatus.PUBLISHED)
    // }

    return this.offerRepository.getOffersByCompanyId(companyId);
  }

  async getOfferById(offerId:number, requestingUser:User|null){
    const offer:Offer|null = await this.offerRepository.getOfferById(offerId);
    if (!offer) throw new NotFoundException();

    const companyProfile = await this.companyProfileService.getCompanyProfileOrNull(offer.companyId);
    // Entreprise non-vérifiée ou offre en brouillon
    if (offer.isDraft()) {
      // Offre seulement visible à soi-même ou aux admins
      if (!requestingUser || !requestingUser.isSelfOrAdmin(offer.companyId))
        throw new ForbiddenException();
    }

    return offer;
  }

  async createOffer(userId:number, dto:CreateOfferDto, requestingUser:User){
    const company = await this.companyProfileService.getCompanyProfile(userId);

    if (!requestingUser.isSelfOrAdmin(company.userId)) { throw new ForbiddenException()}

    const offer = Offer.fromDto(userId, dto);
    return this.offerRepository.createOffer(offer);
  }

  async updateOffer(offerId:number, dto:UpdateOfferDto, requestingUser:User){
    const offer = await this.offerRepository.getOfferById(offerId);
    if (!offer) throw new NotFoundException();

    if (!requestingUser.isSelfOrAdmin(offer.companyId)) throw new ForbiddenException();
    if (offer.status == OfferStatus.CLOSED) throw new BadRequestException("Impossible to update a closed offer");

    offer.updateFromDto(dto);
    return await this.offerRepository.updateOffer(offerId, offer);
  }


  searchOffer(filters:any, requestingUser:User){
    throw new NotImplementedException("Method not implemented.");
  }

  async publishOffer(offerId:number, requestingUser:User) {
    const offer = await this.offerRepository.getOfferById(offerId);
    if (!offer) throw new NotFoundException();
    if (!requestingUser.isSelfOrAdmin(offer.companyId)) throw new ForbiddenException();

    if (offer.status != OfferStatus.DRAFT && offer.status != OfferStatus.CLOSED) throw new BadRequestException();
    await this.offerRepository.updateStatus(offerId, OfferStatus.PUBLISHED);
  }

  async closeOffer(offerId:number, requestingUser:User) {
    const offer = await this.offerRepository.getOfferById(offerId);
    if (!offer) throw new NotFoundException();
    if (!requestingUser.isSelfOrAdmin(offer.companyId)) throw new ForbiddenException();

    if (offer.status == OfferStatus.CLOSED) throw new BadRequestException();
    await this.offerRepository.updateStatus(offerId, OfferStatus.PUBLISHED);
  }

  async deleteOffer(offerId:number, requestingUser:User) {
    const offer = await this.offerRepository.getOfferById(offerId);
    if (!offer) throw new NotFoundException();
    if (!requestingUser.isSelfOrAdmin(offer.companyId)) throw new ForbiddenException();

    await this.offerRepository.deleteOffer(offerId);
  }

  async getOfferForApplication(offerId:number):Promise<Offer> {
    const offer = await this.offerRepository.getOfferById(offerId);
    if (!offer) throw new BadRequestException("Offer doesn't exist");

    const company:CompanyProfile = await this.companyProfileService.getCompanyProfile(offer.companyId);
    if (!company) throw new NotFoundException();

    if (!offer.isApplicable())
      throw new BadRequestException("This offer cannot be applied to.");

    return offer;
  }

  async getVisibleOffers(requestingUser:User):Promise<Offer[]> {
    throw new NotImplementedException()
  }
}
