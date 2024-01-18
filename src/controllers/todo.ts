import { RequestHandler } from "express";
import { Todo, TodoClass } from "../models/todo";

const TODOS: TodoClass[] = [];

//CRUD

export const createTodo: RequestHandler = async (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo({ text });
  await newTodo.save();
  res.status(201).send({ message: "New todo has created!", newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.send(TODOS);
};

export const getTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const todo = getTodoById(id);
  if (!todo) {
    throw new Error(`Can not find todo with id: ${id}`);
  }
  res.send(todo);
};

export const updateTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const text = (req.body as { text: string }).text;
  const index = TODOS.findIndex((todo) => todo._id === id);
  if (index < 0) {
    throw new Error(`Can not find todo with id: ${id}`);
  }
  TODOS[index] = new TodoClass(id, text);
  res
    .status(201)
    .send({ message: "Todo has updated", updatedTodo: TODOS[index] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = (req.params as { id: string }).id;
  const index = TODOS.findIndex((todo) => todo._id === id);
  if (index < 0) {
    throw new Error(`Can not find todo with id: ${id}`);
  }
  TODOS.splice(index, 1);
  res.send({ message: "Todo has deleted" });
};

function getTodoById(id: string) {
  return TODOS.find((todo) => todo._id === id);
}
