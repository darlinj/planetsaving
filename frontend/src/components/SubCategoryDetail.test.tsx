import React from "react";
import {render, screen} from "@testing-library/react";
import SubCategoryDetail from "./SubCategoryDetail";
import useCategoryData from "../api/useCategoryData";
import {UseQueryResult} from "@tanstack/react-query";
import ComponentForm from "./CategoryForm";
import {CategoryData} from "../types";

jest.mock("../api/useCategoryData");

// jest.mock("./CategoryForm", () => () => {
//   return <div data-testid="component-form" />;
// });

const mockCatoegoryForm = jest.fn();

jest.mock("./CategoryForm", () => (props: any) => {
  mockCatoegoryForm(props);
  return <div data-testid="component-form" />;
});

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
      detailed_description: "detailed description",
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
    expect(screen.getByText(/detailed description/i)).toBeInTheDocument();
  });

  test("renders the category form", () => {
    const subCategoryDetail: CategoryData = {
      label: "Item 1",
      category: "food",
      color: "red",
      amount: 10,
      colorIntensity: 500,
      description: "Top level description",
      detailed_description: "detailed description",
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
    expect(screen.getByTestId("component-form")).toBeInTheDocument();
    expect(mockCatoegoryForm).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryData: subCategoryDetail,
      })
    );
  });
});
