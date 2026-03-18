import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { currentPass, newPass, confirmNewPass } = await req.json();

    if (newPass !== confirmNewPass) {
      return NextResponse.json(
        { error: "New password and confirm password do not match" },
        { status: 400 }
      );
    }

    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const user = await prisma.users.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPass, user.userPass);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    const hashedNewPass = await bcrypt.hash(newPass, 10);

    await prisma.users.update({
      where: { id: user.id },
      data: { userPass: hashedNewPass },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password change error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
