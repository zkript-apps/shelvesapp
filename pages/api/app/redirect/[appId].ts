import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
const prisma = new PrismaClient();
// import IPinfoWrapper, { IPinfo } from "node-ipinfo";

// const ipinfoWrapper = new IPinfoWrapper("2e75cee26618a3");

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

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const { appId } = req.query;
//     const forwarded: string = req.headers["x-forwarded-for"] as string;
//     const ip = forwarded ? forwarded.split(",")[0] : "";
//     ipinfoWrapper.lookupIp(ip as string).then(async (response: IPinfo) => {
//       let item = null;
//       if(response.countryCode === "PH" || response.countryCode === "VD") {
//           try {
//             const result = await prisma.app.findFirst({
//                 where: {
//                     id: Number(appId),
//                     deletedAt: null,
//                     enabled: true
//                 },
//             })
//             item = result ? result.redirectLink : "";
//         } catch (e) {
//             item = getPrismaError(e);
//         }
//       } else {
//           item = "https://cherry-charm.vercel.app/"
//       }
//       res.json(item)
//     }).catch((e) => {
//       res.json({ error: e })
//     });
//   }
// }