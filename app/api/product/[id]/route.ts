import prisma from "@/libs/prismadb";
// import cloudinary from "@/libs/cloudinary";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function DELETE(
  request: Request,
  { params }: { params: {
     id: string 
} }
) {
   const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();
    if (!currentUser || currentUser.role !== "ADMIN") return NextResponse.error();


     const product = await prisma?.product.delete({
      where: {id: params.id}
    })
    
    return NextResponse.json(product)
  }
    // if (!productId) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

//     const product = await prisma.product.findUnique({ where: { id: productId } });
//     if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

//     // 🔥 DELETE ALL CLOUDINARY IMAGES
//     if (product.image?.length) {
//       for (const img of product.image) {
//         if (img.public_id) {
//           console.log("Deleting Cloudinary image:", img.public_id);
//           await cloudinary.uploader.destroy(img.public_id);
//         } else {
//           console.warn("Image missing public_id, cannot delete:", img);
//         }
//       }
//     }

//     // 🔥 DELETE PRODUCT FROM DATABASE
//     await prisma.product.delete({ where: { id: productId } });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE PRODUCT ERROR:", error);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }

























// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // 1️⃣ Auth check
//     const currentUser = await getCurrentUser();
//     if (!currentUser || currentUser.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { id } = params;

//     // 2️⃣ Read body for images
//     const { images = [] }: { images?: { public_id: string }[] } = await req.json();

//     // 3️⃣ Check product exists
//     const product = await prisma.product.findUnique({ where: { id } });
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // 4️⃣ Delete Cloudinary images
//     if (images.length) {
//       await Promise.all(
//         images
//           .filter(img => img.public_id)
//           .map(img => {
//             console.log("Deleting Cloudinary image:", img.public_id); // Debug
//             return cloudinary.uploader.destroy(img.public_id);
//           })
//       );
//     }

//     // 5️⃣ Delete product from database
//     await prisma.product.delete({ where: { id } });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE PRODUCT ERROR:", error);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }

//#4


// import prisma from "@/libs/prismadb";
// import cloudinary from "@/libs/cloudinary";
// import { NextResponse } from "next/server";
// import { getCurrentUser } from "@/actions/getCurrentUser";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } } // ✅ destructure here
// ) {
//   try {
//     // 1️⃣ Auth check
//     const currentUser = await getCurrentUser();
//     if (!currentUser || currentUser.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 2️⃣ SAFE access (no warning)
//     const id = params.id;

//     // 3️⃣ Read body
//     const { images = [] }: { images?: { public_id: string }[] } =
//       await req.json();

//     // 4️⃣ Check product
//     const product = await prisma.product.findUnique({ where: { id } });
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // 5️⃣ Delete Cloudinary images
//     if (images.length) {
//       await Promise.all(
//         images
//           .filter(img => img.public_id)
//           .map(img => cloudinary.uploader.destroy(img.public_id))
//       );
//     }

//     // 6️⃣ Delete product
//     await prisma.product.delete({ where: { id } });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE PRODUCT ERROR:", error);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }


//3
 
// import prisma from "@/libs/prismadb";
// import cloudinary from "@/libs/cloudinary";
// import { NextResponse } from "next/server";
// import { getCurrentUser } from "@/actions/getCurrentUser";

// export async function DELETE(
//   req: Request,
//   context: { params: { id: string } }
// ) {
//   try {
//     // 1️⃣ Ensure user is admin
//     const currentUser = await getCurrentUser();
//     if (!currentUser || currentUser.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 2️⃣ Safely extract dynamic route param
//     const { params } = context;
//     const id = params?.id;
//     if (!id) {
//       return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
//     }

//     // 3️⃣ Parse request body for Cloudinary images
//     const body = await req.json();
//     const images: { public_id: string }[] = body?.images || [];

//     // 4️⃣ Check if product exists
//     const product = await prisma.product.findUnique({ where: { id } });
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // 5️⃣ Delete images from Cloudinary (if provided)
//     if (images.length > 0) {
//       await Promise.all(
//         images
//           .filter(img => img.public_id) // only valid public_ids
//           .map(img => cloudinary.uploader.destroy(img.public_id))
//       );
//     }

//     // 6️⃣ Delete product from Prisma
//     await prisma.product.delete({ where: { id } });

//     // 7️⃣ Return success
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE PRODUCT ERROR:", error);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }

//2

// import prisma from "@/libs/prismadb";
// import cloudinary from "@/libs/cloudinary";
// import { NextResponse } from "next/server";
// import { getCurrentUser } from "@/actions/getCurrentUser";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const currentUser = await getCurrentUser();
//     if (!currentUser || currentUser.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { id } = params;

//     // Check if product exists
//     const product = await prisma.product.findUnique({
//       where: { id },
//       include: { images: true },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // Delete images from Cloudinary
//     if (product.images?.length) {
//       await Promise.all(
//         product.images.map((img) => cloudinary.uploader.destroy(img.public_id))
//       );
//     }

//     // Delete product from DB
//     await prisma.product.delete({ where: { id } });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE PRODUCT ERROR:", error);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }




//1



// // app/api/product/[id]/route.ts
// import cloudinary from "@/libs/cloudinary";
// import { NextResponse } from "next/server";
// import { getCurrentUser } from "@/actions/getCurrentUser";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//     const currentUser = await getCurrentUser();
//         if (!currentUser || currentUser.role !== "ADMIN") {
//       return  NextResponse.error();
//     }

//     const product = await prisma?.product.delete({
//         where:{id:params.id},
//     });
//     return NextResponse.json(product);
   
//   }

