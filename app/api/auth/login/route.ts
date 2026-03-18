import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { error } from "console";
import { serialize } from "cookie";
 
const JWT_SECRET=process.env.JWT_SECRET;
const prisma=new PrismaClient();

// export async function POST(req:NextRequest){
//     try{
//         const {userEmail,userPass}=await req.json();

//         const user = await prisma.users.findFirst({where: {
//             OR: [
//               { userEmail },
//               { userName: userEmail }
//             ]
//           }
//         });

//         if(!user){
//             return NextResponse.json({error: 'User not found'}, {status: 404});
//         }

//         const isMatch = await bcrypt.compare(userPass, user.userPass);
//         if(!isMatch){
//             return NextResponse.json({error: 'Invalid Credentails'}, {status: 401})
//         }

//         const token = jwt.sign(
//           { id: user.id, email: user.userEmail, name: user.userName },
//           JWT_SECRET!,
//           { expiresIn: '1h' }
//         );

//         const cookie=serialize('token', token, {
//             httpOnly: true,
//             path: '/',
//             maxAge: 60*60,
//             sameSite: 'lax',
//             secure: process.env.NODE_ENV==="production"
//         });

//         const res= NextResponse.json({
//             message: 'Login Successful',
//             token,
//             user :{
//                 id: user.id,
//                 name: user.userName,
//                 email: user.userEmail,
//             }
//         });

//         res.headers.set('Set-Cookie', cookie);
//         return res;
//     }
//     catch(err){
//         console.log("Login error ", err);
//         return NextResponse.json({error: 'Internal Server Error'},
//              {status: 500}
//         )
//     };
// }

export async function POST(req: NextRequest) {
  try {
    const { userEmail, userPass } = await req.json();

    const user = await prisma.users.findFirst({
      where: {
        OR: [{ userEmail }, { userName: userEmail }]
      },
      include: {
        patron: true,
        librarian: true,
        user_type: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(userPass, user.userPass);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
    }

    const role= user.user_type.isAdmin ? "admin" : user.user_type.isLibrarian? "librarian" : "user"; 

    const token = jwt.sign(
      { id: user.id, email: user.userEmail, name: user.userName, role},
      JWT_SECRET!,
      { expiresIn: '1h' }
    );

    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === "production"
    });

    const redirectPath= user.user_type.isStudent && !user.patron? "/complete-profile" : "/dashboard";

    const res = NextResponse.json({
      message: 'Login Successful',
      token,
      redirect: redirectPath, // <-- include redirect info
      user: {
        id: user.id,
        name: user.userName,
        email: user.userEmail,
        role
      }
    });

    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (err) {
    console.log("Login error ", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
