import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import verifyToken from "@/helpers/verifyToken";
import verifyRequiredKeys from "@/helpers/verifyRequiredKeys";
import { BID_SPAM_MESSAGE } from "@/helpers/constants";
import toCurrency from "@/helpers/toCurrency";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
const prisma = new PrismaClient();

const redis = new Redis({
    url: "https://glad-snake-37417.upstash.io",
    token: "AZIpACQgZDcwZjEyMmMtYzJmMi00NDA4LWExZTYtM2M1MDZiYjk0NmNkY2U0Nzk5ODJjZjNiNDllZDljZTE1MGNhYWExZDg5MmE=",
});
const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(1, "5 s"),
});

export async function GET() {
    let bid = null;
    const auth = await verifyToken();
    if (typeof auth === 'object') {
        try {
            bid = await prisma.bid.findMany({
                where: {
                    deletedAt: undefined
                }
            })
        } catch (e) {
            bid = getPrismaError(e);
        }
    } else {
        bid = auth;
    }

    return NextResponse.json(bid)
}

export async function POST(request: NextRequest) {
    const res = await request.json();
    const auth = await verifyToken();
    let createBid = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "itemId",
            "bidPrice",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
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
                const currBalance = total <= 0 ? 0 : total;
                const isBalanceSufficient = currBalance >= Number(res.bidPrice);
                const item = await prisma.item.findFirst({
                    where: {
                        bidEndDate: {
                            gt: new Date()
                        },
                        id: Number(res.itemId),
                        deletedAt: null,
                        
                    },
                    include: {
                        Bid: {
                            orderBy: {
                                createdAt: 'desc'
                            },
                            take: 1
                        }
                    }
                })
                const isItemOngoing = !!item;
                const itemCurrBidPrice = item && item.Bid.length > 0 ? Number(item.Bid[0].bidPrice) : Number(item?.origPrice);
                if(!isBalanceSufficient) {
                    createBid = "Insufficient balance";
                } else if(!isItemOngoing) {
                    createBid = "Bid time window ended";
                } else if(itemCurrBidPrice >= Number(res.bidPrice)) {
                    createBid = `Bid price must be greater than ${toCurrency.format(itemCurrBidPrice)}`;
                } else {
                    const { success } = await rateLimit.limit(
                        `${auth.id}-${res.itemId}`
                    );
                    if (!success) {
                        return NextResponse.json(BID_SPAM_MESSAGE);
                    }
                    createBid = await prisma.bid.create({
                        data: {
                            bidPrice: Number(res.bidPrice),
                            itemId: Number(res.itemId),
                            userId: Number(auth.id),
                        }
                    })
                }
            } catch (e) {
                createBid = getPrismaError(e);
            }
        } else {
            createBid = "Required fields are empty";
        }
    } else {
        createBid = auth;
    }
    return NextResponse.json(createBid);
}

export async function PATCH(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let updateBid = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "itemId",
            "bidPrice",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                updateBid = await prisma.bid.update({
                    where: {
                        id: res.id,
                    },
                    data: res,
                })
            } catch (e) {
                updateBid = getPrismaError(e);
            }
        } else {
            updateBid = "Required fields are empty";
        }
    } else {
        updateBid = auth;
    }
    return NextResponse.json(updateBid);
}


export async function DELETE(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let deleteBid = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "id",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                deleteBid = await prisma.bid.update({
                    where: {
                        id: res.id,
                    },
                    data: {
                        deletedAt: new Date(),
                    },
                })
            } catch (e) {
                deleteBid = getPrismaError(e);
            }
        } else {
            deleteBid = "Required fields are empty";
        }
    } else {
        deleteBid = auth;
    }
    return NextResponse.json(deleteBid);
}

