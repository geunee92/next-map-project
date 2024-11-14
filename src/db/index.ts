import { PrismaClient } from "@prisma/client";

/**
 * dev에서는 기존 prisma client를 실행 할 때마다 인스턴스를 생성하고 있어 과도한 생성으로 성능 문제를 야기할 수 있음
 * 한번 생성한 prismaClient를 import해서 사용하도록 수정
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;