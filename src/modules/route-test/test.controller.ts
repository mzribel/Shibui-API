import { Public, Roles } from '@/common/decorators/roles.decorator';
import { Controller, Get } from '@nestjs/common';
import { User } from '@modules/users/models/user';
import { CurrentUser } from '@common/decorators/user.decorator';

@Controller("test")
export class TestController {

  @Get() @Public()
  helloWorld() {
    return "Hello world !"
  }

  @Get("auth")
  testAuth() {
    return "Hello from authenticated route !"
  }

  @Get("admin")
  @Roles("ADMIN")
  testAdminRole() {
    return "Hello from admin route !"
  }

  @Get("student")
  @Roles("STUDENT", "ADMIN")
  testStudentRole() {
    return "Hello from student route !"
  }

  @Get("company")
  @Roles("COMPANY")
  testCompanyRole() {
    return "Hello from company route !"
  }

  @Get("user")
  getUser(@CurrentUser() user:User) {
    return user;
  }
}