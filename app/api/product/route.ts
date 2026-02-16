import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, description, price, brand, category, inStock, images } = body;

    if (!images || images.length === 0) {
      return NextResponse.json({ message: "No images provided" }, { status: 400 });
    }

    // ✅ Create product with embedded images
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        inStock,
        images: images.map((img: any) => ({
          color: img.color,
          colorCode: img.colorCode,
          image: img.image,       // Cloudinary URL
          public_id: img.public_id || null,
        })),
      },
    });

    return NextResponse.json(product);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating product" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  
    const currentUser = await getCurrentUser();
      if (!currentUser) return NextResponse.error();
    if (!currentUser || currentUser.role !== "ADMIN") return NextResponse.error();

    const body = await req.json();
    const { id, inStock } = body;

    const product = await prisma.product.update({
      where: { id },
      data: { inStock },
    });
    return NextResponse.json(product);
}


