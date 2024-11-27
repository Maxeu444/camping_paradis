import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {

    const body = await req.json();
    const { id } = body;

    await prisma.user.update({
      where: { id },
      data: { tokenVersion: { increment: 1 } },
    });
    return new Response(JSON.stringify({ message: 'Déconnexion réussie.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur serveur.', error: error.message }), { status: 500 });
  }
}

