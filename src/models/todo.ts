import { Schema, model } from "mongoose";

export class TodoClass {
  constructor(public _id: string, public text: string) {}
}

export interface ITodo {
  text: string;
}

const todoSchema = new Schema<ITodo>({
  text: { type: String, required: true },
});

export const Todo = model<ITodo>("Todo", todoSchema);
