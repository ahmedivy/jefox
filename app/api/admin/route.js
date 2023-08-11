import prisma from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET(req) {
  const getUsersCount = async () => {
    const usersCount = await prisma.user.count();
    return usersCount;
  };

  const getdepositRequestsCount = async () => {
    const depositRequestsCount = await prisma.transaction.count({
      where: {
        type: "deposit",
        status: "pending",
      },
    });
    return depositRequestsCount;
  };

  const getwithdrawRequestsCount = async () => {
    const withdrawRequestsCount = await prisma.transaction.count({
      where: {
        type: "withdraw",
        status: "pending",
      },
    });

    return withdrawRequestsCount;
  };

  const [usersCount, depositRequestsCount, withdrawRequestsCount] =
    await Promise.all([
      getUsersCount(),
      getdepositRequestsCount(),
      getwithdrawRequestsCount(),
    ]);

  return NextResponse.json({
    usersCount,
    depositRequestsCount,
    withdrawRequestsCount,
  });
}
