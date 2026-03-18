import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { NextResponse, NextRequest } from "next/server";

const prisma=new PrismaClient();

export async function GET(req: NextRequest) {
    try{
        const tokenUser=getUserFromToken(req);

        if(!tokenUser){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

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

        if(!user || !user.user_type?.isAdmin){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const librarians=await prisma.librarian.findMany({
            include: {
                users: {
                    select: {
                        userName: true,
                        userEmail: true,
                        user_type: {
                            select: {
                                userTypeName: true,
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(librarians);
    }
    catch(err){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}