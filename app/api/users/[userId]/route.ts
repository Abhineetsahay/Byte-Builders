import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: {
    userid: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { userid } = params;

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
