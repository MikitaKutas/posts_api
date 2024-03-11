import express from "express";
import { usersRouter } from "./users_router";
import { postsRouter } from "./posts_router";

export const router = express();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
