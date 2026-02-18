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


