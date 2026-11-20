// app/api/item-transactions/[id]/route.ts
import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// ✅ GET: Single transaction (Admin/Librarian only)
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const tokenUser = await getUserFromToken(req);
    if (!tokenUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        user_type: { select: { isAdmin: true, isLibrarian: true } },
      },
    });

    if (!user?.user_type.isAdmin && !user?.user_type.isLibrarian) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const transaction = await prisma.item_transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(transaction);
  } catch (err) {
    console.error("[ERROR] GET transaction:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ PUT: Update transaction (Admin/Librarian only)
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const tokenUser = await getUserFromToken(req);
    if (!tokenUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        user_type: { select: { isAdmin: true, isLibrarian: true } },
      },
    });

    if (!user?.user_type.isAdmin && !user?.user_type.isLibrarian) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const updated = await prisma.item_transaction.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[ERROR] PUT transaction:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ DELETE: Cancel transaction
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const tokenUser = await getUserFromToken(req);
    if (!tokenUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        user_type: { select: { isAdmin: true, isLibrarian: true, isStudent: true } },
        patron: { select: { id: true } },
      },
    });

    const transaction = await prisma.item_transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    // ✅ Authorization: Owner (patron) OR Admin/Librarian
    const isOwner = user?.patron?.id && user.patron.id === transaction.reservedBy;
    const isAdminOrLibrarian = user?.user_type.isAdmin || user?.user_type.isLibrarian;

    if (!isOwner && !isAdminOrLibrarian) {
      return NextResponse.json({ message: "Forbidden: You cannot delete this transaction" }, { status: 403 });
    }

    await prisma.item_transaction.delete({ where: { id } });

    return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("[ERROR] DELETE transaction:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
