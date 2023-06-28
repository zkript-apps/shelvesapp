import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

export async function GET() {
    let cron = null;
    try {
        const bidEndedItems = await prisma.item.findMany({
            where: {
                bidEndDate: {
                    lt: new Date()
                },
                deletedAt: null,
                status: "FOR_BID"
            },
            include: {
                Bid: {
                    orderBy: {
                        bidPrice: 'desc'
                    },
                },
            },
        });
        const wonBids = bidEndedItems.map((item) => {
            const won = item.Bid && item.Bid.length > 0 ? item.Bid[0].id : null;
            return won;
        }).filter((item) => item) as number[];
        const lostBids = bidEndedItems.map((item, index) => {
            return index === 0 ? null : item.id;
        }).filter((item) => item) as number[];
        const updatedWonBids = await prisma.bid.updateMany({
            where: { id: { in: wonBids } },
            data: {
              status: "WON"
            },
        });
        const updatedLostBids = await prisma.bid.updateMany({
            where: { id: { in: lostBids } },
            data: {
              status: "LOST"
            },
        });
        cron = { updatedWonBids, updatedLostBids };
    } catch (e) {
        cron = getPrismaError(e);
    }

    return NextResponse.json(cron)
}