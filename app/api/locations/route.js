import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const locations = await prisma.location.findMany({
            where: { isAvailable: true },
            orderBy: { id: 'asc' },
        });
    
        return new Response(JSON.stringify(locations), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la récupération des hébergements.', error: error.message }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, description, pricePerNight, capacity } = body;

        const newLocation = await prisma.location.create({
            data: { name, description, pricePerNight, capacity },
          });

          return new Response(JSON.stringify(newLocation), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la récupération des hébergements.', error: error.message }), { status: 500 });
    }
}
