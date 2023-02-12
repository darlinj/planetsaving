import React from "react";
import {render, screen} from "@testing-library/react";
import CategoryDetail from "./CategoryDetail";
import useCategoryData from "../api/useCategoryData";
import {UseQueryResult} from "@tanstack/react-query";
import {CategoryData} from "../types";

jest.mock("../api/useCategoryData");

const mockUseCategoryDetail = useCategoryData as jest.MockedFunction<
  typeof useCategoryData
>;

describe("the detail panel", () => {
  test("it renders the loading page", () => {
    mockUseCategoryDetail.mockImplementation(() => {
      return {
        data: undefined,
        isLoading: true,
      } as UseQueryResult<CategoryData>;
    });
    render(<CategoryDetail category="some_category" />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders an error message if there is no data returned", () => {
    mockUseCategoryDetail.mockImplementation(() => {
      return {
        status: "success",
        data: undefined,
        isFetching: false,
        isLoading: false,
      } as unknown as UseQueryResult<CategoryData>;
    });
    render(<CategoryDetail category="food" />);
    expect(screen.getByText(/No category data found/i)).toBeInTheDocument();
  });

  test("renders the children of the category", () => {
    const categoryDetail: CategoryData = {
      label: "Item 1",
      category: "food",
      color: "red",
      amount: 10,
      colorIntensity: 500,
      description: "Top level desctiption",
      children: [
        {
          label: "Child Item 1",
          category: "sub food",
          color: "red",
          amount: 5,
          colorIntensity: 400,
          description: "Some description",
        },
        {
          label: "Child Item 2",
          category: "sub drink",
          color: "red",
          amount: 5,
          colorIntensity: 300,
          description: "Some description",
        },
      ],
    };
    mockUseCategoryDetail.mockImplementation(() => {
      return {
        status: "success",
        data: categoryDetail,
        isFetching: false,
        isLoading: false,
      } as UseQueryResult<CategoryData>;
    });
    render(<CategoryDetail category="food" />);
    expect(screen.getByText(/Child Item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Child Item 2/i)).toBeInTheDocument();
  });
});
