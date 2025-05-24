import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: List all incomes
export async function GET() {
  try {
    const incomes = await prisma.income.findMany({
      where: { userId: 1 }, // Replace with real userId from session
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(incomes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch incomes' }, { status: 500 });
  }
}

// POST: Create new income
export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, source, date, description } = body;
    const income = await prisma.income.create({
      data: {
        amount: parseFloat(amount),
        source,
        date: new Date(date),
        note: description,
        userId: 1, // Replace with real userId from session
      },
    });
    return NextResponse.json(income);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create income' }, { status: 500 });
  }
} 