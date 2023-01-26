import { Todo } from "../services/todos";

interface TodoListProps {
  todos: Todo[];
  toggleStatus: (todo: Todo) => void;
  deleteTodo: (id: Todo["_id"]) => void;
}

export const TodoList = ({
  todos,
  toggleStatus,
  deleteTodo,
}: TodoListProps) => (
  <>
    <h2 className="text-lg">Todos</h2>
    <ul>
      {todos.map((todo) => {
        const checboxLabel = `${todo.name} On selection the status will be changed.`;

        return (
          <li key={todo._id} className="flex justify-between items-center mb-2">
            <input
              type="checkbox"
              aria-label={checboxLabel}
              title={checboxLabel}
              checked={todo.status}
              onChange={(event) => {
                event.preventDefault();
                toggleStatus(todo);
              }}
            ></input>
            <h3>{todo.name}</h3>

            <time>{new Date(todo.dateTime).toLocaleDateString()}</time>
            <button
              className="bg-red-200 p-2 rounded text-sm"
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
  </>
);
