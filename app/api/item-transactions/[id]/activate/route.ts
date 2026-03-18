// import { PrismaClient } from "@/app/generated/prisma";
// import { getUserFromToken } from "@/app/lib/getUserFromToken";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// /**
//  * Activate a reservation: decrement quantity & mark as borrowed.
//  */
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const tokenUser = await getUserFromToken(req);

//     if (!tokenUser) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const user = await prisma.users.findUnique({
//       where: { id: tokenUser.id },
//       select: {
//         user_type: {
//           select: { isAdmin: true, isLibrarian: true },
//         },
//       },
//     });

//     if (!user?.user_type.isAdmin && !user?.user_type.isLibrarian) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const reservation = await prisma.item_transaction.findUnique({
//       where: { id: params.id },
//     });

//     if (!reservation || !reservation.isReserved) {
//       return NextResponse.json({ message: "Reservation not found" }, { status: 404 });
//     }

//     const book = await prisma.items.findUnique({
//       where: { id: reservation.itemId },
//     });

//     if (!book || book.quantity <= 0) {
//       return NextResponse.json({ message: "Book Not Available" }, { status: 400 });
//     }

//     const updated = await prisma.item_transaction.update({
//       where: { id: params.id },
//       data: {
//         isReserved: false,
//         isAvailable: false,
//         issueDate: new Date(),
//         dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
//       },
//     });

//     await prisma.items.update({
//       where: { id: book.id },
//       data: { quantity: { decrement: 1 } },
//     });

//     return NextResponse.json(
//       { message: "Reservation activated and book borrowed", transaction: updated },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("[ERROR] Activate PUT:", err);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

//app\api\item-transactions\[id]\activate
import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * PUT /api/item-transactions/[id]/activate
 * Activates a reservation, converting it to a loan.
 */
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

    if (!user?.user_type.isAdmin && !user?.user_type.isLibrarian) {
      return NextResponse.json({ message: "Librarian access required" }, { status: 403 });
    }

    const reservation = await prisma.item_transaction.findUnique({
      where: { id: params.id },
    });

    if (!reservation || !reservation.isReserved || !reservation.reservedBy) {
      return NextResponse.json({ message: "Reservation not found or already active" }, { status: 404 });
    }
    
    // ✅ FIX: Check the patron's current borrow count before activating.
    const patronId = reservation.reservedBy;
    const activeBorrows = await prisma.item_transaction.count({
        where: {
            itemAssignedTo: patronId,
            isAvailable: false,
        },
    });

    if (activeBorrows >= 5) {
        return NextResponse.json(
            { message: "Cannot activate reservation. Patron has reached the borrow limit of 5 books." },
            { status: 400 }
        );
    }
    
    // If check passes, proceed to activate the reservation
    const updatedTransaction = await prisma.item_transaction.update({
      where: { id: params.id },
      data: {
        isReserved: false,
        reservedBy: null,
        itemAssignedTo: reservation.reservedBy,
        isAvailable: false,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 days
      },
    });

    await prisma.items.update({
        where: { id: reservation.itemId },
        data: { quantity: { decrement: 1 } },
    });

    return NextResponse.json(
      { message: "Reservation activated successfully", transaction: updatedTransaction },
      { status: 200 }
    );
  } catch (err) {
    console.error("[ERROR] Activate PUT:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}