import { IStorageProvider } from '@infrastructure/storage/i.storage.provider';
import { Injectable } from '@nestjs/common';
import { validateFileSize, validateMimeType } from '@common/utils/format.validators';

@Injectable()
export class FileService {
  constructor(private readonly storageService:IStorageProvider) {}

  async uploadCVforUser(file: Express.Multer.File, userId:number=1): Promise<{ url: string; key: string }> {
    const path:string = `users/cv-user-${userId}/`;

    validateMimeType(file, ['application/pdf']);
    validateFileSize(file, 10);

    return this.storageService.upload(file, path, { container:"cv" })
  }
  // async uploadCVforApplication(file: Express.Multer.File, applicationId:number): Promise<{ url: string; key: string }> {}
}