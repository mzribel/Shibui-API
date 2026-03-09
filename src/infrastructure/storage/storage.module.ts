import { Module } from '@nestjs/common';
import { SupabaseStorageService } from '@infrastructure/storage/supabase/supabase-storage.service';
import { IStorageProvider } from '@infrastructure/storage/i.storage.provider';
import { SupabaseModule } from '@infrastructure/supabase/supabase.module';

@Module({
  imports: [ SupabaseModule ],
  providers:[
    { provide: IStorageProvider, useClass: SupabaseStorageService },
  ],
  exports:[IStorageProvider]
})
export class StorageModule {}