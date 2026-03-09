import { Module } from '@nestjs/common';
import { StorageModule } from '@infrastructure/storage/storage.module';
import { FileService } from '@modules/files/file.service';

@Module({
  imports: [StorageModule],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}