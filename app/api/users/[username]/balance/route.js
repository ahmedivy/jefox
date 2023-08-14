import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request, { params }) {
  const username = params.username;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      balance: true,
    },
  });

  return NextResponse.json(user);
}

export const revalidate = 0;