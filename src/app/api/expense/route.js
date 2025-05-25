import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: List all expenses
export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: 1 }, // Replace with real userId from session
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

// POST: Create new expense
export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, category, date, description } = body;
    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        note: description, // Map description to note
        userId: 1, // Replace with real userId from session
      },
    });
    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
} 