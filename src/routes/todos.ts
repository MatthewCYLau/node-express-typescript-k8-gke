import express, { Request, Response } from "express";
import { Todo } from "../models/todo";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import client from "../redis-cache";

const router = express.Router();

router.get(
  "/todos",
  currentUser,
  requireAuth,
  async (_req: Request, res: Response) => {
    try {
      const todos = await Todo.find({}).populate("user");
      return res.status(200).send(todos);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }
);

router.post(
  "/todos",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const todo = Todo.build({
      title,
      description,
      user: req.currentUser.id,
    });
    await todo.save();
    return res.status(201).send(todo);
  }
);

router.get(
  "/todos/me",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const todos = await Todo.find({ user: req.currentUser.email }).populate(
      "user"
    );
    return res.status(200).send(todos);
  }
);

router.get(
  "/todos/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const todoId = req.params.id;
    try {
      client.get(todoId, async (_err, todo) => {
        if (todo) {
          return res.status(200).send(JSON.parse(todo));
        } else {
          const todo = await (
            await Todo.findById(req.params.id).populate("user")
          ).execPopulate();

          if (!todo) {
            return res.status(404).send();
          }

          client.setex(todoId, 1440, JSON.stringify(todo));
          return res.status(200).send(todo);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }
);

router.delete(
  "/todos/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).send(todo);
  }
);

router.put(
  "/todos/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      await Todo.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
      });
      const todo = await (
        await Todo.findById(req.params.id).populate("user")
      ).execPopulate();
      return res.status(200).send(todo);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }
);

export { router as todoRouter };
