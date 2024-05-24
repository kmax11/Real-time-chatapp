import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import ConnectToMongoose from './db/connectToDB.js';
import authRouter from './router/authRouter.js'
import messageRouter from './router/messageRouter.js'
import userRouter from './router/userRouter.js';
import { app, server } from './socket/socket.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/messages',messageRouter);
app.use('/api/users',userRouter)


server.listen(PORT, () => {
  ConnectToMongoose();
  console.log(`Server listening on port ${PORT}`);
});
