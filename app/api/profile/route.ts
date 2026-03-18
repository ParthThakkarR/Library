// import { PrismaClient } from "@/app/generated/prisma";
// import { getUserFromToken } from "@/app/lib/getUserFromToken";
// import { NextRequest, NextResponse } from "next/server";

// const prisma=new PrismaClient();

// export async function GET(req:NextRequest) {
//     try{
//         const tokenUser=await getUserFromToken(req);

//         if(!tokenUser?.id){
//             return NextResponse.json({message: "Unauthorized"},{status: 401});
//         }

//         const user=await prisma.users.findUnique({
//             where: {id: tokenUser.id},
//             select:{
//                 id: true,
//                 userName: true,
//                 userEmail: true,
//                 user_type:{
//                     select:{
//                         isAdmin: true,
//                         isLibrarian: true,
//                         isStudent: true,
//                     }
//                 },
//                 patron: true,
//                 librarian: true,
//             }
//         });

//         if(!user){
//             return NextResponse.json({message: "Unauthorized"}, {status: 401});
//         }

//         if(user.user_type?.isStudent && user.patron){
//             const patron=user.patron;

//             const transactions=await prisma.item_transaction.findMany({
//                 where:{itemAssignedTo: patron.id}
//             });

//             const bookRead=transactions.length;
//             const currentlyBorrowed=transactions.filter((t)=>!t.isAvailable).length;
//             const overdue=transactions.filter((t)=>!t.isAvailable && t.dueDate && t.dueDate<new Date()).length;

//             let profilePicture:string | null = null;
//             if(patron.patronImage){
//                 profilePicture=`data:image/png;base64,${Buffer.from(patron.patronImage).toString("base64")}`;
//             }

//             return NextResponse.json({
//                 role: "Student",
//                 profile:{
//                     firstName: patron.patronFirstName,
//                     middleName: patron.patronMiddleName,
//                     lastName: patron.patronLastName,
//                     roll: patron.patronRollNo,
//                     enrollment: patron.patronEnrollmentNumber,
//                     department: patron.patronDepartment,
//                     email: user.userEmail,
//                     semester: patron.patronSemester,
//                     profilePicture,
//                 },
//                 stats: {bookRead, currentlyBorrowed, overdue},
//                 status: ["Active","Student"]
//             });
//         }

//         if (user.user_type?.isLibrarian && user.librarian) {
//           return NextResponse.json({
//             role: "librarian",
//             profile: {
//               name: user.librarian.librarianName,
//               email: user.librarian.librarianEmail,
//               phone: user.librarian.librarianPhone,
//             },
//           });
//         }
    
//         // 🔹 Admin Profile
//         if (user.user_type?.isAdmin) {
//           return NextResponse.json({
//             role: "admin",
//             profile: {
//               username: user.userName,
//               email: user.userEmail,
//             },
//           });
//         }

//         return NextResponse.json({message: "Unauthorized"},{status: 403});
//     }
//     catch(err){
//         return NextResponse.json({message: "Internal Server Error"},{status: 500});
//     }
// }

import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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
        userName: true,
        userEmail: true,
        user_type: {
          select: {
            isAdmin: true,
            isLibrarian: true,
            isStudent: true,
          }
        },
        patron: {
          include: {
            item_transaction: {
              include: {
                items: true
              }
            }
          }
        },
        librarian: true,
      }
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.user_type?.isStudent && user.patron) {
      const patron = user.patron;

      // Calculate stats from transactions
      const transactions = patron.item_transaction;
      const bookRead = transactions.length;
      const currentlyBorrowed = transactions.filter((t) => !t.isAvailable).length;
      const overdue = transactions.filter((t) => !t.isAvailable && t.dueDate && t.dueDate < new Date()).length;
      
      // Get currently borrowed books
      const borrowedBooks = transactions
        .filter(t => !t.isAvailable)
        .map(transaction => ({
          id: transaction.id,
          title: transaction.items?.itemTitle || "Unknown Title",
          author: transaction.items?.itemAuthor || "Unknown Author",
          dueDate: transaction.dueDate,
          coverType: "code" // Default value based on your requirements
        }));

      let profilePicture: string | null = null;
      if (patron.patronImage) {
        profilePicture = `data:image/png;base64,${Buffer.from(patron.patronImage).toString("base64")}`;
      }

      return NextResponse.json({
        role: "Student",
        profile: {
          firstName: patron.patronFirstName,
          middleName: patron.patronMiddleName,
          lastName: patron.patronLastName,
          fullName: `${patron.patronFirstName} ${patron.patronMiddleName || ''} ${patron.patronLastName}`.trim(),
          roll: patron.patronRollNo.toString(),
          enrollment: patron.patronEnrollmentNumber.toString(),
          department: patron.patronDepartment,
          email: user.userEmail,
          semester: patron.patronSemester.toString(),
          profilePicture,
          memberSince: patron.userId ? new Date() : new Date("2021-09-01"), // Using userId as proxy for creation date
          membershipExpires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
        stats: {
          bookRead,
          currentlyBorrowed,
          overdue,
          fines: 0,
        },
        borrowedBooks,
        status: ["Active", "Student"],
        libraryId: `LIB${new Date().getFullYear()}${patron.id.slice(-3)}`,
        studentId: `CS${new Date().getFullYear()}${patron.id.slice(-3)}`
      });
    }

    if (user.user_type?.isLibrarian && user.librarian) {
      return NextResponse.json({
        role: "librarian",
        profile: {
          name: user.librarian.librarianName,
          email: user.librarian.librarianEmail,
          phone: user.librarian.librarianPhone.toString(),
        },
      });
    }

    // Admin Profile
    if (user.user_type?.isAdmin) {
      return NextResponse.json({
        role: "admin",
        profile: {
          username: user.userName,
          email: user.userEmail,
        },
      });
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  } catch (err) {
    console.error("Profile API error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}