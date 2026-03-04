import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CurrentUser } from '@common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import { StudentProfileService } from '@modules/students/student-profile.service';
import { UpdateStudentProfileDto } from '@modules/students/dto/student-profile.dto';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentProfileService) {}

  @Get("students/:userId/profile")
  getStudentProfile(@Param("userId") userId: number, @CurrentUser() requestingUser:User) {
    return this.studentService.getStudentProfile(userId);
  }

  @Patch("students/:userId/profile")
  updateStudentProfile(@Param("userId") userId: number, @Body() dto:UpdateStudentProfileDto, @CurrentUser() requestingUser:User) {
    return this.studentService.updateStudentProfile(userId, dto, requestingUser);
  }
}