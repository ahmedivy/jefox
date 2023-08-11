import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request) {
  const deposits = await prisma.transaction.findMany({
    where: {
      type: "deposit",
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
  });

  return NextResponse.json(deposits);
}
