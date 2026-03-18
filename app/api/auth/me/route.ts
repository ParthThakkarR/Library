import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/app/lib/getUserFromToken";

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
