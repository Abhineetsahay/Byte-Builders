import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const CreateUserSchema = z.object({
  email: z.string().email("A valid email is required."),
  name: z.string().min(1, "Name is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = CreateUserSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: parsedData.data.email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 409 }); // 409 Conflict
    }

    const newUser = await prisma.user.create({
      data: parsedData.data,
    });

    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
