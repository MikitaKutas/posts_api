import express from "express";
import { usersRouter } from "./users.router";
import { postsRouter } from "./posts.router";

export const router = express();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
