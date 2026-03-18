
import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { promises as fs} from "fs";

const prisma=new PrismaClient();

export async function GET(req:NextRequest, {params}: {params: {id:string}}) {
    try{
        const item=await prisma.items.findUnique({
            where: {id:params.id}
        });

        if(!item){
            return NextResponse.json({message: "Item Not Found"}, {status: 404});
        }

        return NextResponse.json(item);
    }
    catch(err){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}

// export async function PUT(req: NextRequest, {params}: {params: {id:string}}) {
//     try{

//         const tokenUser=await getUserFromToken(req);

//         if(!tokenUser){
//             return NextResponse.json({message : "Unauthorized"}, {status: 401});
//         }

//         const user=await prisma.users.findUnique({
//             where: {id:tokenUser.id},
//             select:{
//                 id: true,
//                 user_type: {
//                     select:{
//                         isAdmin:true,
//                         isLibrarian: true,
//                     }
//                 }
//             }
//         });

//         if(!user || (!user.user_type?.isAdmin && !user.user_type.isLibrarian)){
//             return NextResponse.json({message: "Unauthorized"}, {status: 401});
//         }

//         const body= await req.json();
//         const updatedItem= await prisma.items.update({
//             where: {id: params.id},
//             data: body
//         });

//         return NextResponse.json(updatedItem);
//     }
//     catch(err){
//         return NextResponse.json({message: "Internal Server Error"}, {status : 500})
//     }
// }


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tokenUser = await getUserFromToken(req);
    if (!tokenUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        id: true,
        user_type: {
          select: { isAdmin: true, isLibrarian: true },
        },
      },
    });

    if (!user || (!user.user_type?.isAdmin && !user.user_type.isLibrarian)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Parse FormData
    const formData = await req.formData();

    const data: any = {
      itemTitle: formData.get("itemTitle") as string,
      itemAuthor: formData.get("itemAuthor") as string,
      itemType: formData.get("itemType") as string,
      itemPrice: parseFloat(formData.get("itemPrice") as string),
      isbn: formData.get("isbn") as string,
      quantity: parseInt(formData.get("quantity") as string),
    };

    // ✅ If image is uploaded
    const file = formData.get("itemImage") as File | null;
    if (file && file.size > 0) {
      // You need to decide how you want to store files
      // Example: save to /public/uploads
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = `./public/uploads/${file.name}`;
      await fs.writeFile(filePath, buffer);
      data.itemImage = `/uploads/${file.name}`;
    }

    const updatedItem = await prisma.items.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updatedItem);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest, {params}: {params: {id:string}}) {
    try{
        const tokenUser= getUserFromToken(req);

        if(!tokenUser){
            return NextResponse.json({message: "Unauthorized"},{status: 401});
        }

        const user=await prisma.users.findUnique({
            where: {id:tokenUser.id},
            select: {
                id: true,
                user_type: {
                    select:{
                        isAdmin: true,
                        isLibrarian: true,
                    }
                }
            }
        });

        if(!user || (!user.user_type?.isAdmin && !user.user_type?.isLibrarian)){
            return NextResponse.json({message: "Unauthorized"},{status: 401});
        }

        const activeBorrow=await prisma.item_transaction.findFirst({
            where: {
                itemId: params.id,
                isAvailable: false
            }
        });

        if(activeBorrow){
            return NextResponse.json({message: "Active Borrowed Items cant be Deleted"}, {status: 400});
        }

        await prisma.items.delete({
            where: {id:params.id} 
        });
        return NextResponse.json({message: "Item deleted"},{status : 200});

    }
    catch(err){
        return NextResponse.json({message: "Internal Server Error"},{status : 500});
    }
    
}