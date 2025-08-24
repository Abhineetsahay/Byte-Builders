import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const CreateFoodDonationSchema = z.object({
  foodType: z.string().min(1, "Food type is required."),
  weight: z.number().positive("Weight must be a positive number."),
  pickupAddress: z.string().min(1, "Pickup address is required."),
  photoURL: z.string().url("Must be a valid URL."),
  description: z.string().min(1, "Description is required."),
  donorUserId: z.string().uuid("Invalid user ID format."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = CreateFoodDonationSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const newFoodDonation = await prisma.foodDonation.create({
      data: parsedData.data,
    });

    return NextResponse.json(newFoodDonation, { status: 201 });

  } catch (error) {
    console.error("Error creating food donation:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const donations = await prisma.foodDonation.findMany({
      include: {
        donor: true,
        acceptedByOrg: true,
      },
    });

    return NextResponse.json(donations);

  } catch (error) {
    console.error("Error fetching food donations:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
