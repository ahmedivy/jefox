import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const username = params.username;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user) {
    return NextResponse.json({
      success: true,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        leftReferrals: user.leftReferralsIds.length,
        rightReferrals: user.rightReferralsIds.length,
        balance: user.balance,
        deposited: user.deposited,
        withdrawn: user.withdrawn,
      },
    });
  } else {
    return NextResponse.json({
      error: "User not found",
    });
  }
}
