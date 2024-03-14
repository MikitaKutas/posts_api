import mongoose from "mongoose";
import { User, UsersCollection, Post, PostsCollection } from "../models/models";

export class PostsRepository {

  async addPost(userId: mongoose.Types.ObjectId, post: Post) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const dbPost = await PostsCollection.create(post);

      if (!dbPost) {
        throw new Error("Post is not saved");
      }

      console.log(dbPost._id);
      const userInfo = await UsersCollection.findByIdAndUpdate(
        userId,
        {
          $push: {
            posts: { _id: dbPost._id }
          }
        },
        { session }
      );

      console.log(userInfo.toJSON());

      await session.commitTransaction();

      return dbPost.toJSON();
    } catch(e) {
      await session.abortTransaction();
      throw new Error("Post is not saved");
    } finally {
      session.endSession();
    }
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
    const updateData = await PostsCollection.findByIdAndUpdate(postId, { $set: updatePost });

    if (!updateData) {
      throw new Error("Post is not updated");
    }

    return updateData.toJSON();
  }

  async deletePost(postId: mongoose.Types.ObjectId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const dbPost = await PostsCollection.findByIdAndDelete(postId);

      if (!dbPost) {
        throw new Error("Post is not deleted");
      }

      await UsersCollection.findByIdAndUpdate(
        dbPost.userId,
        {
          $pull: {
            posts: postId
          }
        },
        { session }
      );

      await session.commitTransaction();

      return dbPost.toJSON();
    } catch(e) {
      await session.abortTransaction();
      throw new Error("Post is not deleted");
    } finally {
      session.endSession();
    }
  }
  
}