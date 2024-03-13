import { Collection, MongoClient } from "mongodb";
import { User } from "../models/models";

export class UsersRepository {
  users: Collection<User>;

  constructor(client: MongoClient) {
    this.users = client.db('posts_api').collection('users');
  }

  addUser(user: User) {
    
  }
}