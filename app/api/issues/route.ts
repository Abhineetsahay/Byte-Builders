import { IssueCategory, IssueStatus, IssueUrgencyLevel } from "@/lib/generated/prisma";
import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
  photoURL: z.string().url("A valid photo URL is required."),
  location: z.string().min(3, "Location is required."),
  userId: z.string().uuid("A valid user ID is required."),
  category: z.nativeEnum(IssueCategory),
  status: z.nativeEnum(IssueStatus),
  urgencyLevel: z.nativeEnum(IssueUrgencyLevel),
});

export async function GET(req: NextRequest) {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newIssue = await prisma.issue.create({
      data: {
        title: validation.data.title,
        description: validation.data.description,
        photoURL: validation.data.photoURL,
        location: validation.data.location,
        userId: validation.data.userId,
        category: validation.data.category,
        status: validation.data.status,
        urgencyLevel: validation.data.urgencyLevel,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}