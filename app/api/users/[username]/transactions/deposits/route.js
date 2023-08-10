import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request) {
  const username = params.username;
  const deposits = await prisma.plan.findMany({
    where: {
      user: {
        username,
      },
      type: "deposit",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    deposits,
  });
}
