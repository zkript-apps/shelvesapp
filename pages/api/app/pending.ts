import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let item = null;
    try {
        item = await prisma.app.findMany({
            where: {
                deletedAt: null,
                status: 'PENDING'
            },
            orderBy: {
                createdAt: 'desc',
            }
        })
    } catch (e) {
        item = getPrismaError(e);
    }
    res.json(item)
  }
}