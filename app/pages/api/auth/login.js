import { PrismaClient } from "@prisma/client";
import { verifyPassword, generateToken } from "../../utils/auth";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis.' });
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Email introuvable.' });
            }

            const isPasswordValid = await verifyPassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Mot de passe incorrect.' });
            }

            const token = generateToken(user);
            res.status(200).json({ message: 'Connexion réussie.', token });
            
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur.', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Méthode non autorisée.' });
    }
}