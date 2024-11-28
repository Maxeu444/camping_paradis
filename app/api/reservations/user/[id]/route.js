// todo : get reservations by user id
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        const { id } = params;

    const reservations = await prisma.reservation.findMany({
        where: { userId: parseInt(id, 10) },
    });

        return new Response(JSON.stringify(reservations), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la récupération des réservations.', error: error.message }), { status: 500 });
    }
}
