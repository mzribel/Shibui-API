// src/infrastructure/prisma/prisma-transaction-runner.ts
import { Injectable } from "@nestjs/common";
import { PrismaDbContext } from "./prisma-db-context";

@Injectable()
export class PrismaTransactionRunner {
  constructor(private readonly ctx: PrismaDbContext) {}

  run<T>(fn: () => Promise<T>): Promise<T> {
    return this.ctx.runInTransaction(fn);
  }
}
