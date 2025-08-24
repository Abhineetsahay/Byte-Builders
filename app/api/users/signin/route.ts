import { prisma } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const UserSignInSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedData = z.safeParse(UserSignInSchema, body);

  if (parsedData.success) {
    const newOrg = await prisma.user.create({ data: parsedData.data });
    parsedData.data.id = newOrg.id;
    return NextResponse.json(parsedData);
  } else return NextResponse.json(parsedData, { status: 400 });
}