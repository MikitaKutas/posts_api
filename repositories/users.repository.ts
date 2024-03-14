import mongoose from "mongoose";
import { User, UsersCollection } from "../models/models";

export class UsersRepository {

  async addUser(user: User) {
    const dbUser = await UsersCollection.create(user);

    if (!dbUser) {
      throw new Error("User is not saved");
    }

    return dbUser.toJSON();
  }

  async findUserById(userId: mongoose.Types.ObjectId) {
    const dbUser = await UsersCollection.findById(userId);

    if (!dbUser) {
      throw new Error("User is not found");
    }

    return dbUser.toJSON();
  }

  async findAllUsers() {
    const users = await UsersCollection.find();

    if (!users) {
      throw new Error("Users are not found");
    }

    return users.map((value) => value.toJSON());
  }

  async updateUser(userId: mongoose.Types.ObjectId, updateUser: User) {
    const updateData = await UsersCollection.findByIdAndUpdate(userId, { $set: updateUser });

    if (!updateData) {
      throw new Error("User is not updated");
    }

    return updateData.toJSON();
  }

  async deleteUser(userId: mongoose.Types.ObjectId) {
    const deletionData = await UsersCollection.findByIdAndDelete(userId);

    if (!deletionData) {
      throw new Error("User is not deleted");
    }

    return deletionData;
  }
  
}