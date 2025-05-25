import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET: List all incomes
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  try {
    const incomes = await prisma.income.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(incomes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch incomes' }, { status: 500 });
  }
}

// POST: Create new income
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { amount, source, date, description } = body;
    const income = await prisma.income.create({
      data: {
        amount: parseFloat(amount),
        source,
        date: new Date(date),
        note: description,
        userId: session.user.id,
      },
    });
    return NextResponse.json(income);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create income' }, { status: 500 });
  }
} 