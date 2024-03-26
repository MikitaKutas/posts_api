import mongoose from "mongoose";
import { UsersCollection, Post, PostsCollection } from "../models/models";
import { client } from "../app";

export class PostsRepository {

  async addPost(post: Post) {
    const session = await client.startSession();

    return session.withTransaction(async (session) => {
      const dbPost = await PostsCollection.create([post], { session });

      await UsersCollection.findByIdAndUpdate(
        post.userId,
        {
          $push: {
            posts: { _id: dbPost[0]._id }
          }
        },
        { session }
      );

      return dbPost[0].toJSON();
    }, null)
  }

  async findPostById(postId: mongoose.Types.ObjectId) {
    const dbPost = await PostsCollection.findById(postId);

    if (!dbPost) {
      throw new Error("Post is not found");
    }

    return dbPost.toJSON();
  }

  async findAllPosts() {
    const posts = await PostsCollection.find();

    if (!posts) {
      throw new Error("Posts are not found");
    }

    return posts.map((value) => value.toJSON());
  }

  async updatePost(postId: mongoose.Types.ObjectId, updatePost: Post) {
    const updateData = await PostsCollection.findByIdAndUpdate(postId, { $set: updatePost }, { new: true });

    if (!updateData) {
      throw new Error("Post is not updated");
    }

    return updateData.toJSON();
  }

  async deletePost(postId: mongoose.Types.ObjectId) {
    const session = await client.startSession();

    return session.withTransaction(async (session) => {
      const dbPost = await PostsCollection.findByIdAndDelete(postId);

      if (!dbPost) {
        throw new Error("Post is not deleted");
      }

      await UsersCollection.findByIdAndUpdate(
       dbPost.userId,
        {
          $pull: {
            posts: { _id: dbPost._id }
          }
        },
        { session }
      );

      return dbPost.toJSON();
    }, null)
  }
}