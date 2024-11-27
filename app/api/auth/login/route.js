import { PrismaClient } from "@prisma/client";
import { verifyPassword, generateToken } from "../../../utils/auth";

const prisma = new PrismaClient();

export async function POST(req) {
    try {    
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Email et mot de passe requis.' }), { status: 400 });
        }

        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return new Response(JSON.stringify({ message: 'Email introuvable.' }), { status: 400 });
        }
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: 'Mot de passe incorrect.' }), { status: 400 });
        }
        const token = generateToken(user);
        return new Response(JSON.stringify({ message: 'Connexion réussie.', token }), { status: 201 });
            
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur serveur.', error: error.message }), { status: 500 });
    }
}