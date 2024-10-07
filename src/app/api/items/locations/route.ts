import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  try {
    if (type === 'countries') {
      const countries = await prisma.countries.findMany();
      return NextResponse.json(countries, { status: 200 });
    } else if (type === 'states') {
      const states = await prisma.states.findMany({
        where: { id_country: Number(id) },
      });
      return NextResponse.json(states, { status: 200 });
    } else if (type === 'cities') {
      const cities = await prisma.cities.findMany({
        where: { id_state: Number(id) },
      });
      return NextResponse.json(cities, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
