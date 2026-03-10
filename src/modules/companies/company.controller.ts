import { Body, Controller, Get, Param, Patch, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Public } from '@common/decorators/roles.decorator';
import { CurrentUser } from '@common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import * as companyProfileDto from '@modules/companies/dto/company-profile.dto';
import { CompanyProfileService } from '@modules/companies/company.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyProfileService) {}

  @Get("companies/:id/profile")
  @Public()
  getCompanyProfile(@Param("id") userId: number) {
    return this.companyService.getCompanyProfile(userId);
  }

  @Patch("companies/:id/profile")
  @UseInterceptors(
  FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
)
  updateCompanyProfile(@Param("id") userId: number, 
    @Body() dto:companyProfileDto.UpdateCompanyProfileDto, 
    @UploadedFiles() files: companyProfileDto.CompanyProfileFileDto,
    @CurrentUser() requestingUser:User) {
    return this.companyService.updateCompanyProfile(userId, dto, files, requestingUser);
  }
}