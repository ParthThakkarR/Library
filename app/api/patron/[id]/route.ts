import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";
import { tree } from "next/dist/build/templates/app-page";

const prisma = new PrismaClient();

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {

//     const tokenUser = await getUserFromToken(req);

//     const user = await prisma.users.findUnique({
//       where: { id: tokenUser.id },
//       include: { user_type: true },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const patron = await prisma.patron.findUnique({
//       where: { id: params.id },
//       include: {
//         users: {
//           include: { user_type: true },
//         },
//         item_transaction: true, 
//       },
//     });

//     if (!patron) {
//       return NextResponse.json({ message: "Patron not found" }, { status: 404 });
//     }

//     const isAdmin = user.user_type?.isAdmin;
//     const isLibrarian = user.user_type?.isLibrarian;
//     const isPatron = user.user_type?.isStudent;

//     if (!(isAdmin || isLibrarian || patron.userId === user.id)) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json(patron);

//   } catch (error) {
//     console.error("GET Patron error:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) 
{
  try {
    const { id } = await context.params;
    const tokenUser = await getUserFromToken(req);

    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      include: { user_type: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const patron = await prisma.patron.findUnique({
      where: { id },
      include: {
        users: {
          include: { user_type: true },
        },
        item_transaction: {
          include: {
            items: {
              select: {
                id: true,
                itemTitle: true,
                itemAuthor: true,
                itemType: true,
                isbn: true,
              },
            },
          },
        },
      },
    });

    if (!patron) {
      return NextResponse.json(
        { message: "Patron not found" },
        { status: 404 }
      );
    }

    const isAdmin = user.user_type?.isAdmin;
    const isLibrarian = user.user_type?.isLibrarian;
    const isPatron = user.user_type?.isStudent;

    // Only Admins, Librarians, or the patron themself can view
    if (!(isAdmin || isLibrarian || patron.userId === user.id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const activeBorrow=patron.item_transaction.filter(
      (tx)=> !tx.isAvailable
    ).length;

    return NextResponse.json({...patron, activeBorrow});
  } catch (error) {
    console.error("GET Patron error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const tokenUser = await getUserFromToken(req);
    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      include: {
        user_type: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    const patron = await prisma.patron.findUnique({
      where: { id },
    });

    if (!patron) {
      return NextResponse.json({ message: "Patron not found" }, { status: 404 });
    }

    const isAdmin=user.user_type.isAdmin;
    const isLibrarian=user.user_type.isLibrarian;
    const isOwner= patron.userId===user.id;

    if (!(isAdmin || isLibrarian || isOwner)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    console.log("Incoming body:", body);

    const allowedFields = [
      "patronFirstName", "patronMiddleName", "patronLastName",
      "patronDepartment", "patronSemester", "patronRollNo",
      "patronEnrollmentNumber", "patronImage"
    ];

    const data: any = {};
    for (const key of allowedFields) {
      if (key in body) {
        if (["patronSemester", "patronRollNo", "patronEnrollmentNumber"].includes(key)) {
          data[key] = body[key] ? Number(body[key]) : null;
        } else {
          data[key] = body[key];
        }
      }
    }

    const updated = await prisma.patron.update({
      where: { id },
      data,
      include:{
        users:{
          select:{
            userEmail: true
          }
        }
      }
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT Patron error:", err);
    return NextResponse.json({ message: "Error updating patron" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const tokenUser = await getUserFromToken(req);

    const user = await prisma.users.findUnique({
      where: { id: tokenUser.id },
      include: { user_type: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = user.user_type?.isAdmin;

    if (!isAdmin) {
      return NextResponse.json({ message: "Forbidden: Only admin can delete patrons" }, { status: 403 });
    }

    const activeBorrow= await prisma.item_transaction.findFirst({
      where:{
        itemAssignedTo: id,
        isAvailable: false
      }
    })

    if(activeBorrow){
      return NextResponse.json({
        message: "Cannot delete patron with active borrowed book"
      }, {status: 400})
    }

    const patron = await prisma.patron.findUnique({
      where: { id },
    });

    if (!patron) {
      return NextResponse.json({ message: "Patron not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.patron.delete({ where: { id } }),
      prisma.users.delete({ where: { id: patron.userId } }),
    ]);

    return NextResponse.json({ message: "Deleted successfully" }, {status:200});
  
  } catch (err) {
    console.error("Error deleting patron:", err);
    return NextResponse.json({ message: "Error deleting patron" }, { status: 500 });
  }
}