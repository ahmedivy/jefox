import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request) {
  const plans = await prisma.plan.findMany({});

  return NextResponse.json({
    plans,
  });
}
