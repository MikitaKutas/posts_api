import { Response, NextFunction } from 'express';
import { AppRequest } from "../interface";
import { UsersRepository } from '../repositories/users.repository';
import mongoose from 'mongoose';

const usersRepo = new UsersRepository();

export default class UsersController {
  async add(req: AppRequest, res: Response, next: NextFunction) {
    try {
      req.user = req.body;

      const insertedUser = await usersRepo.addUser(req.user);
      res.send({
        data: insertedUser,
        message: "User successfully added",
      });
    } catch (e) {
      return next(e.message);
    }
  }

  async get(req: AppRequest, res: Response, next: NextFunction) {
    try {
      req.id = new mongoose.Types.ObjectId(req.params.id);
      
      const foundUser = await usersRepo.findUserById(req.id);
      res.send(foundUser);
    } catch (e) {
      return next(e.message);
    }
  }

  async getAll(_: never, res: Response, next: NextFunction) {
    try {
      const allUsers = await usersRepo.findAllUsers();
      res.send(allUsers);
    } catch (e) {
      return next(e.message);
    }
  }

  async update(req: AppRequest, res: Response, next: NextFunction) {
    try {
      req.id = new mongoose.Types.ObjectId(req.params.id);
      req.user = req.body;
      const updateInfo = await usersRepo.updateUser(req.id, req.user);

      res.send({
        data: updateInfo,
        message: "User successfully updated",
      });
    } catch (e) {
      return next(e.message);
    }
  }

  async delete(req: AppRequest, res: Response, next: NextFunction) {
    try {
      req.id = new mongoose.Types.ObjectId(req.params.id);
      const deletionData = await usersRepo.deleteUser(req.id);

      res.send({
        data: deletionData,
        message: "User successfully deleted",
      });
    } catch (e) {
      return next(e.message);
    }
  }
}