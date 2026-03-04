import { PrismaDbContext } from './prisma-db-context';
import { PrismaService } from './prisma.service';
import { Global, Module } from '@nestjs/common';
import { PrismaTransactionRunner } from './prisma.transaction-runner';

@Global() // Pour que tous les modules y aient accès par défaut
@Module({
  providers: [
    PrismaService,
    PrismaDbContext,
    PrismaTransactionRunner
  ],
  exports: [
    PrismaDbContext,
    PrismaTransactionRunner],
})
export class PrismaModule {}
