import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>) {

  
  const { token } = req.body;
  const fouondToken = await client.token.findUnique({
    where:{
      payload:token
    }
  })

  if(!fouondToken) return res.status(404).end()

  req.session.user={
    id: fouondToken.userId
  }
  
  await req.session.save()

  // token을 session에 save했으면 token을 삭제해줌
  await client.token.deleteMany({
    where:{
      userId: fouondToken.userId
    }
  })

  res.json({
    ok:true
  })
  
}

export default withApiSession(withHandler({
  method: "POST",
  handler,
  isPrivate: false
}));
