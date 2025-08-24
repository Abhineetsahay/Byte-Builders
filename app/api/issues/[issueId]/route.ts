import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: {
    issueId: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { issueId } = params;

    const issue = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        acceptedBy: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found." }, { status: 404 });
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error(`Error fetching issue ${params.issueId}:`, error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}