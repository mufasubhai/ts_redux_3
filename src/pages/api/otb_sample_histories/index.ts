import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import appConfig from "../../../app/appConfig";



  export const config = {
    api: {
      responseLimit: false,
    },
  }

export default async function handle(_req: NextApiRequest, res: NextApiResponse) {
  console.log("HERE")
  console.log(_req.method)

  if (_req.method === "GET") {
    const otb = await prisma.oTBSampleHistory.findMany()
    // console.log(otb)
    res.json(otb)

  } else if (_req.method === "POST") {
    console.log(_req.body)
    console.log(_req.method)
    // console.log(_req)
    res.json("IT'S A POST REQUEST")
  }
}
// 