import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

export async function GET() {
    let count = null;
    try {
        const active = await prisma.app.aggregate({
            _count: {
                id: true,
            },
            where: {
                status: 'ACTIVE',
                deletedAt: null
            },
        })
        const pending = await prisma.app.aggregate({
            _count: {
                id: true,
            },
            where: {
                status: 'PENDING',
                deletedAt: null
            },
        })
        const activeCount = active._count.id ? active._count.id : 0;
        const pendingCount = pending._count.id ? pending._count.id : 0;
        count = { active: activeCount, pending: pendingCount };
    } catch (e) {
        count = getPrismaError(e);
    }
    return NextResponse.json(count)
}