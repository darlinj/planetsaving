import React from "react";
import {render, screen} from "@testing-library/react";
import TopLevelDetailSection from "./TopLevelDetailSection";
import useFootprintData from "../api/useFootprintData";
import {UseQueryResult} from "@tanstack/react-query";
import {CategoryData, ClimateData} from "../types";
import {MemoryRouter, useParams} from "react-router-dom";

jest.mock("../api/useFootprintData");

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => {
      return {};
    },
  };
});

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe("the top level panel", () => {
  test("renders the top level panel page", () => {
    const mockUseFootprintData = useFootprintData as jest.MockedFunction<
      typeof useFootprintData
    >;
    const footprintData: ClimateData[] = [
      {
        label: "Item 1",
        category: "food",
        color: "red",
        colorIntensity: 500,
        amount: 4,
        description: "some description",
        detailed_description: "some detail",
      },
    ];
    mockUseFootprintData.mockImplementation(() => {
      return {
        status: "success",
        data: footprintData,
        isFetching: false,
        isLoading: false,
      } as UseQueryResult<[ClimateData]>;
    });
    render(<TopLevelDetailSection />, {wrapper: MemoryRouter});
    expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/some description/i)).toBeInTheDocument();
  });
});
