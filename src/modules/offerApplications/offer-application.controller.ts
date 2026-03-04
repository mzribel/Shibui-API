import { Controller, Post, Body, Param, Delete, Get, UnauthorizedException } from '@nestjs/common';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/enums/role.enum';
import { CreateOfferApplicationDto } from '@modules/offerApplications/dto/offer-application.dto';
import { OfferApplicationService } from '@modules/offerApplications/offer-application.service';

@Controller()
export class OfferApplicationController {
  constructor(private readonly applicationService: OfferApplicationService) {}

  @Post("offers/:offerId/apply")
  apply(@Param("offerId") offerId:number, @Body() applicationDto:CreateOfferApplicationDto, @CurrentUser() user:User){
    return this.applicationService.apply(offerId, applicationDto, user);
  }

  @Delete("applications/:applicationId")
  cancelApplication(@Param("applicationId") applicationId:number, @CurrentUser() user:User) {
    return this.applicationService.cancelApplication(applicationId, user);
  }

  @Roles(Role.STUDENT, Role.ADMIN)
  @Get("/students/:studentId/applications")
  getApplicationsByStudentId(@Param("studentId") studentId:number, @CurrentUser() user:User){
    return this.applicationService.getApplicationsByStudentId(studentId, user);
  }

  @Roles(Role.COMPANY, Role.ADMIN)
  @Get("offers/:offerId/applications")
  getApplicationByOfferId(@Param("offerId") offerId:number, @CurrentUser() user:User){
    return this.applicationService.getApplicationsByOfferId(offerId, user)
  }
}