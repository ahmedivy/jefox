import prisma from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const username = params.username;

    // Fetch the user's data
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        username: true,
        image: true,
        leftReferralsIds: true,
        rightReferralsIds: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    // Function to recursively build the tree structure
    const buildTree = async (userId) => {
      const users = await prisma.user.findMany({
        where: {
          id: {
            equals: userId,
          },
        },
        select: {
          username: true,
          image: true,
          leftReferralsIds: true,
          rightReferralsIds: true,
        },
      });

      const user = users[0] ?? null;

      if (!user) {
        return null;
      }

      const children = [];

      if (user.leftReferralsIds && user.leftReferralsIds.length > 0) {
        for (const childId of user.leftReferralsIds) {
          const childTree = await buildTree(childId);
          if (childTree) {
            children.push(childTree);
          }
        }
      }

      if (user.rightReferralsIds && user.rightReferralsIds.length > 0) {
        for (const childId of user.rightReferralsIds) {
          const childTree = await buildTree(childId);
          if (childTree) {
            children.push(childTree);
          }
        }
      }

      return {
        name: user.username,
        image: user.image ?? `https://avatar.vercel.sh/${user.username}`,
        children: children,
      };
    };

    // Build the tree structure
    const tree = await buildTree(user.id);

    // Return the tree data
    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error fetching hierarchical data:", error);
    return NextResponse.json({ error: "Error fetching hierarchical data" });
  }
}

export const revalidate = 0;
