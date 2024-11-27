import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/auth";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password, role } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({ message: 'Email et mot de passe requis.' });
        }
    
        try {          
          const existingUser = await prisma.user.findUnique({ where: { email } });
          if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé.' });
          }

          const hashedPassword = await hashPassword(password);

          const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, role: role || 'CLIENT' },
          });
    
          res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
        } catch (error) {
          res.status(500).json({ message: 'Erreur serveur.', error: error.message });
        }
      } else {
        res.status(405).json({ message: 'Méthode non autorisée.' });
      }
    }