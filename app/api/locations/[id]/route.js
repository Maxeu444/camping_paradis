import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
      const { id } = params;

      const location = await prisma.location.findUnique({
          where: { id: parseInt(id, 10) },
      });
    
          if (!location) {
            return new Response(JSON.stringify({ message: 'Hébergement non trouvé.' }), { status: 404 });
          }

          return new Response(JSON.stringify(location), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la récupération de l\'hébergement.', error: error.message }), { status: 500 });
    }
}

// todo : update and delete

export async function PUT(req, { params }) {

}

export async function DELETE(req, { params }) {
    
}
