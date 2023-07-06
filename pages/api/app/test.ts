import type { NextApiRequest, NextApiResponse } from 'next'
import IPinfoWrapper, { IPinfo, AsnResponse } from "node-ipinfo";

const ipinfoWrapper = new IPinfoWrapper("MY_TOKEN");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const forwarded: string = req.headers["x-forwarded-for"] as string;
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    ipinfoWrapper.lookupIp(ip as string).then((response: IPinfo) => {
      res.json(response)
    }).catch(() => {
      res.json("Error")
    });
  }
}