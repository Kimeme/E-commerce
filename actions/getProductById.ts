import prisma from "@/libs/prismadb";

export default async function getProductById(productId?: string) {
  try {
    if (!productId) return null;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.log("GetProductById error:", error);
    return null;
  }
}
