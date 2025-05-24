import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT: Update income
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { amount, source, date, description } = body;
    const updated = await prisma.income.update({
      where: { id: Number(id), userId: 1 },
      data: {
        amount: parseFloat(amount),
        source,
        date: new Date(date),
        note: description,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update income' }, { status: 500 });
  }
}

// DELETE: Delete income
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.income.delete({ where: { id: Number(id), userId: 1 } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete income' }, { status: 500 });
  }
} 