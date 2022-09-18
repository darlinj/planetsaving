import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

test("renders the front page", () => {
  render(<App />);
  const linkElement = screen.getByText(/planet saving expert/i);
  expect(linkElement).toBeInTheDocument();
});
