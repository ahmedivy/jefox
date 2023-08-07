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
      exists: true,
    });
  } else {
    return NextResponse.json({
      exists: false,
    });
  }
}
