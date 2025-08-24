import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import z from "zod";

const CreateOrganizationSchema = z.object({
  email: z.string().email("A valid email is required."),
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
});

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Only admins can create organizations
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsedData = CreateOrganizationSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const existingOrg = await prisma.organization.findFirst({
      where: { email: parsedData.data.email }
    });

    if (existingOrg) {
      return NextResponse.json({ error: "Organization with this email already exists." }, { status: 409 });
    }

    const newOrg = await prisma.organization.create({
      data: parsedData.data,
    });

    return NextResponse.json(newOrg, { status: 201 });

  } catch (error) {
    console.error("Error creating organization:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const organizations = await prisma.organization.findMany({
      include: {
        foodDonationsAccepted: true,
        issuesAccepted: true,
      },
    });

    return NextResponse.json(organizations);

  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
