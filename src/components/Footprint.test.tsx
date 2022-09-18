import React from "react";
import {render, screen} from "@testing-library/react";
import Footprint from "./Footprint";
import {ClimateData} from "../types";

test("renders the foot", () => {
  const climateData: ClimateData[] = [
    {label: "Item 1", amount: 3, color: "#000000", subSection: null},
  ];
  render(<Footprint data={climateData} />);
  const linkElement = screen.getByText(/Item 1/i);
  expect(linkElement).toBeInTheDocument();
});
