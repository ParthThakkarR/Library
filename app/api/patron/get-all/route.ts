// // import { PrismaClient } from "@/app/generated/prisma";
// // import { NextRequest, NextResponse } from "next/server";
// // import { getUserFromToken } from "@/app/lib/getUserFromToken";

// // const prisma=new PrismaClient();

// // export async function GET(req: NextRequest) {
// //     try{
// //         const tokenUser=getUserFromToken(req);

// //         if(!tokenUser){
// //             return NextResponse.json({message: "Unauthorized"}, {status: 401});
// //         }

// //         const user = await prisma.users.findUnique({
// //           where: { id: tokenUser.id },
// //           select: {
// //             id: true,
// //             user_type: {
// //               select: {
// //                 isAdmin: true,
// //                 isLibrarian: true,
// //               },
// //             },
// //           },
// //         });

// //         if (!user || !user.user_type) {
// //           return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //         }

// //         const isAdmin = user.user_type.isAdmin;
// //         const isLibrarian = user.user_type.isLibrarian;

// //         if(!isAdmin || !isLibrarian){
// //             return NextResponse.json({message: "Unauthorized"}, {status: 401});
// //         }

// //         const patrons= await prisma.patron.findMany({
// //             include: {
// //                 users:{
// //                     select:{
// //                         userName: true,
// //                         userEmail: true,
// //                         user_type:{
// //                             select: {
// //                                 userTypeName: true,
// //                             }
// //                         }
// //                     }
// //                 },
// //                 item_transaction: true,
// //             }
// //         });

// //         return NextResponse.json(patrons);
// //     }
// //     catch(err){
// //         return NextResponse.json({message: "Internal Server Error"}, {status: 500});
// //     }
// // }



// import { PrismaClient } from "@/app/generated/prisma"; // Using standard prisma client import
// import { NextRequest, NextResponse } from "next/server";
// import { getUserFromToken } from "@/app/lib/getUserFromToken";

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//     try {
//         // 1. Authenticate the user from the token
//         const tokenUser = await getUserFromToken(req);
//         if (!tokenUser) {
//             return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
//         }

//         // 2. Authorize the user by checking their role
//         const user = await prisma.users.findUnique({
//             where: { id: tokenUser.id },
//             select: {
//                 user_type: {
//                     select: {
//                         isAdmin: true,
//                         isLibrarian: true,
//                     },
//                 },
//             },
//         });

//         if (!user?.user_type) {
//             return NextResponse.json({ message: "Unauthorized: User role not found" }, { status: 401 });
//         }

//         // A user must be either an admin OR a librarian to access this route
//         const { isAdmin, isLibrarian } = user.user_type;
//         if (!isAdmin && !isLibrarian) {
//             return NextResponse.json({ message: "Forbidden: Insufficient permissions" }, { status: 403 });
//         }

//         // 3. Fetch all patrons with the necessary related data
//         const patrons = await prisma.patron.findMany({
//             orderBy: {
//                 patronFirstName: 'asc'
//             },
//             // Using include is cleaner when you need full related objects
//             include: {
//                 users: {
//                     select: {
//                         userName: true,
//                         userEmail: true,
//                         user_type: {
//                             select: {
//                                 userTypeName: true,
//                             }
//                         }
//                     }
//                 },
//                 // *** THE FIX IS HERE ***
//                 // We include the transactions...
//                 item_transaction: {
//                     // ...but only select the 'isAvailable' field, which is all
//                     // the frontend needs to calculate the issued book count.
//                     // This keeps the API response efficient.
//                     select: {
//                         isAvailable: true,
//                     }
//                 },
//             }
//         });

//         return NextResponse.json(patrons);

//     } catch (err) {
//         console.error("Error fetching patrons:", err);
//         const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
//         return NextResponse.json({
//             message: "Internal Server Error",
//             error: errorMessage
//         }, { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }


import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/app/lib/getUserFromToken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        // 1. Authenticate user from token
        const tokenUser = await getUserFromToken(req);
        if (!tokenUser) {
            return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
        }

        // 2. Authorize user
        const user = await prisma.users.findUnique({
            where: { id: tokenUser.id },
            select: {
                user_type: {
                    select: {
                        isAdmin: true,
                        isLibrarian: true,
                    },
                },
            },
        });

        if (!user?.user_type) {
            return NextResponse.json({ message: "Unauthorized: User role not found" }, { status: 401 });
        }

        const { isAdmin, isLibrarian } = user.user_type;
        if (!isAdmin && !isLibrarian) {
            return NextResponse.json({ message: "Forbidden: Insufficient permissions" }, { status: 403 });
        }

        // 3. Fetch only patrons whose related user has user_type.isStudent = true
        // const students = await prisma.patron.findMany({
        //     orderBy: { patronFirstName: "asc" },
        //     include: {
        //         users: {
        //             select: {
        //                 userName: true,
        //                 userEmail: true,
        //                 user_type: {
        //                     select: {
        //                         userTypeName: true,
        //                         isStudent: true,   // <-- important to verify
        //                     }
        //                 }
        //             }
        //         },
        //         item_transaction: {
        //             select: { isAvailable: true }
        //         }
        //     },
        //     where: {
        //         users: {
        //             user_type: {
        //                 isStudent: true   // <-- filter here
        //             }
        //         }
        //     }
        // });

        // const studentWithActiveBorrow= students.map((patron)=>{
        //     ...patr,
        // })

      
        // return NextResponse.json(students);

        const students = await prisma.patron.findMany({
          orderBy: { patronFirstName: "asc" },
          include: {
            users: {
              select: {
                userName: true,
                userEmail: true,
                user_type: {
                  select: {
                    userTypeName: true,
                    isStudent: true,
                  },
                },
              },
            },
            item_transaction: {
              select: { isAvailable: true },
            },
          },
          where: {
            users: {
              user_type: {
                isStudent: true,
              },
            },
          },
        });
        
        // add computed field
        const studentsWithActiveBorrow = students.map((patron) => ({
          ...patron,
          activeBorrow: patron.item_transaction.filter((tx) => !tx.isAvailable).length,
        }));
        
        return NextResponse.json(studentsWithActiveBorrow);

    } catch (err) {
        console.error("Error fetching students:", err);
        return NextResponse.json({
            message: "Internal Server Error",
            error: err instanceof Error ? err.message : "Unknown error"
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
