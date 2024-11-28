import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        const { id } = params;

        const reservation = await prisma.reservation.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!reservation) {
            return new Response(JSON.stringify({ message: 'Réservation non trouvée.' }), { status: 404 });
        }

        return new Response(JSON.stringify(reservation), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la récupération de la réservation.', error: error.message }), { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();
        const { startDate, endDate, locationId, userId } = body;

        const updatedReservation = await prisma.reservation.update({
            where: { id: parseInt(id, 10) },
            data: { startDate, endDate, locationId, userId },
        });

        return new Response(JSON.stringify(updatedReservation), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la mise à jour de la réservation.', error: error.message }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        const deletedReservation = await prisma.reservation.delete({
            where: { id: parseInt(id, 10) },
        });

        return new Response(JSON.stringify(deletedReservation), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Erreur lors de la suppression de la réservation.', error: error.message }), { status: 500 });
    }
}
