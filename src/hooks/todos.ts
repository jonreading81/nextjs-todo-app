import { useEffect, useState } from "react";
import * as todosService from "../services/todos";

export const useTodos = (initalValue: todosService.Todo[]) => {
  const [todos, setTodos] = useState<todosService.Todo[]>(initalValue);

  const addTodo = async (name: todosService.Todo["name"]) => {
    try {
      const { data: createdTodo, errors: createdTodoErrors } =
        await todosService.createTodo(name);

      if (createdTodo) {
        setTodos([createdTodo, ...todos]);
      } else {
        console.log({ createdTodoErrors });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { data, errors } = await todosService.deleteTodo(id);
      if (errors) {
        console.log(errors);
      } else {
        setTodos(todos.filter((element) => element._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatusTodo = async (todo: todosService.Todo) => {
    try {
      const { data, errors } = await todosService.toggleStatusTodo(todo);
      if (data) {
        setTodos(
          todos.map((element) => {
            if (element._id === todo._id) {
              element = data;
            }
            return element;
          })
        );
      } else {
        console.log(errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { todos, addTodo, deleteTodo, toggleStatusTodo };
};
