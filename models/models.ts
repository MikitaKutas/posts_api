import { ObjectId } from "mongodb";

export interface User {
  name?: string,
  level?: number,
}

export interface Post {
  title?: string,
  text?: string,
  userId?: ObjectId,
}