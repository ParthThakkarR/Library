import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { NextResponse, NextRequest } from "next/server";

const prisma=new PrismaClient();

export async function POST(req: NextRequest) 
{
    try{
        const tokenUser=getUserFromToken(req);

        const user=await prisma.users.findUnique({
            where: {id: tokenUser.id},
            select: {
                id: true,
                user_type:{
                    select: {
                        isAdmin: true,
                    }
                }
            }
        });

        if(!user || !user.user_type.isAdmin){
            return NextResponse.json({message: "Request Forbidden: Admin Only"}, {status: 401});
        }

        const body=await req.json();

        const {librarianName, librarianEmail, librarianPhone, userId}= body;

        const newLibrarian=await prisma.librarian.create({
            data: {
                librarianName,
                librarianEmail,
                librarianPhone,
                userId
            }
        });

        return NextResponse.json(newLibrarian, {status:201});
    }
    catch(err){
        return NextResponse.json({message: "Internal Server Error"}, {status : 500});
    }
}