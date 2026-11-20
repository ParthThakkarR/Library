import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { stat } from "fs";
import { NextResponse,NextRequest } from "next/server";

const prisma=new PrismaClient();

export async function GET(req: NextRequest, context: {params: Promise<{id:string}>}) {
    try{
        const { id } = await context.params;
        const tokenUser=await getUserFromToken(req);

        const user=await prisma.users.findUnique({
            where:{ id: tokenUser.id },
            select: {
                id:true,
                user_type:{
                    select:{
                        isAdmin: true,
                    }
                }
            }
        });

        if(!user || !user.user_type?.isAdmin && user.id!==id){
            return NextResponse.json({message: "Forbidden"}, {status: 401});
        }

        const librarian = await prisma.librarian.findUnique({
            where : {id},
            include: {
                users: {
                    select: {
                        userName: true,
                        userEmail: true,
                    }
                }
            }
        });

        if(!librarian){
            return NextResponse.json({message: "Librarian Not Found"}, {status : 401});
        }

        return NextResponse.json(librarian);
    }
    catch(err){
        return NextResponse.json({message: "Internal Server Error"},{status: 500});
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const tokenUser = await getUserFromToken(req);
    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        id: true,
        user_type: {
          select: { isAdmin: true }
        }
      }
    });

    if (!user || (!user.user_type?.isAdmin && user.id !== id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const updatedLibrarian = await prisma.librarian.update({
      where: { id },
      data: body
    });

    return NextResponse.json(updatedLibrarian);
  } catch (error) {
    console.error("PUT /api/librarians/:id error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: {params: Promise<{id: string}>}) {
  try {
    const { id } = await context.params;
    const tokenUser = await getUserFromToken(req);
    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        user_type: {
          select: { isAdmin: true }
        }
      }
    });

    if (!user || !user.user_type?.isAdmin) {
      return NextResponse.json({ message: "Forbidden: Admins only" }, { status: 403 });
    }

    await prisma.librarian.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Librarian deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/librarians/:id error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}