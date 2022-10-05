import React from "react";
import {render, screen} from "@testing-library/react";
import Footprint from "./Footprint";

jest.mock("../api/useFootprintData", () => () => {
  const climateData = [
    {label: "Item 1", amount: 3, color: "#000000", subSection: null},
  ];
  return {status: "success", data: climateData};
});

test("renders the foot", () => {
  render(<Footprint />);
  const linkElement = screen.getByText(/Item 1/i);
  expect(linkElement).toBeInTheDocument();
});
