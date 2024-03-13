import express from "express";
import UsersController from "../controllers/users_controller";

export const usersRouter = express();
const usersController = new UsersController();

usersRouter.post('/', usersController.addUser);
usersRouter.get('/', usersController.get);
usersRouter.put('/', usersController.update);
usersRouter.delete('/', usersController.delete);