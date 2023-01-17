import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";

import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home, { getServerSideProps, HomeProps } from "../../src/pages/index";
import { todos } from "../../__data__/todos";
import { notDeepEqual } from "assert";

const server = setupServer(
  rest.post(
    "https://altogic.com/_api/rest/v1/db/get-list",
    async (req, res, ctx) => {
      return res(ctx.json(todos));
    }
  ),
  rest.post<{
    values: {
      name: string;
    };
  }>("https://altogic.com/_api/rest/v1/db/create", async (req, res, ctx) => {
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
  }),
  rest.post(
    "https://altogic.com/_api/rest/v1/db/object/delete",
    async (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.post(
    "https://altogic.com/_api/rest/v1/db/object/update",
    async (req, res, ctx) => {
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
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const getProps = async () => {
  const { props } = (await getServerSideProps(
    {} as GetServerSidePropsContext
  )) as { props: HomeProps };
  return props;
};

test("should be able to display a list of todos", async () => {
  const props = await getProps();

  render(<Home {...props} />);

  expect(screen.getByText(props.todos[0].name)).toBeInTheDocument();
  expect(screen.getByText(props.todos[1].name)).toBeInTheDocument();
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
  const props = await getProps();

  render(<Home todos={todos} />);

  expect(screen.getByText(props.todos[0].name)).toBeInTheDocument();
  expect(screen.getByText(props.todos[1].name)).toBeInTheDocument();

  await userEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);

  await waitFor(() => {
    expect(screen.queryByText(props.todos[0].name)).not.toBeInTheDocument();
  });
});

test("should be able to change the status of a todo", async () => {
  const props = await getProps();

  render(<Home todos={todos} />);

  const checkboxLabel = `${props.todos[0].name} On selection the status will be changed.`;

  expect(screen.getByLabelText(checkboxLabel)).not.toBeChecked();

  await userEvent.click(screen.getByLabelText(checkboxLabel));

  expect(screen.getByLabelText(checkboxLabel)).toBeChecked();
});
