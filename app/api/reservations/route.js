import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const reservations = await prisma.reservation.findMany();
        return new Response(JSON.stringify(reservations), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la récupération des réservations.', error: error.message }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { startDate, endDate, totalPrice, userId, locationId } = body;

        const newReservation = await prisma.reservation.create({
            data: { startDate, endDate, totalPrice, userId, locationId },
        });

        return new Response(JSON.stringify(newReservation), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la création de la réservation.', error: error.message }), { status: 500 });
    }
}


