import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useTodos } from "../hooks/todos";
import { Todo, fetchTodos } from "../services/todos";

import * as styles from "../styles/Home.styles";

interface HomeProps {
  todos: Todo[];
}

export default function Home(props: HomeProps) {
  const { todos, addTodo, deleteTodo, toggleStatusTodo } = useTodos(
    props.todos
  );
  const [todoName, setTodoName] = useState("");

  return (
    <styles.container>
      <form>
        <styles.title as="label" htmlFor="name">
          Add a new todo
        </styles.title>
        <styles.formGroup>
          <styles.textInput
            id="name"
            type="text"
            placeholder="Add your name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          ></styles.textInput>
          <styles.button
            disabled={todoName === ""}
            onClick={async (event) => {
              event.preventDefault();
              setTodoName("");
              addTodo(todoName);
            }}
          >
            Submit
          </styles.button>
        </styles.formGroup>
      </form>
      <div>
        <styles.title as="h2">Todos</styles.title>
        <ul>
          {todos.map((todo) => {
            return (
              <styles.todo key={todo._id}>
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={(event) => {
                    event.preventDefault();
                    toggleStatusTodo(todo);
                  }}
                ></input>
                <h3>{todo.name}</h3>

                <time>{new Date(todo.dateTime).toLocaleDateString()}</time>
                <styles.button
                  onClick={async (event) => {
                    event.preventDefault();
                    deleteTodo(todo._id);
                  }}
                >
                  Delete
                </styles.button>
              </styles.todo>
            );
          })}
        </ul>
      </div>
    </styles.container>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { data, errors } = await fetchTodos();

  return { props: { todos: data ?? [] } };
};
