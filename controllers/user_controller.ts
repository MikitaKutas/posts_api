import { User } from "../models/user_model";
import { client } from "../app";
import { Request, Response, NextFunction } from 'express';
import { Collection } from "mongodb";

export default class UserController {
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = {};

      if (req.body.name && req.body.level) {
        user.name = req.body.name as string;
        user.level = Number(req.body.level);
      } else {
        throw new Error("Invalid user structure");
      }
      const usersCollection: Collection<User> = client.db("posts_api").collection("users");

      await usersCollection.insertOne(user);

      res.send({
        data: user,
        message: "User successfully added",
      });
    } catch (e) {
      return next(e.message);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = {};

      if (req.query.name) {
        user.name = req.query.name as string;
      }

      if (req.query.level) {
        user.level = Number(req.query.level);
      }

      const usersCollection: Collection<User> = client.db("posts_api").collection("users");
      const usersArray = await usersCollection.find(user).toArray();

      res.send(usersArray);
    } catch (e) {
      return next(e.message);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const dbUser: User = {};

      if (req.query.name) {
        dbUser.name = req.query.name as string;
      }

      if (req.query.level) {
        dbUser.level = Number(req.query.level);
      }

      const updateUser = req.body as User;

      const usersCollection: Collection<User> = client.db("posts_api").collection("users");
      await usersCollection.updateOne(dbUser, { $set: updateUser });

      res.send({
        data: dbUser,
        message: "User successfully updated",
      });
    } catch (e) {
      return next(e.message);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteUser: User = {};

      if (req.query.name) {
        deleteUser.name = req.query.name as string;
      }

      if (req.query.level) {
        deleteUser.level = Number(req.query.level);
      }

      const usersCollection: Collection<User> = client.db("posts_api").collection("users");
      const deletionData = await usersCollection.deleteOne(deleteUser);

      res.send({
        data: deletionData,
        message: "User successfully deleted",
      });
    } catch (e) {
      return next(e.message);
    }
  }
}