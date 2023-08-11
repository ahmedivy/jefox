import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request, { params }) {
  const id = params.id;

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!transaction) {
    return NextResponse.json({
      error: "Transaction not found",
    });
  }

  return NextResponse.json({
    transaction,
  });
}

export async function PUT(request, { params }) {
  const id = params.id;
  const { action } = await request.json();

  const transaction = await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      status: action === "confirm" ? "completed" : "rejected",
    },
  });

  if (action === "confirm") {
    const user = await prisma.user.update({
      where: {
        id: transaction.userId,
      },
      data: {
        balance: {
          increment: transaction.amount,
        },
        deposited: {
          increment: transaction.amount,
        },
      },
    });
  }

  return NextResponse.json({
    transaction,
  });
}
