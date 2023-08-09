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
      user: user,
    }); 
  } else {
    return NextResponse.json({
      error: "User not found",
    });
  }
}
