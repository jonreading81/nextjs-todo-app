"use client";

import { useEffect, useState } from "react";

import { useTodos } from "../hooks/todos";
import { Todo } from "../services/todos";

export interface TodosProps {
  todos: Todo[];
}

export const Todos = (props: TodosProps) => {
  const { todos, addTodo, deleteTodo, toggleStatusTodo } = useTodos(
    props.todos
  );
  const [todoName, setTodoName] = useState("");

  return (
    <div>
      <form>
        <h2>Add a new todo</h2>
        <div>
          <input
            id="name"
            type="text"
            placeholder="Add your name"
            value={todoName}
            onChange={(e) => {
              setTodoName(e.target.value);
            }}
          ></input>
          <button
            disabled={todoName === ""}
            aria-label="Add Todo"
            onClick={async (event) => {
              event.preventDefault();
              setTodoName("");
              addTodo(todoName);
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <h2>Todos</h2>
        <ul>
          {todos.map((todo) => {
            const checboxLabel = `${todo.name} On selection the status will be changed.`;

            return (
              <li key={todo._id}>
                <input
                  type="checkbox"
                  aria-label={checboxLabel}
                  title={checboxLabel}
                  checked={todo.status}
                  onChange={(event) => {
                    event.preventDefault();
                    toggleStatusTodo(todo);
                  }}
                ></input>
                <h3>{todo.name}</h3>

                <time>{new Date(todo.dateTime).toLocaleDateString()}</time>
                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    deleteTodo(todo._id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
