import express from "express";
import UsersController from "../controllers/users.controller";

export const usersRouter = express();
const usersController = new UsersController();

usersRouter.post('/', usersController.post);
usersRouter.get('/', usersController.get);
usersRouter.put('/', usersController.put);
usersRouter.delete('/', usersController.delete);