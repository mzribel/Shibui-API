import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { PrismaCompanyProfileRepository } from "./repositories/prisma.company-profile.repository";
import { CompanyProfile } from '@modules/companies/models/company-profile';
import { CompanyProfileFileDto, CreateCompanyProfileDto, UpdateCompanyProfileDto } from './dto/company-profile.dto';
import { User } from '@modules/users/models/user';
import { FileService } from '../files/file.service';
import { omitUndefined } from '@/common/utils/omit-undefined';

@Injectable()
export class CompanyProfileService {
    constructor(
        private readonly companyProfileRepository: PrismaCompanyProfileRepository,
        private readonly fileService: FileService
    ){}

  async createCompanyProfile(userId: number, dto: CreateCompanyProfileDto): Promise<CompanyProfile> {
    if (dto.siret) {
      const existsBySiret = await this.companyProfileRepository.existsBySiret(dto.siret);
      if (existsBySiret) {
        throw new ConflictException("A company with this SIRET has already been registered");
      }
    }

    const profile = CompanyProfile.fromObject({userId, ...dto});
    const savedProfile = await this.companyProfileRepository.createProfile(profile);
    return this.enrichProfileWithImageUrls(savedProfile); 
  }

  async getCompanyProfile(userId:number):Promise<CompanyProfile> {
    const profile = await this.companyProfileRepository.findByUserId(userId);
    if (!profile) { throw new NotFoundException()}
    return this.enrichProfileWithImageUrls(profile);
  }

  async getCompanyProfileOrNull(userId:number):Promise<CompanyProfile|null> {
    let profile = await this.companyProfileRepository.findByUserId(userId);
    return profile ? await this.enrichProfileWithImageUrls(profile) : null;
  }

  private async validateUpdateCompanyProfile(userId: number, dto: Partial<UpdateCompanyProfileDto>, files:CompanyProfileFileDto, requestingUser:User) {
    if (!requestingUser.isSelfOrAdmin(userId)) {
      throw new ForbiddenException()
    }
    // Récupère le profil
    const existing = await this.companyProfileRepository.findByUserId(userId);
    if (!existing) throw new NotFoundException("Profil entreprise introuvable.");

    // Vérifie le siret
    if (dto.siret && dto.siret !== existing.siret) {
      const alreadyExists = await this.companyProfileRepository.existsBySiret(dto.siret);
      if (alreadyExists) throw new ConflictException("Ce numéro SIRET est déjà utilisé par une autre entreprise.");
    }
    return true;
  }

  async updateCompanyProfile(userId: number, dto: Partial<UpdateCompanyProfileDto>, files:CompanyProfileFileDto, requestingUser:User): Promise<CompanyProfile> {
    this.validateUpdateCompanyProfile(userId, dto, files, requestingUser);
    
    const uploadedFiles:UploadedCompanyFiles|undefined = files ? await this.uploadImages(files, userId) : undefined;
    const updateData = !uploadedFiles ? CompanyProfile.toUpdateData(dto) : 
    { 
      ...CompanyProfile.toUpdateData(dto),
      coverUrl:uploadedFiles.cover?.key,
      logoUrl:uploadedFiles.logo?.key
    }

    const profile = await this.companyProfileRepository.updateProfile(userId, updateData);

    return await this.enrichProfileWithImageUrls(profile);
  }

  async enrichProfileWithImageUrls(profile:CompanyProfile) {
    if (profile.coverUrl)
      profile.coverUrl = await this.fileService.getImage(profile.coverUrl);
    if (profile.logoUrl)
      profile.logoUrl = await this.fileService.getImage(profile.logoUrl);

    return profile;
  }

  private async uploadImages(files:CompanyProfileFileDto, userId:number) {
    console.log(files)
    let links:UploadedCompanyFiles = {cover:null,logo:null}
    if (files.logo)
      links.logo = await this.fileService.uploadImage(files.logo[0], userId, "logo");
    if (files.cover)
      links.cover = await this.fileService.uploadImage(files.cover[0], userId, "cover");
    
    return links;
  }
}  

export interface UploadedFile {
    key:string,
    url:string
  }
  export interface UploadedCompanyFiles {
    cover:UploadedFile|null,
    logo:UploadedFile|null
  }