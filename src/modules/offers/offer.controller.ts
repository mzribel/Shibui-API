import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOfferDto } from '@modules/offers/dto/offer.dto';
import { CurrentUser } from '@common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import { Public } from '@/common/decorators/roles.decorator';
import { OfferService } from '@modules/offers/offer.service';

@Controller()
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Public()
  @Get("/offers")
  getOffers(@CurrentUser() requestingUser:User) {
    return this.offerService.getVisibleOffers(requestingUser);
  }

  @Public()
  @Get("/offers/:offerId")
  getOffer(@Param("offerId") offerId: number, @CurrentUser() currentUser:User|null) {
    return this.offerService.getOfferById(offerId, currentUser);
  }

  @Public()
  @Get("/companies/:id/offers")
  getOffersByCompanyId(@Param("id") companyId:number, @CurrentUser() requestingUser:User){
    console.log(requestingUser)
    return this.offerService.getVisibleOffersByCompanyId(companyId, requestingUser);
  }

  @Post("/companies/:id/offers")
  createOffer(@Param("id") companyId:number, @Body() dto:CreateOfferDto, @CurrentUser() requestingUser:User){
    return this.offerService.createOffer(companyId, dto, requestingUser);
  }

  @Patch("/offers/:id")
  updateOffer(@Param("id") offerId:number, @Body() dto:CreateOfferDto, @CurrentUser() requestingUser:User){
    return this.offerService.updateOffer(offerId, dto, requestingUser);
  }

  @Patch("/offers/:offerId/publish")
  publishOffer(@Param("offerId") offerId:number, @CurrentUser() requestingUser:User){
    this.offerService.publishOffer(offerId, requestingUser);
  }

  @Patch("/offers/:offerId/close")
  closeOffer(@Param("offerId") offerId:number, @CurrentUser() requestingUser:User){
    this.offerService.closeOffer(offerId, requestingUser);
  }

  @Delete("/offers/:offerId")
  deleteOffer(@Param("offerId") offerId:number, @CurrentUser() requestingUser:User){
    this.offerService.deleteOffer(offerId, requestingUser);
  }
}