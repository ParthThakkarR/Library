import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const res=NextResponse.json({message: "Logged Out Successfully"});

        res.headers.set(
          "Set-Cookie",
          `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax; ${
            process.env.NODE_ENV === "production" ? "Secure;" : ""
          }`
        );

        return res;
    }
    catch(err){
        return NextResponse.json({message: "Internal Server Error"},{status: 500});
    }
}