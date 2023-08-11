import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request) {
  const count = await prisma.transaction.count({
    where: {
      type: "deposit",
      status: "pending",
    },
  });

  return NextResponse.json({
    count,
  });
}
