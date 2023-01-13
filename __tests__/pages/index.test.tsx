import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "../../src/pages/index";

interface CreateRequestBody {
  values: {
    name: string;
  };
}

const server = setupServer(
  rest.post<CreateRequestBody>(
    "https://altogic.com/_api/rest/v1/db/create",
    async (req, res, ctx) => {
      const { name } = (await req.json()).values;

      return res(
        ctx.json({
          createdAt: "2023-01-13T12:00:22.053Z",
          dateTime: "2023-01-18T12:00:22.056Z",
          name,
          status: false,
          updatedAt: "2023-01-13T12:00:22.053Z",
          _id: "1",
        })
      );
    }
  ),
  rest.post(
    "https://altogic.com/_api/rest/v1/db/object/delete",
    async (req, res, ctx) => {
      return res(ctx.status(200));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const todos = [
  {
    createdAt: "2023-01-13T12:00:22.053Z",
    dateTime: "2023-01-18T12:00:22.056Z",
    name: "first item",
    status: false,
    updatedAt: "2023-01-13T12:00:22.053Z",
    _id: "1",
  },
  {
    createdAt: "2023-01-13T12:00:22.053Z",
    dateTime: "2023-01-18T12:00:22.056Z",
    name: "second item",
    status: false,
    updatedAt: "2023-01-13T12:00:22.053Z",
    _id: "2",
  },
];

test("should be able to display a list of todos", async () => {
  render(<Home todos={todos} />);

  expect(screen.getByText(todos[0].name)).toBeInTheDocument();
  expect(screen.getByText(todos[1].name)).toBeInTheDocument();
});

test("should be able to add a todo to the list", async () => {
  render(<Home todos={[]} />);

  const todoName = "my todo";
  const button = screen.getByRole("button", { name: "Add Todo" });

  await userEvent.type(screen.getByPlaceholderText("Add your name"), todoName);

  expect(button).not.toBeDisabled();

  await userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(todoName)).toBeInTheDocument();
  });
});

test("should be able to delete a todo from the list", async () => {
  render(<Home todos={todos} />);

  expect(screen.getByText(todos[0].name)).toBeInTheDocument();
  expect(screen.getByText(todos[1].name)).toBeInTheDocument();

  await userEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);

  await waitFor(() => {
    expect(screen.queryByText(todos[0].name)).not.toBeInTheDocument();
  });
});
