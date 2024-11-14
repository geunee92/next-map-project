import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import prisma from "@/db";


interface Responsetype {
  page?: string;
  limit?: string;
  searchValue?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[]| StoreType>,
) {
  const { page = "", limit = "", searchValue, district }: Responsetype = req.query;

  if (page){
    const count =  await prisma.store.count()
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      /** 정렬 */
      orderBy: { id: "asc"},
      /** 검색조건 contains는 포함되기만 하면 찾는다. */
      where: {
        name: searchValue ? { contains: searchValue } : {},
        address: district ? { contains: district } : {},
      },
      /** 한번에 가져오는 갯수 설정 */
      take: parseInt(limit),
      /** 항목을 건너뜀 */
      skip: skipPage * 10
    });
  
   res.status(200).json({
    page: parseInt(page),
    data: stores,
    totalCount: count,
    totalPage: Math.ceil(count / 10)
   })
  } else {
    const { id }: { id?: string } = req.query;

    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {},
      },
    });

    return res.status(200).json(id ? stores[0] : stores);
  }

} 
