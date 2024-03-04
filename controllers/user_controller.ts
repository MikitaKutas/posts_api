import { User } from "../models/user_model";
import { client } from "../app";
import { Request, Response, NextFunction } from 'express';

export default class UserController {
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as User;
      const usersDb = client.db("posts_api").collection("users");

      await usersDb.insertOne(user);

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
      const usersDb = client.db("posts_api").collection("users");
      const usersArray = await usersDb.find(req.query).toArray();

      res.send(usersArray);
    } catch (e) {
      return next(e.message);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const usersDb = client.db("posts_api").collection("users");
      const user = req.body as User;
      const { name, level } = req.query;

      await usersDb.updateOne({ name, level }, { $set: user });

      res.send({
        data: user,
        message: "User successfully updated",
      });
    } catch (e) {
      return next(e.message);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const usersDb = client.db("posts_api").collection("users");
      const { name, level } = req.query;

      const user = await usersDb.deleteOne({ name, level });

      res.send({
        data: user,
        message: "User successfully deleted",
      });
    } catch (e) {
      return next(e.message);
    }
  }
}