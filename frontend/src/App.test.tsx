import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

jest.mock("./components/ActionsList", () => () => {
  return <div data-testid="actions_list" />;
});

jest.mock("./components/Footprint", () => () => {
  return <div data-testid="footprint" />;
});

test("renders the front page", () => {
  render(<App />);
  const linkElement = screen.getByText(/planet saving expert/i);
  expect(linkElement).toBeInTheDocument();
});
