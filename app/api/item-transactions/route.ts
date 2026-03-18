// import { PrismaClient } from "@/app/generated/prisma";
// import { getUserFromToken } from "@/app/lib/getUserFromToken";
// import { NextRequest, NextResponse } from "next/server";
// import { use } from "react";

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     const tokenUser = await getUserFromToken(req);
//     if (!tokenUser?.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const user = await prisma.users.findUnique({
//       where: { id: tokenUser.id },
//       select: {
//         id: true,
//         userName: true,
//         user_type: { select: { isAdmin: true, isLibrarian: true, isStudent: true } },
//         patron: { select: { id: true, patronFirstName: true, patronLastName: true } },
//       },
//     });

//     if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     if (user.user_type?.isAdmin || user.user_type?.isLibrarian) {
//       const allTransactions = await prisma.item_transaction.findMany({
//         include: {
//           items: { select: { itemTitle: true } },
//           patron: { select: { patronFirstName: true, patronLastName: true } },
//         },
//         orderBy: { issueDate: "desc" },
//       });

//       const studentCounts: Record<string, { count: number; name: string }> = {};
//       allTransactions.forEach(tx => {
//         if (tx.itemAssignedTo && tx.patron && tx.isAvailable === false) {
//           const patronId = tx.itemAssignedTo;
//           if (!studentCounts[patronId]) {
//             studentCounts[patronId] = {
//               count: 0,
//               name: `${tx.patron.patronFirstName || ""} ${tx.patron.patronLastName || ""}`.trim(),
//             };
//           }
//           studentCounts[patronId].count++;
//         }
//       });

//       return NextResponse.json({
//         transactions: allTransactions,
//         meta: { studentCounts },
//       });
//     }

//     // 🔹 Student
//     else if (user.user_type?.isStudent && user.patron?.id) {
//       const patronId = user.patron.id;

//       const myTransactions = await prisma.item_transaction.findMany({
//         where: { itemAssignedTo: patronId },
//         include: {
//           items: { select: { itemTitle: true } },
//           patron: { select: { patronFirstName: true, patronLastName: true } },
//         },
//         orderBy: { issueDate: "desc" },
//       });

//       return NextResponse.json({
//         transactions: myTransactions,
//         meta: { issueCount: myTransactions.length },
//       });
//     }

//     // 🔹 Unauthorized role
//     return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
//   } catch (err: any) {
//     console.error("[ERROR] GET item-transactions:", err.message, err.stack);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest){
//   try{
//     const tokenUser=await getUserFromToken(req);

//     if(!tokenUser){
//       return NextResponse.json({message: "Unauthorized"}, {status: 401});
//     }

//     const user= await prisma.users.findUnique({
//       where: {id:tokenUser.id},
//       select:{
//         user_type: true,
//         patron:  true,
//       }
//     });

//     if(!user?.user_type.isStudent || !user?.patron){
//       return NextResponse.json({message: "Unauthoried"},{status: 401});
//     }

//     const {itemId}=await req.json();

//     if(!itemId){
//       return NextResponse.json({message: "Book Not Provided"}, {status: 403});
//     }

//     const book=await prisma.items.findUnique({
//       where : {id:itemId}
//     });

//     if(!book){
//       return NextResponse.json({message: "Book Not Found"}, {status: 404});
//     }

//     if(book.quantity<=0){
//       return NextResponse.json({message: "Book Not Available"}, {status: 400});
//     }

//     const activeBorrows=await prisma.item_transaction.findMany({
//       where: {
//         itemAssignedTo: user.patron.id,
//         isAvailable: false,
//       }
//     });

//     if(activeBorrows.length>=5){
//       return NextResponse.json({message: "Borrow Limit Reached(Max 5 Active Books Allowed)."}, {status: 400});
//     }

//     const alreadyBorrowed=await prisma.item_transaction.findFirst({
//       where: {
//         itemAssignedTo: user.patron.id,
//         itemId: itemId,
//         isAvailable: false,
//       }
//     });

//     if(alreadyBorrowed){
//       return NextResponse.json({message: "You already borrowed this book"}, {status: 400});
//     }

//     const newTransaction=await prisma.item_transaction.create({
//       data:{
//         itemId,
//         itemAssignedTo: user.patron.id,
//         isReserved: false,
//         reservedBy: null,
//         isAvailable: false,
//         isVisible: true,
//         issueDate: new Date(),
//         dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
//       }
//     });

//     await prisma.items.update({
//       where: {id:itemId},
//       data: {quantity: book.quantity-1}
//     });

//     return NextResponse.json({message: "Book Borrowed Successfully", transaction: newTransaction}, {status: 200});

//   }
//   catch(err){
//     return NextResponse.json({message: "Internal Server Error"},{status: 500});
//   }
// }
import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// The GET function is correct and does not need changes.
export async function GET(req: NextRequest) {
  try {
    const tokenUser = await getUserFromToken(req);
    if (!tokenUser?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        id: true,
        user_type: { select: { isAdmin: true, isLibrarian: true, isStudent: true } },
        patron: { select: { id: true } },
      },
    });
    if (!user) { return NextResponse.json({ message: "User not found" }, { status: 401 }); }
    if (user.user_type?.isAdmin || user.user_type?.isLibrarian) {
      const allTransactions = await prisma.item_transaction.findMany({
        include: {
          items: { select: { itemTitle: true, itemAuthor: true } },
          patron: { select: { patronFirstName: true, patronLastName: true } },
          reserve: { select: { patronFirstName: true, patronLastName: true } },
        },
        orderBy: { issueDate: "desc" },
      });
      return NextResponse.json({ transactions: allTransactions });
    }
    if (user.user_type?.isStudent && user.patron?.id) {
      const patronId = user.patron.id;
      const myTransactions = await prisma.item_transaction.findMany({
        where: { OR: [{ itemAssignedTo: patronId }, { reservedBy: patronId }] },
        include: {
          items: { select: { id: true, itemTitle: true, itemAuthor: true, itemType: true } },
        },
        orderBy: { issueDate: "desc" },
      });
      return NextResponse.json({ transactions: myTransactions });
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  } catch (err: any) {
    console.error("[ERROR] GET item-transactions:", err.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * POST /api/item-transactions
 * - Student borrows a book. This version sends back specific error messages.
 */
export async function POST(req: NextRequest) {
  try {
    const tokenUser = await getUserFromToken(req);
    if (!tokenUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      select: {
        user_type: { select: { isStudent: true } },
        patron: { select: { id: true } },
      },
    });

    if (!user?.user_type?.isStudent || !user?.patron) {
      return NextResponse.json({ message: "Only students can borrow books" }, { status: 403 });
    }

    const { itemId } = await req.json();
    if (!itemId) {
      return NextResponse.json({ message: "Book ID not provided" }, { status: 400 });
    }

    const newTransaction = await prisma.$transaction(async (tx) => {
      const bookToBorrow = await tx.items.findUnique({ where: { id: itemId } });
      if (!bookToBorrow) {
        throw new Error("Book not found."); // This error will be caught below
      }
      if (bookToBorrow.quantity <= 0) {
        throw new Error("This book is currently out of stock."); // This error will be caught
      }
      const activeBorrows = await tx.item_transaction.count({
        where: { itemAssignedTo: user.patron!.id, isAvailable: false },
      });
      if (activeBorrows >= 5) {
        throw new Error("Borrow Limit Reached (Max 5 Active Books Allowed)."); // This error will be caught
      }
      await tx.items.update({
        where: { id: itemId },
        data: { quantity: { decrement: 1 } },
      });
      const createdTransaction = await tx.item_transaction.create({
        data: {
          itemId,
          itemAssignedTo: user.patron!.id,
          isAvailable: false,
          issueDate: new Date(),
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });
      return createdTransaction;
    });

    return NextResponse.json({ message: "Book Borrowed Successfully", transaction: newTransaction }, { status: 201 });
  } catch (err: any) {
    console.error("[ERROR] POST item-transaction:", err.message);
    // ✅ FINAL FIX: Send the ACTUAL error message from the transaction back to the frontend.
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

