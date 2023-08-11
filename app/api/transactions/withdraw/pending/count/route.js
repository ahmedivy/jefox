import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request) {
  const count = await prisma.transaction.count({
    where: {
      type: "withdraw",
      status: "pending",
    },
  });

  return NextResponse.json({
    count,
  });
}
