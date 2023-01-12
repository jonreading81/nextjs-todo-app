import { altogic } from "./altogic";
import { APIError } from "altogic";

export interface Todo {
  _id: string;
  name: string;
  status: boolean;
  dateTime: string;
}

type FetchTodosResponse = Promise<{
  data: null | Todo[];
  errors: null | APIError;
}>;

export const fetchTodos = async () =>
  (await altogic.db
    .model("todo")
    .limit(100)
    .get()) as unknown as FetchTodosResponse;

type CreteTodoResponse = Promise<{
  data: null | Todo;
  errors: null | APIError;
}>;

export const createTodo = async (name: string) =>
  (await altogic.db.model("todo").create({
    name,
  })) as unknown as CreteTodoResponse;

export const deleteTodo = async (id: string) =>
  await altogic.db.model("todo").object(id).delete();

type ToggleStatusResponse = Promise<{
  data: null | Todo;
  errors: null | APIError;
}>;
export const toggleStatusTodo = async (todo: Todo) =>
  (await altogic.db.model("todo").object(todo._id).update({
    status: !todo.status,
  })) as unknown as ToggleStatusResponse;
