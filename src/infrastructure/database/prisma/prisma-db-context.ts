// src/infrastructure/prisma/prisma-db-context.ts
import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { AsyncLocalStorage } from "node:async_hooks";
import { PrismaService } from "./prisma.service";

type PrismaTx = Prisma.TransactionClient;

@Injectable()
export class PrismaDbContext {
  private readonly als = new AsyncLocalStorage<PrismaTx>();

  constructor(private readonly prisma: PrismaService) {}

  get db() {
    return this.als.getStore() ?? this.prisma;
  }

  runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => this.als.run(tx, fn));
  }
}
