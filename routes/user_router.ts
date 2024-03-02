import express from "express";
import UserController from "../controllers/user_controller";

export const userRouter = express();
const userController = new UserController();

userRouter.post('/', userController.addUser);
userRouter.get('/', userController.get);
userRouter.put('/', userController.update);
userRouter.delete('/', userController.delete);