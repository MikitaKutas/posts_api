import express from "express";
import PostsController from "../controllers/posts.controller";

export const postsRouter = express();
const postsController = new PostsController();

postsRouter.post('/:id', postsController.add);
postsRouter.post('/:id', postsController.get);
postsRouter.get('/', postsController.getAll);
postsRouter.put('/:id', postsController.update);
postsRouter.delete('/:id', postsController.delete);