import { Suspense } from "react";
import { useTodos } from "../hooks/todos";
import { fetchTodos } from "../services/todos";
import { Todos } from "../components/todos";

export default async function Page() {
  const { data: todos, errors } = await fetchTodos();

  return <Todos todos={todos ?? []} />;
}
