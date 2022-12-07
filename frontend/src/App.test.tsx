import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";
import {BrowserRouter, MemoryRouter} from "react-router-dom";

jest.mock("./components/ActionsList", () => () => {
  return <div data-testid="actions_list" />;
});

jest.mock("./components/Footprint", () => () => {
  return <div data-testid="footprint" />;
});

test("renders the front page", () => {
  render(<App />, {wrapper: BrowserRouter});
  const linkElement = screen.getByText(/planet saving expert/i);
  expect(linkElement).toBeInTheDocument();
});
