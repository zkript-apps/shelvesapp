import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import verifyToken from "@/helpers/verifyToken";
const prisma = new PrismaClient();

export async function GET() {
    let balance = null;
    const auth = await verifyToken();
    if (typeof auth === 'object') {
        try {
            const deposit = await prisma.deposit.aggregate({
                _sum: {
                    deposit: true,
                },
                where: {
                    userId: auth.id,
                    deletedAt: null
                }
            })
            const bid = await prisma.bid.aggregate({
                _sum: {
                    bidPrice: true,
                },
                where: {
                    status: {
                        not: {
                            equals: "LOST"
                        }
                    },
                    userId: auth.id,
                    deletedAt: null
                }
            })
            const totalDeposit = deposit._sum.deposit ? deposit._sum.deposit : 0;
            const totalBid = bid._sum.bidPrice ? bid._sum.bidPrice : 0;
            const total = totalDeposit - totalBid;
            balance = total <= 0 ? 0 : total;
        } catch (e) {
            balance = getPrismaError(e);
        }
    } else {
        balance = auth;
    }

    return NextResponse.json(balance)
}