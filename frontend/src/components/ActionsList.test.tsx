import React from "react";
import {render, screen} from "@testing-library/react";
import ActionList from "./ActionsList";
import useActionsList from "../api/useActionsList";
import {UseQueryResult} from "@tanstack/react-query";
import {ActionData} from "../types";
import {MemoryRouter} from "react-router-dom";

jest.mock("../api/useActionsList");

const mockUseActionsList = useActionsList as jest.MockedFunction<
  typeof useActionsList
>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    category: "someCategory",
  }),
}));

describe("The actions list", () => {
  it("renders the loading message", () => {
    mockUseActionsList.mockImplementation(() => {
      return {
        isLoading: true,
      } as UseQueryResult<[ActionData]>;
    });
    render(<ActionList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders the actions", () => {
    const actionsList: ActionData[] = [
      {
        title: "Reduce your thermostat by ten degree",
        id: 123,
        category: {
          category: "food",
          label: "Food",
          amount: 2,
          description: "some description",
          detailed_description: "some detailed description",
          color: "red",
          colorIntensity: 300,
        },
        carbonSaved: 3.0,
        cost: 6.0,
      },
    ];
    mockUseActionsList.mockImplementation(() => {
      return {
        status: "success",
        data: actionsList,
        isFetching: false,
        isLoading: false,
      } as UseQueryResult<[ActionData]>;
    });
    render(<ActionList />);
    const element = screen.getByText(/Reduce your thermostat by ten degree/i);
    expect(element).toBeInTheDocument();
  });

  it("If the category is supplied then it only shows the actions attached to that category", () => {
    mockUseActionsList.mockImplementation(() => {
      return {
        status: "success",
        data: [{id: 123}],
        isFetching: false,
        isLoading: false,
      } as UseQueryResult<[ActionData]>;
    });
    render(
      <MemoryRouter initialEntries={["/f/category?foo=bar"]}>
        <ActionList />
      </MemoryRouter>
    );
    expect(mockUseActionsList.mock.calls[0][0]).toBe("someCategory");
  });
});
