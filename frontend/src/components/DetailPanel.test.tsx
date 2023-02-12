import React from "react";
import {render, screen} from "@testing-library/react";
import DetailPanel from "./DetailPanel";
import {MemoryRouter, useParams} from "react-router-dom";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
  };
});

jest.mock("./TopLevelDetailSection", () => () => {
  return <div>Top Level Component is here</div>;
});

jest.mock("./CategoryDetail", () => () => {
  return <div>Category Level Component is here</div>;
});

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe("the detail panel", () => {
  test("By default it renders the top level description", () => {
    mockUseParams.mockImplementation(() => {
      return {};
    });
    render(<DetailPanel />, {wrapper: MemoryRouter});
    expect(
      screen.getByText(/Top Level Component is here/i)
    ).toBeInTheDocument();
  });

  test("renders the detail page if the category is supplied", () => {
    mockUseParams.mockImplementation(() => {
      return {category: "category1"};
    });
    render(<DetailPanel />, {wrapper: MemoryRouter});
    expect(
      screen.getByText(/Category Level Component is here/i)
    ).toBeInTheDocument();
  });
});
