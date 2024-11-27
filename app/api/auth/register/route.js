import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../../utils/auth";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email et mot de passe requis.' }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email déjà utilisé.' }), { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, role: role || 'CLIENT' },
    });

    return new Response(JSON.stringify({ message: 'Utilisateur créé avec succès.', user: newUser }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur serveur.', error: error.message }), { status: 500 });
  }
}
