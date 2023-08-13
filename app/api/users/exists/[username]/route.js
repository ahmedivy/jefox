import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const username = params.username;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json({
      exists: false,
      error: "User not found",
    });
  }

  if (user.planId) {
    return NextResponse.json({
      exists: true,
      error: "User does not have a plan",
    });
  }

  return NextResponse.json({
    exists: false,
  });
}
