import express from "express";
import { userRouter } from "./user_router.js";

export const router = express();

router.use('/users', userRouter);