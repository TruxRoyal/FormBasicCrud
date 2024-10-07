import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const usuarios = await prisma.usuarios.findMany();

    const totalPorCiudad = await prisma.usuarios.groupBy({
      by: ['pais','estado','ciudad'],
      _count: {
        ciudad: true,
      },
    });

    return NextResponse.json({ totalPorCiudad, usuarios });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching users or totals' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
