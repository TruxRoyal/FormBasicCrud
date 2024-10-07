import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const usuarios = await prisma.usuarios.findMany();
    return NextResponse.json(usuarios);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch usuarios' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email, nombre, apellido, sexo, fecha_nacimiento, direccion, vivienda,
      id_country, id_state, id_city, pais, estado, ciudad, observacion
    } = body;

    const existingUser = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), { status: 400 });
    }

    const usuariosEnCiudad = await prisma.usuarios.count({
      where: { ciudad },
    });

    if (usuariosEnCiudad >= 3) {
      return new Response(JSON.stringify({ error: `Solo se permiten 3 registros por ciudad. Ciudad: ${ciudad}` }), { status: 400 });
    }

    const newUsuario = await prisma.usuarios.create({
      data: {
        email,
        nombre,
        apellido,
        sexo,
        fecha_nacimiento,
        direccion,
        vivienda,
        id_country: Number(id_country),
        id_state: Number(id_state),
        id_city: Number(id_city),
        pais,
        estado,
        ciudad,
        observacion,
      },
    });

    return NextResponse.json(newUsuario, { status: 201 });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return new Response(JSON.stringify({ error: 'Failed to create usuario' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

  
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    await prisma.usuarios.delete({
      where: { email },
    });

    return NextResponse.json({ message: 'Usuario eliminado' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete usuario' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      email, nombre, apellido, sexo, fecha_nacimiento, direccion, vivienda,
      id_country, id_state, id_city, pais, estado, ciudad, observacion
    } = body;

    const existingUser = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
    }

    const updatedUsuario = await prisma.usuarios.update({
      where: { email },
      data: {
        nombre,
        apellido,
        sexo,
        fecha_nacimiento,
        direccion,
        vivienda,
        id_country: Number(id_country),
        id_state: Number(id_state),
        id_city: Number(id_city),
        pais,
        estado,
        ciudad,
        observacion,
      },
    });

    return NextResponse.json(updatedUsuario, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return new Response(JSON.stringify({ error: 'Failed to update usuario' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

