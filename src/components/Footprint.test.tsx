import React from "react";
import {render, screen} from "@testing-library/react";
import Footprint from "./Footprint";
import useFootprintData from "../api/useFootprintData";
import {UseQueryResult} from "@tanstack/react-query";
import {ClimateData} from "../types";

jest.mock("../api/useFootprintData");

test("renders the foot", () => {
  const mockUseFootprintData = useFootprintData as jest.MockedFunction<
    typeof useFootprintData
  >;
  const climateData = [
    {label: "Item 1", amount: 3, color: "#000000", subSection: null},
  ];
  mockUseFootprintData.mockImplementation(() => {
    return {
      status: "success",
      data: climateData,
      isFetching: false,
      isLoading: false,
    } as UseQueryResult<[ClimateData]>;
  });
  render(<Footprint />);
  const linkElement = screen.getByText(/Item 1/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the loading message while loading is in progress", () => {
  const mockUseFootprintData = useFootprintData as jest.MockedFunction<
    typeof useFootprintData
  >;
  mockUseFootprintData.mockImplementation(() => {
    const foo = {
      data: undefined,
      isLoading: true,
      isError: false,
      isFetching: true,
    };
    return foo as UseQueryResult<[ClimateData]>;
  });
  render(<Footprint />);
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the no data message if there is no data", () => {
  const mockUseFootprintData = useFootprintData as jest.MockedFunction<
    typeof useFootprintData
  >;
  mockUseFootprintData.mockImplementation(() => {
    const foo = {
      data: undefined,
      isLoading: false,
      isError: false,
      isFetching: false,
    };
    return foo as UseQueryResult<[ClimateData]>;
  });
  render(<Footprint />);
  const linkElement = screen.getByText(/No data/i);
  expect(linkElement).toBeInTheDocument();
});
