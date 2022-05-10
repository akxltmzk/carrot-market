/* 
  method와 handler에 입각해서, 최종적으로 에러헨들링 및 response를 하는 "함수!"를 제공하는  module
*/
import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) : Promise<any> {
    if(req.method !== method){
      return res.status(405).end()
    }
    try{
      await fn(req,res)
    }catch(error){
      console.log(error);
      return res.status(500).json({error})
      
    }
  };
}
