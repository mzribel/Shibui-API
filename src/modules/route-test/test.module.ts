import { Module } from '@nestjs/common';
import { TestController } from '@modules/route-test/test.controller';

@Module({
  controllers: [TestController],
})
export class TestModule {}