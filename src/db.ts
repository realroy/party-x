import { PrismaClient, PrismaPromise, UnwrapTuple } from "@prisma/client";

import { DbPort } from "./ports";

export const db: () => DbPort = () => {
  const client = new PrismaClient();

  return {
    db: client,
    transaction: client.$transaction,
    connect: client.$connect,
    disconnect: client.$disconnect
  };
};

export type DbTransaction = <P extends PrismaPromise<any>[]>(arg: [...P]) => Promise<UnwrapTuple<P>>