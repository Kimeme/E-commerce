import prisma from '@/libs/prismadb';

export default async function getOrdersByUserId(userId:string) {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true },
      orderBy: { createdDate: 'desc' },
      where: { userId,}, // Make sure your model field is `createdDate`
    });

    return orders;
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    throw new Error(error.message || 'Failed to fetch orders');
  }
}
