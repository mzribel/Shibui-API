import { BadRequestException } from '@nestjs/common';

export abstract class IStorageProvider {
  abstract getSignedUrl(key: string, expiresIn?: number, options?: { container?: string }): Promise<string>;
  abstract getPublicUrl(key: string, options?: { container?: string }): string;
  abstract upload(file: Express.Multer.File, path: string, options?:any): Promise<{ url: string; key: string }>;
}