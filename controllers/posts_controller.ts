import { User, Post } from "../models/models";
import { client } from "../app";
import { Request, Response, NextFunction } from 'express';
import { Collection, ObjectId } from "mongodb";

export default class PostsController {
  async addPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: Post = {};
      let userId: ObjectId;

      const usersCollection: Collection<User> = client.db("posts_api").collection("users");
      const postsCollection: Collection<Post> = client.db("posts_api").collection("posts");

      if (req.query.id) {
        userId = new ObjectId(req.query.id.toString());

        if (req.body.title && req.body.text) {
          post.title = req.body.title as string;
          post.text = req.body.text as string;
          post.userId = userId;
  
          const postId:ObjectId = (await postsCollection.insertOne(post)).insertedId;
  
          await usersCollection.updateOne({ _id: userId }, {
            $push: { posts: { _id: postId } }
          })
        }
      } else {
        throw new Error("Invalid user ID");
      }

      res.send({
        data: post,
        message: "Post successfully added",
      });
    } catch (e) {
      return next(e.message);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.id) {
        const postsCollection: Collection<Post> = client.db("posts_api").collection("posts");

        const userId: ObjectId = new ObjectId(req.query.id.toString());
        const postsArray = await postsCollection.find({ userId: userId }).toArray();

        res.send(postsArray);
      }
      else {
        throw new Error("Invalid user ID");
      }
    } catch (e) {
      return next(e.message);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.id) {
        const postsCollection: Collection<Post> = client.db("posts_api").collection("posts");

        const postId = new ObjectId(req.query.id.toString());
        const updatePost = req.body as Post;

        const result = await postsCollection.updateOne({ _id : postId }, { $set: updatePost });

        res.send({
          data: result,
          message: "Post successfully updated",
      });
      }
    } catch (e) {
      return next(e.message);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.id) {
        const usersCollection: Collection<User> = client.db("posts_api").collection("users");
        const postsCollection: Collection<Post> = client.db("posts_api").collection("posts");
        const postId = new ObjectId(req.query.id.toString());

        const userId = (await postsCollection.findOne({ _id: postId })).userId;
        const result = await postsCollection.deleteOne({ _id : postId });

        await usersCollection.updateOne({ _id: userId }, {
          $pull: { posts: postId }
        })

        res.send({
          data: result,
          message: "Post successfully deleted",
      });
      }
    } catch (e) {
      return next(e.message);
    }
  }
}