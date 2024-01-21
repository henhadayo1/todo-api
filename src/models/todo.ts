import { ObjectId, Schema, model } from "mongoose";

export interface ITodo {
  text: string;
}

const todoSchema = new Schema<ITodo>({
  text: { type: String, required: true },
});

export const Todo = model<ITodo>("Todo", todoSchema);
