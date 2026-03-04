import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaCompanyProfileRepository } from "./repositories/prisma.company-profile.repository";
import { CompanyProfile } from '@modules/companies/models/company-profile';
import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from './dto/company-profile.dto';
import { User } from '@modules/users/models/user';

@Injectable()
export class CompanyProfileService {
    constructor(
        private readonly companyProfileRepository: PrismaCompanyProfileRepository
    ){}

  async createCompanyProfile(userId: number, dto: CreateCompanyProfileDto): Promise<CompanyProfile> {
    if (dto.siret) {
      const existsBySiret = await this.companyProfileRepository.existsBySiret(dto.siret);
      if (existsBySiret) {
        throw new ConflictException("A company with this SIRET has already been registered");
      }
    }

    const profile = CompanyProfile.fromDto(userId, dto);
    return await this.companyProfileRepository.createProfile(profile);
  }

  async getCompanyProfile(userId:number):Promise<CompanyProfile> {
    const profile = await this.companyProfileRepository.findByUserId(userId);
    if (!profile) { throw new NotFoundException()}
    return profile;
  }

  async getCompanyProfileOrNull(userId:number):Promise<CompanyProfile|null> {
    return  this.companyProfileRepository.findByUserId(userId);
  }

  async updateCompanyProfile(userId: number, dto: Partial<UpdateCompanyProfileDto>, requestingUser:User): Promise<CompanyProfile> {
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

    // Sauvegarde et renvoie
    const updateData = CompanyProfile.fromUpdateDto(dto);
    return await this.companyProfileRepository.updateProfile(userId, updateData);
  }
}