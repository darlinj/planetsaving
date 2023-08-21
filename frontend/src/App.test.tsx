import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

jest.mock("./components/ActionsList", () => () => {
  return <div data-testid="actions_list" />;
});

jest.mock("./components/MainContent", () => () => {
  return <div data-testid="main-content">Main Content</div>;
});

test("renders the front page", () => {
  render(<App />, {wrapper: BrowserRouter});
  expect(screen.getByText(/planet saving expert/i)).toBeInTheDocument();
  expect(screen.getByText(/Main content/i)).toBeInTheDocument();
});
