import React from "react";
import {render, screen} from "@testing-library/react";
import SubCategoryDetail from "./SubCategoryDetail";
import useCategoryData from "../api/useCategoryData";
import {UseQueryResult} from "@tanstack/react-query";
import {CategoryData} from "../types";

jest.mock("../api/useCategoryData");

const mockUseCategoryDetail = useCategoryData as jest.MockedFunction<
  typeof useCategoryData
>;

describe("the sub category detail panel", () => {
  test("it renders the loading page", () => {
    mockUseCategoryDetail.mockImplementation(() => {
      return {
        data: undefined,
        isLoading: true,
      } as UseQueryResult<CategoryData>;
    });
    render(<SubCategoryDetail subCategory="some_category" />);
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
    render(<SubCategoryDetail subCategory="food" />);
    expect(screen.getByText(/No sub category data found/i)).toBeInTheDocument();
  });

  test("renders the details of the sub category", () => {
    const subCategoryDetail: CategoryData = {
      label: "Item 1",
      category: "food",
      color: "red",
      amount: 10,
      colorIntensity: 500,
      description: "Top level description",
    };
    mockUseCategoryDetail.mockImplementation(() => {
      return {
        status: "success",
        data: subCategoryDetail,
        isFetching: false,
        isLoading: false,
      } as UseQueryResult<CategoryData>;
    });
    render(<SubCategoryDetail subCategory="food" />);
    expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Top level description/i)).toBeInTheDocument();
  });
});
