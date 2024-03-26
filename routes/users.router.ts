import express from "express";
import UsersController from "../controllers/users.controller";

export const usersRouter = express();
const usersController = new UsersController();

usersRouter.post('/', usersController.add);
usersRouter.get('/:id', usersController.get);
usersRouter.get('/', usersController.getAll);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);