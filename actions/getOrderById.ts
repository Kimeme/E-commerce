import prisma from "@/libs/prismadb";

export default async function getOrderById(orderId?: string) {
  if (!orderId) return null; // handle undefined early

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true }, // optional if you need user data
    });

    return order || null;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message || "Failed to fetch order");
  }
}
