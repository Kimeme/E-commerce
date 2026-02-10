import prisma from '@/libs/prismadb';

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;
    const searchString = searchTerm ?? ''; // Default to empty string if null/undefined

    // Build query object
    const query: any = {};
    if (category) query.category = category;

    // Fetch products with Prisma
    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          { name: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      },
      include: {
        reviews: {
          include: { user: true },
          orderBy: { createdDate: 'desc' },
        },
      },
    });

    return products;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    throw new Error(error.message || 'Failed to fetch products');
  }
}
