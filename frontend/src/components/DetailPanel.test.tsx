import React from "react";
import {render, screen} from "@testing-library/react";
import DetailPanel from "./DetailPanel";
import useCategoryData from "../api/useCategoryData";
import {UseQueryResult} from "@tanstack/react-query";
import {CategoryData} from "../types";
import {MemoryRouter, useParams} from "react-router-dom";

jest.mock("../api/useCategoryData");

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
  };
});

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe("the detail panel", () => {
  test("By default it renders the top level description", () => {
    mockUseParams.mockImplementationOnce(() => {
      return {};
    });
    render(<DetailPanel />, {wrapper: MemoryRouter});
    expect(screen.getByText(/What it means/i)).toBeInTheDocument();
  });

  test("renders the detail page if the category is supplied", () => {
    mockUseParams.mockImplementationOnce(() => {
      return {category: "category1"};
    });
    const mockUseCategoryDetail = useCategoryData as jest.MockedFunction<
      typeof useCategoryData
    >;
    const categoryDetail: CategoryData = {
      label: "Item 1",
      category: "food",
      color: "red",
      colorIntensity: 500,
    };
    mockUseCategoryDetail.mockImplementation(() => {
      return {
        status: "success",
        data: categoryDetail,
        isFetching: false,
        isLoading: false,
      } as UseQueryResult<CategoryData>;
    });
    render(<DetailPanel />, {wrapper: MemoryRouter});
    expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
  });
});
