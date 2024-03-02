import { User } from "../models/user_model";
import { client } from "../app";
import { Request, Response, NextFunction } from 'express';

export default class UserController {
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as User;
      const usersDb = client.db("posts_api").collection("users");

      await usersDb.insertOne(user);

      res.send(`
      User successfully added
      ${JSON.stringify(user)}
      `);
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

      await usersDb.updateOne(req.query, { $set: user });

      res.send(`
      Successfully updated user
      ${JSON.stringify(user)}
      `);
    } catch (e) {
      return next(e.message);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const usersDb = client.db("posts_api").collection("users");

      const user = await usersDb.deleteOne(req.query);

      res.send(`
      Successfully deleted user
      ${JSON.stringify(user)}
      `);
    } catch (e) {
      return next(e.message);
    }
  }
}