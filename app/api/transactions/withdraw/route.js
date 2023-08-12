import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request) {
  const [pendingWithdrawals, completedWithdrawals] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        type: "withdrawal",
        status: "pending",
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.transaction.findMany({
      where: {
        type: "withdrawal",
        status: "completed",
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
  ]);

  return NextResponse.json({
    pendingWithdrawals,
    completedWithdrawals,
  });
}
