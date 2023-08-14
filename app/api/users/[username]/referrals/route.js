import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const username = params.username;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      firstname: true,
      lastname: true,
      leftReferralsIds: true,
      rightReferralsIds: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      error: "User not found",
    });
  }

  const fetchLefts = async (user) => {
    const lefts = await prisma.user.findMany({
      where: {
        id: {
          in: user.leftReferralsIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        createdAt: true,
        image: true,
      },
    });
    return lefts;
  };

  const fetchRights = async (user) => {
    const rights = await prisma.user.findMany({
      where: {
        id: {
          in: user.rightReferralsIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        createdAt: true,
        image: true,
      },
    });
    return rights;
  };

  const [lefts, rights] = await Promise.all([
    fetchLefts(user),
    fetchRights(user),
  ]);

  return NextResponse.json({
    success: true,
    user,
    lefts,
    rights,
  });
}

export const revalidate = 0;