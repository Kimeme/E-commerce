import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(req: Request) {
  
    const currentUser = await getCurrentUser();
    
    if (!currentUser) return NextResponse.error();
    if (!currentUser || currentUser.role !== "ADMIN") return NextResponse.error();

    const body = await req.json();
    const { id, deliverStatus } = body;

    const order = await prisma.order.update({
      where: { id:id },
      data: { deliverStatus },
    });
    return NextResponse.json(order);
}


