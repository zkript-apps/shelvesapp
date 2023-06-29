import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { appId } = req.query;
    let item = null;
    try {
        const result = await prisma.app.findFirst({
            where: {
                id: Number(appId),
                deletedAt: null,
                enabled: true
            },
        })
        item = result ? result.redirectLink : "";
    } catch (e) {
        item = getPrismaError(e);
    }
    res.json(item)
  }
}