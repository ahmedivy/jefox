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
        country: user.country,
        phone: user.phone,
        image: user.image
          ? user.image
          : `https://avatar.vercel.sh/${user.username}`,
      },
    });
  } else {
    return NextResponse.json({
      error: "User not found",
    });
  }
}

export async function PUT(request, { params }) {
  const username = params.username;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user) {
    const { firstname, lastname, country, image } = await request.json();
    await prisma.user.update({
      where: {
        username,
      },
      data: {
        firstname,
        lastname,
        country,
        image,
      },
    });
    return NextResponse.json({
      success: true,
    });
  } else {
    return NextResponse.json({
      error: "User not found",
    });
  }
}
