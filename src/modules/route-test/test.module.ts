import { Module } from '@nestjs/common';
import { TestController } from '@modules/route-test/test.controller';
import { StorageModule } from '@infrastructure/storage/storage.module';
import { IStorageProvider } from '@infrastructure/storage/i.storage.provider';
import { FileModule } from '@modules/files/file.module';

@Module({
  controllers: [TestController],
  imports: [FileModule]
})
export class TestModule {}