import { useEffect, useState } from "react";

interface AddTodoFormProps {
  addTodo: (name: string) => void;
}

export const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {
  const [name, setName] = useState("");

  return (
    <form>
      <h2 className="text-lg mb-2">Add a new todo</h2>
      <div>
        <input
          className=" p-2 mr-2  rounded border border-slate-200 text-sm"
          id="name"
          type="text"
          placeholder="Add your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <button
          className="bg-blue-200 p-2 rounded text-sm"
          disabled={name === ""}
          aria-label="Add Todo"
          onClick={async (event) => {
            event.preventDefault();
            setName("");
            addTodo(name);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
