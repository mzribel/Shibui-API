import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '@infrastructure/supabase/supabase.service';

@Injectable()
export class SupabaseStorageService  {
  constructor(private readonly supabase: SupabaseService) {}

  async getSignedUrl(key: string, expiresIn = 3600, options?: { container?: string }): Promise<string> {
    if (!options?.container) throw new InternalServerErrorException("Supabase bucket is missing");

    const { data, error } = await this.supabase.adminClient.storage
      .from(options.container)
      .createSignedUrl(key, expiresIn);

    if (error) {
      throw new BadRequestException(`Impossible de générer l'URL signée : ${error.message}`);
    }

    return data.signedUrl;
  }

  getPublicUrl(key: string, options?: { container?: string }): string {
    if (!options?.container) throw new InternalServerErrorException("Supabase bucket is missing");

    const { data } = this.supabase.adminClient.storage
      .from(options.container)
      .getPublicUrl(key);

    return data.publicUrl;
  }

  async upload(file: Express.Multer.File, path: string, options?: { container?: string }): Promise<{ url: string; key: string }> {
    if (!options?.container) throw new InternalServerErrorException("Supabase bucket is missing 1");

    const { data, error } = await this.supabase.adminClient.storage
      .from(options.container)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new BadRequestException(`Échec de l'upload Supabase : ${error.message}`);
    }

    return {
      key: data.path,
      url: this.getPublicUrl(data.path, options),
    };
  }
}