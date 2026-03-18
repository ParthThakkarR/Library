import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'
import { getUserFromToken } from '@/app/lib/getUserFromToken';

const prisma = new PrismaClient();

export async function GET(req:NextRequest) {
  try{
    const tokenUser=await getUserFromToken(req);

    if(!tokenUser){
      return NextResponse.json({message: "Unauthorized"},{status: 401});
    }

    const user=await prisma.users.findUnique({
      where: {id:tokenUser.id},
      select:{
        user_type:{
          select:{
            isAdmin: true,
          }
        }
      }
    });

    if(!user || !user.user_type.isAdmin){
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const users=await prisma.users.findMany();

    return NextResponse.json(users);

  }
  catch(err){
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
}

