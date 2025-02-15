import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema ,SigninsSchema,CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from '@repo/db/client'
const app = express();

app.post("/signup", (req, res) => {
const data = CreateUserSchema.safeParse(req.body);
if(!data.success){
   res.json({
    "message": "Incorrect inputs"
  })
  return;
}
})

app.post("/signin", (req, res) => {
  const data = SigninsSchema.safeParse(req.body);
if(!data.success){
   res.json({
    "message": "Incorrect inputs"
  })
  return;
}
  const userId=1;
  const token = jwt.sign({

  },JWT_SECRET)

  res.json({
    token
  })
})

app.post("/room",middleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if(!data.success){
     res.json({
      "message": "Incorrect inputs"
    })
    return;
  }
})  

app.listen(3000);