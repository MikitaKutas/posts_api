import express from "express";
import { userRouter } from "./user_router";

export const router = express();

router.use('/users', userRouter);