import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from 'bcrypt'; 

const prisma=new PrismaClient();

export async function POST(req: NextRequest){
    try{
        const body =await req.json();

        const {userName, userEmail, userPass, userTypeId}= body;

        if(!userName || !userEmail || !userPass){
            return NextResponse.json({message: 'All fields are required'}, {status: 400})
        }

        const existingUser= await prisma.users.findFirst({
            where: {
                OR: [
                    {userEmail},
                    {userName}
                ]
            }
        });

        if(existingUser){
            return NextResponse.json({message: 'User already exists'},{status: 409});
        }

        const hashedPassword = await bcrypt.hash(userPass, 10);
        
        const newUser= await prisma.users.create({
            data:{
                userName,
                userEmail,
                userPass: hashedPassword,
                userTypeId
            }
        });

        return NextResponse.json({
            message: 'User Created Successfully',
            user: {
                id: newUser.id,
                name: newUser.userName,
                email: newUser.userEmail
            }
        })
    }
    catch(err){
        console.log("Sign Up Error", err);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500 })
    }
}