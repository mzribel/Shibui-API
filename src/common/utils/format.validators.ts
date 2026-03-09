import { BadRequestException } from '@nestjs/common';

export function validateMimeType(file: Express.Multer.File, allowedTypes: string[]) {
  if (!allowedTypes.includes(file.mimetype)) {
    throw new BadRequestException(
      `Type de fichier non autorisé (${file.mimetype}). Attendus : ${allowedTypes.join(', ')}`
    );
  }
}

export function validateFileSize(file: Express.Multer.File, maxSizeInMb: number) {
  if (file.size > maxSizeInMb * 1024 * 1024) {
    throw new BadRequestException(`Fichier trop lourd (max ${maxSizeInMb}MB)`);
  }
}