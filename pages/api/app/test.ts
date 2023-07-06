import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let item = null;
    const ip = req.headers["x-real-ip"] || req.headers["x-forwarded-for"];
    res.json({ req, ip })
  }
}