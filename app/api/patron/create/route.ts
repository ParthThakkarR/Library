import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getUserFromToken } from "@/app/lib/getUserFromToken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    const formData = await req.formData();

    let patronImageBuffer: Buffer | null = null;
    const imageFile = formData.get("patronImage") as File | null;

    // Check if file is present and valid
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      patronImageBuffer = Buffer.from(await imageFile.arrayBuffer());
    }

    // Build patron data
    const data: any = {
      patronFirstName: formData.get("patronFirstName") as string,
      patronMiddleName: formData.get("patronMiddleName") as string,
      patronLastName: formData.get("patronLastName") as string,
      patronDepartment: formData.get("patronDepartment") as string,
      patronSemester: parseInt(formData.get("patronSemester") as string),
      patronRollNo: parseInt(formData.get("patronRollNo") as string),
      patronEnrollmentNumber: parseInt(formData.get("patronEnrollmentNumber") as string),
      userId: user.id,
    };

    // Add patronImage ONLY if it exists
    if (patronImageBuffer) {
      data.patronImage = patronImageBuffer;
    }

    const newPatron = await prisma.patron.create({ data });

    return NextResponse.json(newPatron, { status: 201 });

  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Failed to create patron" },
      { status: err.message?.includes("token") ? 401 : 500 }
    );
  }
}
