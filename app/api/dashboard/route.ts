import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalBooks = await prisma.items.count();
    const activeMembers = await prisma.patron.count();
    const booksIssued = await prisma.item_transaction.count({
      where: { isAvailable: false },
    });

    const overdue = 0; // You can calculate dynamically if you add dueDate field

    const transactions = await prisma.item_transaction.findMany({
      orderBy: { issueDate: "asc" },
      where: { isAvailable: false },
    });

    const monthlyDataMap: Record<string, number> = {};
    transactions.forEach((tx:any) => {
      const month = new Date(tx.issueDate).toLocaleString("default", { month: "short" });
      monthlyDataMap[month] = (monthlyDataMap[month] || 0) + 1;
    });

    const monthlyData = Object.entries(monthlyDataMap).map(([month, issues]) => ({ month, issues }));

    const recentTransactions = await prisma.item_transaction.findMany({
      take: 5,
      orderBy: { issueDate: "desc" },
      include: { items: true, patron: true },
    });

    const recentActivity = recentTransactions.map((tx:any) => ({
      type: tx.isAvailable ? "return" : "issue",
      message: tx.isAvailable
        ? `Book returned: ${tx.items?.itemTitle ?? "Unknown"}`
        : `Book issued: ${tx.items?.itemTitle ?? "Unknown"} to ${tx.patron?.patronFirstName ?? "Unknown"} ${tx.patron?.patronLastName ?? ""}`.trim(),
      time: tx.issueDate.toISOString(),
    }));

    return NextResponse.json({ totalBooks, activeMembers, booksIssued, overdue, monthlyData, recentActivity });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
