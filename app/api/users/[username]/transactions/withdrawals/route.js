import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request, { params }) {
  const username = params.username;
  const withdrawals = await prisma.transaction.findMany({
    where: {
      user: {
        username,
      },
      type: "withdrawal",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    withdrawals,
  });
}

export async function POST(request, { params }) {
  const username = params.username;
  const { amount, method, account, accountNumber } = await request.json();

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

  if (user.balance < Number(amount)) {
    return NextResponse.json({
      error: "Insufficient balance",
    });
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      balance: user.balance - Number(amount),
      withdrawn: user.withdrawn + Number(amount),
    },
  });

  const withdrawal = await prisma.transaction.create({
    data: {
      userId: user.id,
      amount: Number(amount),
      method,
      account,
      accountNumber,
      type: "withdrawal",
    },
  });

  return NextResponse.json({
    withdrawal,
    user: updatedUser,
  });
}
