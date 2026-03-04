import { OfferApplication } from '@modules/offerApplications/models/offerApplication';
import { OfferApplication as PrismaOfferApplication } from '@prisma/client'
import { PrismaDbContext } from '@infrastructure/database/prisma/prisma-db-context';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaOfferApplicationRepository {
  constructor(private readonly ctx:PrismaDbContext) {}

  async createApplication(application: OfferApplication): Promise<OfferApplication> {
    const createdData:PrismaOfferApplication = await this.ctx.db.offerApplication.create({
      data: {
        description: application.description,
        cvUrl: application.cvUrl,
        status: application.status,
        studentId: application.studentId,
        offerId: application.offerId,
        createdAt: application.createdAt,
      },
    });

    return OfferApplication.fromObject(createdData);
  }

  async getById(id: number): Promise<OfferApplication | null> {
    const data = await this.ctx.db.offerApplication.findUnique({
      where: { id },
    });

    if (!data) return null;

    return OfferApplication.fromObject(data);
  }

  async updateApplication(id: number, application: Partial<OfferApplication>): Promise<OfferApplication> {
    const updatedData = await this.ctx.db.offerApplication.update({
      where: { id },
      data: {
        description: application.description,
        cvUrl: application.cvUrl,
        status: application.status,
        updatedAt: new Date(),
      },
    });

    return OfferApplication.fromObject(updatedData);
  }

  async getByStudentId(studentId: number): Promise<OfferApplication[]> {
    const applications:PrismaOfferApplication[] = await this.ctx.db.offerApplication.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });

    return applications.map((data:PrismaOfferApplication) => OfferApplication.fromObject(data));
  }

  async getByOfferId(offerId: number): Promise<OfferApplication[]> {
    const applications:PrismaOfferApplication[] = await this.ctx.db.offerApplication.findMany({
      where: { offerId },
      orderBy: { createdAt: 'desc' },
    });

    return applications.map((data:PrismaOfferApplication) => OfferApplication.fromObject(data));
  }

  async deleteApplication(id: number): Promise<void> {
    await this.ctx.db.offerApplication.delete({where:{id}})
  }

  async existsByStudentAndOffer(studentId: number, offerId: number): Promise<boolean> {
    const count = await this.ctx.db.offerApplication.count({
      where: {
        studentId: studentId,
        offerId: offerId,
      },
    });

    return count > 0;
  }
}