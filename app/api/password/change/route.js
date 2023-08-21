import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";

import { hash } from "bcryptjs";

export async function POST(request) {
  const data = await request.json();
  const { email, token, password } = data;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return NextResponse.json({
      error: "Invalid token",
    });
  }

  if (decoded.email !== email) {
    return NextResponse.json({
      error: "Invalid token",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({
      error: "User not found",
    });
  }

  const hashedPassword = await hash(password, 10);

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    message: "Password changed",
    success: true,
  });
}
