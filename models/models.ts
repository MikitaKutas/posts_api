import mongoose from "mongoose";
const { Schema } = mongoose;

export interface User {
  name: string;
}

export interface Post {
  title: string;
  body: string;
  userId: mongoose.Types.ObjectId;
}

const usersSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  }
},
{
  versionKey: false
})

const postsSchema = new Schema<Post>({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
},
{
  versionKey: false
})

export const UsersCollection = mongoose.model('user', usersSchema);
export const PostsCollection = mongoose.model('post', postsSchema);
