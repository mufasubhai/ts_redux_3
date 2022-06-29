import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'



  export const config = {
    api: {
      responseLimit: false,
    },
  }




export default async function handle(_req: NextApiRequest, res: NextApiResponse) {
  console.log("HERE")
  console.log(_req.method)

  let prisma = new PrismaClient


  if (_req.method === "GET") {

	// console.log(_req.body)

    // const otb = await prisma.oTBSampleHistory.findMany()
    // console.log(otb)
    res.json("woop")

  } else if (_req.method === "POST") {

	const params = JSON.parse(_req.body)


	let hierarchies =  await prisma.hierarchy.findMany({
		distinct: 'hierarchyID',
		where: {
			dept: {
				in : params.departments
			}
		}
	})

	hierarchies = hierarchies.map(el => el.hierarchyID)
	// let dates = params.dates.map(el => )

	let dates = params.dates.map((dateString: string) => [new Date(`${dateString}/01/01`).toISOString,new Date(`${dateString}/12/31`).toISOString ])
	console.log(dates)
	let sales = await prisma.sales.findMany({
		where: {
			tranDate: {
				in: dates
			}
		}

	})


	console.log(sales)
	console.log(hierarchies)


	res.json(sales)

  }

}
