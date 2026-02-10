import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}



//This is error got so 

// import { NextResponse } from "next/server";
// import cloudinary from "@/libs/cloudinary";

// export const POST = async (request: Request, filePath: string) => {

//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     if (!file)
//       return NextResponse.json({ message: "No file uploaded" }, { status: 400 });

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const uploadResult: any = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload(filePath,
//         { folder: "products" }, // Folder name in Cloudinary
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
 
//     });

//     // ✅ This is where public_id comes from
//     console.log("Cloudinary upload result:", uploadResult);

//     return NextResponse.json({
//       url: uploadResult.secure_url,
//       public_id: uploadResult.public_id, // <--- must store in DB
//     });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return NextResponse.json(
//       { message: "Upload failed", error: (error as any).message || error },
//       { status: 500 }
//     );
//   }
// };

// import { NextResponse } from "next/server";
// import cloudinary from "@/libs/cloudinary";

// export const POST = async (request: Request) => {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) return NextResponse.json({ message: "No file uploaded" }, { status: 400 });

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const uploadResult: any = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "products" },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       stream.end(buffer);
//     });

//     if (!uploadResult.secure_url) {
//       return NextResponse.json({ message: "Upload failed" }, { status: 500 });
//     }

//     return NextResponse.json({ url: uploadResult.secure_url });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return NextResponse.json({ message: "Upload failed", error: (error as any).message || error }, { status: 500 });
//   }
// };
