// import { prisma } from "@/prisma-client";
// import { NextRequest, NextResponse } from "next/server";
// import z from "zod";

// const UserSignInSchema = z.object({
//   id: z.string().optional(),
//   foodType: z.string(),
//   quantity: z.number(),
//   weight: z.number(),
//   state: z.string(),
// });

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const parsedData = z.safeParse(UserSignInSchema, body);

//   if (parsedData.success) {
//     const newfooddonation = await prisma.foodDonation.create({ data: parsedData.data });
//     parsedData.data.id = newfooddonation.id;
//     return NextResponse.json(parsedData);
//   } else return NextResponse.json(parsedData, { status: 400 });
// }