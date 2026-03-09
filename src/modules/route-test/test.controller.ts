import { Public, Roles } from '@/common/decorators/roles.decorator';
import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { User } from '@modules/users/models/user';
import { CurrentUser } from '@common/decorators/user.decorator';
import { FileInterceptor} from '@nestjs/platform-express';
import request from 'supertest';
import { IStorageProvider } from '@infrastructure/storage/i.storage.provider';
import { FileService } from '@modules/files/file.service';

@Controller("test")
export class TestController {
  constructor(private readonly fileService: FileService) {}

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

  @UseInterceptors(FileInterceptor("file"))
  @Post("upload")
  async upload(@UploadedFile() file: Express.Multer.File, @CurrentUser() user:User) {
    if (!file) {
      throw new BadRequestException("Aucun fichier reçu");
    }

    const userId = user.id;
    const result = await this.fileService.uploadCVforUser(file);

    return {
      message: "Upload réussi",
      filename: file.originalname,
      storageKey: result.key,
      url: result.url
    };
  }
}