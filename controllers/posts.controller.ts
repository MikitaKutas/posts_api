import { Response, NextFunction } from 'express';
import { AppRequest } from "../interface";
import { PostsRepository } from '../repositories/posts.repository';
import mongoose from 'mongoose';

const postsRepo = new PostsRepository();

export default class PostsController {
  async add(req: AppRequest, res: Response, next: NextFunction) {
    try {
      req.id = new mongoose.Types.ObjectId(req.params.id);

      req.post = {
        title: req.body.title,
        body: req.body.body,
        userId: req.id
      };

      const insertedPost = await postsRepo.addPost(req.post);

      console.log(insertedPost);

      res.send({
        data: insertedPost,
        message: "Post successfully added",
      });
    } catch (e) {
      return next(e.message);
    }
  }

  async get(req: AppRequest, res: Response, next: NextFunction) {
    try {
      req.id = new mongoose.Types.ObjectId(req.params.id);
      
      const foundPost = await postsRepo.findPostById(req.id);
      res.send(foundPost);
    } catch (e) {
      return next(e.message);
    }
  }

  async getAll(_: never, res: Response, next: NextFunction) {
    try {
      const allPosts = await postsRepo.findAllPosts();
      res.send(allPosts);
    } catch (e) {
      return next(e.message);
    }
  }

  async update(req: AppRequest, res: Response, next: NextFunction) {
    try {
      req.id = new mongoose.Types.ObjectId(req.params.id);
      req.post = req.body;
      const updateInfo = await postsRepo.updatePost(req.id, req.post);

      res.send({
        data: updateInfo,
        message: "Post successfully updated",
      });
    } catch (e) {
      return next(e.message);
    }
  }

  async delete(req: AppRequest, res: Response, next: NextFunction) {
    try {
      req.id = new mongoose.Types.ObjectId(req.params.id);
      const deletionData = await postsRepo.deletePost(req.id);

      res.send({
        data: deletionData,
        message: "Post successfully deleted",
      });
    } catch (e) {
      return next(e.message);
    }
  }
}