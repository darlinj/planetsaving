import React from "react";
import {render, screen} from "@testing-library/react";
import DetailPanel from "./DetailPanel";
// import useCategoryDetail from "../api/useCategoryDetail";
// import {UseQueryResult} from "@tanstack/react-query";
// import {ClimateData} from "../types";
import {MemoryRouter} from "react-router-dom";

// jest.mock("../api/useCategoryDetail");

test("By default it renders the top level description", () => {
  render(<DetailPanel />, {wrapper: MemoryRouter});
  expect(screen.getByText(/What it means/i)).toBeInTheDocument();
});

test("renders the detail page if the category is supplied", () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      category: "someCategory",
    }),
  }));
  //   const mockUseCategoryDetail = useCategoryDetail as jest.MockedFunction<
  //     typeof useCategoryDetail
  //   >;
  //   const categoryDetail = [{label: "Item 1"}];
  //   mockUseCategoryDetail.mockImplementation(() => {
  //     return {
  //       status: "success",
  //       data: categoryDetail,
  //       isFetching: false,
  //       isLoading: false,
  //     } as UseQueryResult<[CategoryDetail]>;
  //   });
  render(<DetailPanel />, {wrapper: MemoryRouter});
  expect(screen.findByText(/someCategory/i)).toBeInTheDocument();
});
