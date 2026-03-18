//app\api\item-transactions\reserve
import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const tokenUser = await getUserFromToken(req);
    if (!tokenUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ FIX: The user query now explicitly selects the 'isStudent' field.
    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        user_type: {
          select: {
            isStudent: true,
          },
        },
        patron: {
          select: {
            id: true,
          },
        },
      },
    });

    // The check now safely accesses the nested 'isStudent' property.
    if (!user?.user_type?.isStudent || !user?.patron) {
      return NextResponse.json(
        { message: "Only students can reserve books" },
        { status: 403 }
      );
    }

    const { itemId, reservationDate } = await req.json();
    if (!itemId) {
      return NextResponse.json({ message: "Book not provided" }, { status: 400 });
    }
    
    const existingReservation = await prisma.item_transaction.findFirst({
      where: {
        reservedBy: user.patron.id,
        isReserved: true,
      },
    });

    if (existingReservation) {
      return NextResponse.json(
        { message: "You already have an active reservation (only 1 allowed)." },
        { status: 400 }
      );
    }

    const newReservation = await prisma.item_transaction.create({
      data: {
        itemId,
        reservedBy: user.patron.id,
        isReserved: true,
        isAvailable: false,
        isVisible: true,
        reservedFrom: reservationDate ? new Date(reservationDate) : new Date(),
        reservedUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days default
      }
    });

    return NextResponse.json(
      { message: "Book reserved successfully", reservation: newReservation },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[ERROR] POST /item-transactions/reserve:", err.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

