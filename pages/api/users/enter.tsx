import client from "@libs/client/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req:NextApiRequest, res:NextApiResponse){
  const { phone, email } = req.body
  const payload = phone ? {phone: +phone} : {email}
 
  // const user = await client.user.upsert({
  //   where:{
  //     ...payload
  //   },
  //   create:{
  //     name: "Anonymous",
  //     ...payload
  //   },

  //   update :{

  //   }
  // })

  const token = await client.token.create({
    data:{
      payload:"1234",
      user:{
        connectOrCreate:{
          where:{
            ...payload
          },
          create:{
            name: "Anonymous",
            ...payload
          },
        }
      }
    }
  })

  console.log(token);
  

  
  
  // if(email){
  //   user = await client.user.findUnique({
  //     where:{
  //       email
  //     }
  //   })
  //   if(user) console.log("find it!");
    
  //   if(!user){
  //     console.log("Did not find. will create");
      
  //     user = await client.user.create({
  //       data:{
  //         name:"Anonymous",
  //         email
  //       }
  //     })
  //   }
  //   console.log(user);  
  // }

  // if(phone){
  //   user = await client.user.findUnique({
  //     where:{
  //       Phone : +phone
  //     }
  //   })
  //   if(user) console.log("find it!");
    
  //   if(!user){
  //     console.log("Did not find. will create");
      
  //     user = await client.user.create({
  //       data:{
  //         name:"Anonymous",
  //         Phone : +phone
  //       }
  //     })
  //   }
  //   console.log(user);  
  // }
  
  return res.status(200).end()
}

export default withHandler("POST",handler)