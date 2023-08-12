import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function POST(request) {
  const { planName, username } = await request.json();

  const [user, plan] = await Promise.all([
    prisma.user.findUnique({
      where: { username },
    }),
    prisma.plan.findUnique({
      where: { name: planName },
    }),
  ]);

  if (!user || !plan) {
    return NextResponse.json({
      error: "User or plan not found",
    });
  }

  if (user.balance < plan.price) {
    return NextResponse.json({
      error: "Insufficient Balance",
    });
  }

  if (user.planId) {
    return NextResponse.json({
      error: "User already has a plan",
    });
  }

  // Decrement User Balance
  const updatedUser = await prisma.user.update({
    where: { username },
    data: {
      planId: plan.id,
      balance: user.balance - plan.price,
    },
  });

  // Give Referral Commission
  if (user.referrerId) {
    const referral = await prisma.user.findUnique({
      where: {
        id: user.referrerId,
      },
      include: {
        plan: true,
      },
    });

    if (referral.planId) {
      const updatedReferral = await prisma.user.update({
        where: {
          id: user.referrerId,
        },
        data: {
          balance: {
            increment: referral.plan.referralCommission,
          },
        },
      });
    }
  }

  for (const ancestorId of user.ancestorsIds) {
    if (ancestorId === user.referrerId) continue;

    const ancestor = await prisma.user.findUnique({
      where: {
        id: ancestorId,
      },
      include: {
        plan: true,
      },
    });

    if (ancestor.planId) {
      const updatedAncestor = await prisma.user.update({
        where: {
          id: ancestorId,
        },
        data: {
          balance: {
            increment: ancestor.plan.treeCommission,
          },
        },
      });
    }
  }

  return NextResponse.json({
    success: true,
    user: updatedUser,
  });
}
