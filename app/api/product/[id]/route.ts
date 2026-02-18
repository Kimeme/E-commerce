import prisma from "@/libs/prismadb"
import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/actions/getCurrentUser"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const currentUser = await getCurrentUser()
  
  if (!currentUser) return NextResponse.error();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error()
  }

  const product = await prisma.product.delete({
    where: { id }
  })

  return NextResponse.json(product)
}