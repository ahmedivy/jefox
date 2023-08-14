import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export const revalidate = 0;

export async function GET(request, { params }) {
  const username = params.username;
  const deposits = await prisma.transaction.findMany({
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

export async function POST(request, { params }) {
  const username = params.username;
  const { amount, method, url } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json({
      error: "User not found",
    });
  }

  const deposit = await prisma.transaction.create({
    data: {
      userId: user.id,
      amount: Number(amount),
      method,
      imageUrl: url,
      type: "deposit",
    },
  });

  return NextResponse.json({
    deposit,
  });
}
