import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

interface RouteContext {
  params: {
    userid: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { userid } = params;

    // Check if user has access to this user data
    // Admins can access all users, users can only access their own data
    if (session.user.role !== 'admin' && userid !== session.user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error(`Error fetching user ${params.userid}:`, error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
