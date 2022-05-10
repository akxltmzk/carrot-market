/* 
  user를 생성,혹은 서치하고 token을 발행해서 user를 확인하는 api
  user가 핸드폰 번호 혹은 이메일을 입력하면,
  1. user가 있는지 확인
  2. user가 있다면, token을 바로 생성
  3. user가 없다면, user를 만들고, token을 생성
  4. userId를 token model에 자동으로 연결해줌
*/

import twilio from "twilio"
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null; 
  if(!user) return res.status(400).json({ok:false})
  const payload = Math.floor(100000 + Math.random() * 900000) + "";


  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if(phone){
    // const message =  await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   // 확실히 존재하는 환경변수라고 !를 붙이면 에러를 없앨 수 있음.
    //   to: process.env.MY_PHONE!,
    //   body:`Your login token is ${payload}`
    // })
  }
  if(email){
  }

  return res.json({ ok:true })
}

export default withHandler("POST", handler);
