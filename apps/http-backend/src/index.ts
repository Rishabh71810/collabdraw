import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema ,SigninsSchema,CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from '@repo/db/client'
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
const parsedData = CreateUserSchema.safeParse(req.body); // used safe parse that suceess does not return any error 
if(!parsedData.success){
   res.json({
    "message": "Incorrect inputs"
  })
  return;
}
try {
  await prismaClient.user.create({
    data: {
      email:parsedData.data?.username,
      password:parsedData.data.password,
      name:parsedData.data.name,
      photo:""
    }
  })
  res.json({
    userId: "123"
  })

} catch (error) {
  res.status(411).json({
    "message": "User already exists"
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