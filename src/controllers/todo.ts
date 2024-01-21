import { RequestHandler } from "express";
import { Todo } from "../models/todo";

//CRUD

export const createTodo: RequestHandler = async (req, res, next) => {
  const text = (req.body as { text: string }).text;
  try {
    const newTodo = await Todo.create({ text });
    res.status(201).send({ text: newTodo.text, _id: newTodo._id });
  } catch (error: unknown) {
    next(error);
  }
};

export const getTodos: RequestHandler = async (req, res, next) => {
  const todos = await Todo.find({}, "text createdAt").sort({ createdAt: -1 });
  res.send(todos);
};

export const getTodo: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id, "text").exec();
    res.send(todo);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const text = (req.body as { text: string }).text;

  try {
    const todo = await Todo.findById(id, "text").exec();
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.text = text;
    await todo.save();
    res.status(201).send(todo);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  const id = (req.params as { id: string }).id;

  try {
    const todo = await Todo.findByIdAndDelete(id).exec();
    if (!todo) {
      throw new Error("Todo not found");
    }
    res.send(todo);
  } catch (error: unknown) {
    next(error);
  }
};
