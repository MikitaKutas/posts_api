import { Request } from "express";
import { User, Post } from "./models/models";
import mongoose from "mongoose";

export interface AppRequest extends Request {
  user: User;
  post: Post;
  id: mongoose.Types.ObjectId;
}