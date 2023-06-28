import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

export async function GET() {
    let item = null;
    try {
        item = await prisma.app.findMany({
            where: {
                deletedAt: null,
                status: 'ACTIVE'
            },
            orderBy: {
                createdAt: 'desc',
            }
        })
    } catch (e) {
        item = getPrismaError(e);
    }
    return NextResponse.json(item)
}