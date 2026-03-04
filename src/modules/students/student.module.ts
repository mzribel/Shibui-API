import { Module } from '@nestjs/common';
import { StudentController } from '@modules/students/student.controller';
import { StudentProfileService } from '@modules/students/student-profile.service';
import { PrismaStudentProfileRepository } from '@modules/students/repositories/prisma.student-profile.repository';

@Module({
  imports: [],
  controllers: [StudentController],
  providers:[
    PrismaStudentProfileRepository,
    StudentProfileService,
  ],
  exports:[StudentProfileService]
})
export class StudentModule {}