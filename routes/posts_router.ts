import express from "express";
import PostsController from "../controllers/posts_controller";

export const postsRouter = express();
const postsController = new PostsController();

postsRouter.post('/', postsController.addPost);
postsRouter.get('/', postsController.get);
postsRouter.put('/', postsController.update);
postsRouter.delete('/', postsController.delete);