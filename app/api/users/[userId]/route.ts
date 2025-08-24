
export async function GET(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { userId } = await context.params;

    // Check if user has access to this user data
    // Admins can access all users, users can only access their own data
    if (session.user.role !== 'admin' && userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error(`Error fetching user:`, error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

