import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    if (!user?.user_type?.isAdmin && !user?.user_type?.isLibrarian) {
      return NextResponse.json({ message: "Forbidden: Librarian access required" }, { status: 403 });
    }

    const { id: transactionId } = params;

    
    const returnedTransaction = await prisma.$transaction(async (tx) => {
      
      const transactionToReturn = await tx.item_transaction.findUnique({
        where: { id: transactionId },
      });

      if (!transactionToReturn) {
        throw new Error("Transaction not found.");
      }
      if (transactionToReturn.isAvailable) {
        throw new Error("This book has already been returned.");
      }


      const updatedTransaction = await tx.item_transaction.update({
        where: { id: transactionId },
        data: {
          isAvailable: true, 
          dueDate: null, 
        },
      });

 
      await tx.items.update({
        where: { id: transactionToReturn.itemId },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return updatedTransaction;
    });

    return NextResponse.json(
      { message: "Book returned successfully", transaction: returnedTransaction },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[ERROR] PUT /return:", err.message);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
