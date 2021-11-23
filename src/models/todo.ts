import mongoose, { Document, PopulatedDoc } from "mongoose";
import { UserAttrs } from "./user";

interface ITodo {
  title: string;
  description: string;
  user: PopulatedDoc<UserAttrs & Document>;
}

interface todoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: ITodo): TodoDoc;
}

interface TodoDoc extends mongoose.Document {
  title: string;
  description: string;
  user: PopulatedDoc<UserAttrs & Document>;
}

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: { type: "ObjectId", ref: "User" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

todoSchema.statics.build = (attr: ITodo) => {
  return new Todo(attr);
};

const Todo = mongoose.model<TodoDoc, todoModelInterface>("Todo", todoSchema);

export { Todo };
