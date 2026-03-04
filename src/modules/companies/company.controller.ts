import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Public } from '@common/decorators/roles.decorator';
import { CurrentUser } from '@common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from '@modules/companies/dto/company-profile.dto';
import { CompanyProfileService } from '@modules/companies/company.service';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyProfileService) {}

  @Get("companies/:id/profile")
  @Public()
  getCompanyProfile(@Param("id") userId: number) {
    return this.companyService.getCompanyProfile(userId);
  }

  @Patch("companies/:id/profile")
  updateCompanyProfile(@Param("id") userId: number, @Body() dto:UpdateCompanyProfileDto, @CurrentUser() requestingUser:User) {
    return this.companyService.updateCompanyProfile(userId, dto, requestingUser);
  }
}