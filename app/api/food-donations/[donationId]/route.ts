import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: {
    donationId: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { donationId } = params;
    const id = parseInt(donationId, 10);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid donation ID." }, { status: 400 });
    }

    const donation = await prisma.foodDonation.findUnique({
      where: {
        id: id,
      },
      include: {
        donor: true,
        acceptedByOrg: true,
      }
    });

    if (!donation) {
      return NextResponse.json({ error: "Food donation not found." }, { status: 404 });
    }

    return NextResponse.json(donation);

  } catch (error) {
    console.error(`Error fetching food donation ${params.donationId}:`, error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
