"use client";

import { useTodos } from "../hooks/todos";
import { Todo } from "../services/todos";
import { AddTodoForm } from "./addTodoForm";
import { TodoList } from "./todoList";

export interface TodosProps {
  todos: Todo[];
}

export const Todos = (props: TodosProps) => {
  const { todos, addTodo, deleteTodo, toggleStatusTodo } = useTodos(
    props.todos
  );

  return (
    <div className="m-8">
      <div className="mb-4">
        <AddTodoForm addTodo={addTodo} />
      </div>
      <div>
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleStatus={toggleStatusTodo}
        />
      </div>
    </div>
  );
};
