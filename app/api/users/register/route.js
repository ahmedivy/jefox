import prisma from "@/lib/db";

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

  console.log(res);

  const referrerUser = await prisma.user.findUnique({
    where: {
      username: referrer,
    },
  });

  

  // const updatedreferrerUser = await prisma.user.update({
  //   where: {
  //     id: referrerUser.id,
  //   },
  //   data: {
  //     [position === "left" ? "leftReferralsIds" : "rightReferralsIds"]: [.]
  // })

  

  return NextResponse.json({
    ...request.body,
  });
}
