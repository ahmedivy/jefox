import prisma from "@/lib/db";

import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();

  const {
    firstname,
    lastname,
    email,
    password,
    phone,
    country,
    referrer,
    position,
    username,
  } = res;

  const referrerUser = await prisma.user.findUnique({
    where: {
      username: referrer,
    },
  });

  if (!referrerUser) {
    return NextResponse.json({
      error: "Referrer not found",
    });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password,
      phone,
      country,
      referrerId: referrerUser.id,
      position,
      ancestorsIds: [...referrerUser.ancestorsIds, referrerUser.id],
      username: username.toLowerCase(),
      password: hashedPassword,
      leftReferralsIds: [],
      rightReferralsIds: [],
      image: null,
    },
  });

  const referrerUserUpdated = await prisma.user.update({
    where: {
      id: referrerUser.id,
    },
    data: {
      [position === "left" ? "leftReferralsIds" : "rightReferralsIds"]:
        position === "left"
          ? [...referrerUser.leftReferralsIds, user.id]
          : [...referrerUser.rightReferralsIds, user.id],
    },
  });

  return NextResponse.json({
    success: true,
    user,
  });
}
