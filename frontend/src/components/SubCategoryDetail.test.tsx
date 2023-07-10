import React from "react";
import {render, screen} from "@testing-library/react";
import SubCategoryDetail from "./SubCategoryDetail";
import useCategoryData from "../api/useCategoryData";
import {UseQueryResult} from "@tanstack/react-query";
import ComponentForm from "./CategoryForm";
import {CategoryData} from "../types";
import userEvent from "@testing-library/user-event";

jest.mock("../api/useCategoryData");

const mockCategoryForm = jest.fn();

jest.mock("./CategoryForm", () => (props: any) => {
  mockCategoryForm(props);
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

  test("renders the details of the sub category", async () => {
    const subCategoryDetail: CategoryData = {
      label: "Item 1",
      category: "food",
      color: "red",
      amount: 10,
      calculation: "this * that / the other",
      referenceUrls: [
        {
          url: "http://example.com",
          label: "Some reference",
        },
      ],
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
    expect(screen.getAllByText(/Item 1/i).length).toBe(2);
    expect(screen.getByText(/detailed description/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Item 1 emissions: 10.00 Tons/i)
    ).toBeInTheDocument();
    const totalDetailButton = await screen.findByText(
      "Item 1 emissions: 10.00 Tons"
    );
    // Test the dialog box
    await userEvent.click(totalDetailButton);
    expect(screen.getByText("this * that / the other")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {name: "Some reference"})
    ).toBeInTheDocument();
  });

  test("renders the category form", () => {
    const subCategoryDetail: CategoryData = {
      label: "Item 1",
      category: "food",
      color: "red",
      amount: 10,
      calculation: "this * that / the other",
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
    expect(mockCategoryForm).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryData: subCategoryDetail,
      })
    );
  });
});
