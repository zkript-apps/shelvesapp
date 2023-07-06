import type { NextApiRequest, NextApiResponse } from 'next'
import IPinfoWrapper, { IPinfo, AsnResponse } from "node-ipinfo";

const ipinfoWrapper = new IPinfoWrapper("2e75cee26618a3");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const forwarded: string = req.headers["x-forwarded-for"] as string;
    const ip = forwarded ? forwarded.split(/, /)[0] : "";
    ipinfoWrapper.lookupIp(ip as string).then((response: IPinfo) => {
      res.json({ response })
    }).catch((e) => {
      res.json({ e, forwarded })
    });
  }
}