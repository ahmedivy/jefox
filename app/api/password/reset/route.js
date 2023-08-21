import prisma from "@/lib/db";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { Resend } from "resend";
import ResetEmail from "@/components/reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.json();
  const { email } = body;

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

  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const resetLink = `${process.env.NEXTAUTH_URL}/reset/password/${token}`;

  const data = await resend.emails.send({
    from: "Jefox Marketing <noreply@jefox.website>",
    to: [user.email],
    subject: "Password Reset",
    react: ResetEmail({ username: user.username, link: resetLink }),
  });

  console.log(data);

  return NextResponse.json({
    message: "Email sent",
    success: true,
  });
}
