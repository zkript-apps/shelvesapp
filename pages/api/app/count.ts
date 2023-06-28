import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
    res.json(count)
  }
}