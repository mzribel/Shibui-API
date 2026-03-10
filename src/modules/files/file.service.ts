import { IStorageProvider } from '@infrastructure/storage/i.storage.provider';
import { Injectable } from '@nestjs/common';
import { validateFileSize, validateMimeType } from '@common/utils/format.validators';

@Injectable()
export class FileService {
  constructor(private readonly storageService:IStorageProvider) {}

  async uploadCV(file: Express.Multer.File, userId:number=1): Promise<{ url: string; key: string }> {
    const path:string = `users/cv-user-${userId}/`;

    validateMimeType(file, ['application/pdf']);
    validateFileSize(file, 10);

    return this.storageService.upload(file, path, { container:"cv" })
  }

  async uploadImage(file: Express.Multer.File, userId:number=1, type:"avatar"|"cover"|"logo"="avatar") {
    const path = type != "avatar" ? 
      `users/${type}-${userId}/` : 
      `company/${type}-${userId}/`;

    validateMimeType(file, ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']);

    return this.storageService.upload(file, path, { container:"images" })
  }

  async getCV(path:string) {
    return this.storageService.getSignedUrl(path, undefined, { container:"cv"})
  }
  async getImage(path:string) {
    return this.storageService.getPublicUrl(path, { container:"images"})
  }
}