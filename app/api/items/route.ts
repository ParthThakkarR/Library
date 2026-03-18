import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { MessageSquare } from "lucide-react";
import { NextResponse, NextRequest } from "next/server";

const prisma=new PrismaClient();

export async function GET(get:NextRequest) {
    try{
        const items= await prisma.items.findMany();
        return NextResponse.json(items);
    }
    catch(err){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}

// export async function POST(req: NextRequest){
//     try{
//         const body=await req.json();
//         const { itemTitle, itemAuthor, itemType, itemPrice, itemImage }=body;

//         const item=await prisma.items.create({
//             data:{
//                 itemTitle,
//                 itemAuthor,
//                 itemType,
//                 itemPrice,
//                 itemImage
//             }
//         });

//         return NextResponse.json(item, {status: 201});
//     }
//     catch(err){
//         return NextResponse.json({error: "Failed to add Item"}, {status: 500});
//     }
// }

export async function POST(req: NextRequest) {
  try {

    const tokenId=getUserFromToken(req);

    if(!tokenId){
      return NextResponse.json({message: "User Not Found"}, {status: 403});
    }

    const user=await prisma.users.findUnique({
      where: {id: tokenId.id},
      select:{
        user_type:{
          select:{
            isAdmin: true,
            isLibrarian: true
          }
        }
      }
    })

    if(!user || (!user.user_type?.isAdmin && !user.user_type.isLibrarian)){
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }


    const formData = await req.formData();

    const itemTitle = formData.get("itemTitle") as string;
    const itemAuthor = formData.get("itemAuthor") as string;
    const itemType = formData.get("itemType") as string;
    const itemPrice = Number(formData.get("itemPrice"));
    const isbn = formData.get("isbn") as string;
    const quantity = Number(formData.get("quantity"));
    const file = formData.get("itemImage") as File | null;

    let imageBuffer: Buffer | null = null;

    if (file) {
      // Convert File → ArrayBuffer → Buffer (Node.js compatible)
      const bytes = await file.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
    }

    const item = await prisma.items.create({
      data: {
        itemTitle,
        itemAuthor,
        itemType,
        itemPrice,
        isbn,
        quantity,
        itemImage: imageBuffer, // ✅ Now matches Prisma Bytes
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("Error adding item:", err);
    return NextResponse.json({ error: "Failed to add Item" }, { status: 500 });
  }
}
