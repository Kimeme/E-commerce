import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";

export async function POST(request: Request) {
  try {
    const { public_id } = await request.json();

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
      type: "upload",
      invalidate: true,
    });

    console.log("Cloudinary delete result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}


// // /api/cloudinary/delete/route.ts
// import { NextResponse } from "next/server";
// import cloudinary from "@/libs/cloudinary"; // use your lib

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { public_id } = body;

//     if (!public_id) {
//       return NextResponse.json({ error: "Public ID required" }, { status: 400 });
//     }

//     await cloudinary.uploader.destroy(public_id);

//     return NextResponse.json({ message: "Image deleted successfully" });
//   } catch (error) {
//     console.log("Cloudinary delete error:", error);
//     return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
//   }
// }

