import { Injectable } from '@nestjs/common';
import { PrismaDbContext } from "@/infrastructure/database/prisma/prisma-db-context";
import { StudentProfile } from '../models/student-profile';

@Injectable()
export class PrismaStudentProfileRepository {
  constructor(private readonly ctx: PrismaDbContext) {}

  async createProfile(data: StudentProfile): Promise<StudentProfile> {
    const saved = await this.ctx.db.studentProfile.create({ data });
    return StudentProfile.fromObject(saved);
  }

  async findByUserId(userId: number): Promise<StudentProfile | null> {
    const record = await this.ctx.db.studentProfile.findUnique({ where: { userId } });
    return record ? StudentProfile.fromObject(record) : null;
  }

  async updateProfile(userId: number, data: Partial<StudentProfile>): Promise<StudentProfile> {
    const updated = await this.ctx.db.studentProfile.update({
      where: { userId },
      data: data
    });
    return StudentProfile.fromObject(updated);
  }
}