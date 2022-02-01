import { PrismaClient } from "@prisma/client";

export type DbPort = {
  db: PrismaClient,
  transaction: (...args: any[]) => any;
  connect: () => any;
  disconnect: () => any;
}