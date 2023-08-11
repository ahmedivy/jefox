import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request) {
  const usersCount = await prisma.user.count();

  return NextResponse.json({
    usersCount,
  });
}
