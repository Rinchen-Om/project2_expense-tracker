import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT: Update expense
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { amount, category, date, description } = body;
    const updated = await prisma.expense.update({
      where: { id: Number(id), userId: 1 },
      data: {
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        note: description, // Map description to note
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}

// DELETE: Delete expense
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.expense.delete({ where: { id: Number(id), userId: 1 } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
} 