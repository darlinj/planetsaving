import React from "react";
import {render, screen} from "@testing-library/react";
import ActionList from "./ActionsList";
import useActionsList from "../api/useActionsList";
import {UseQueryResult} from "@tanstack/react-query";
import {ActionData} from "../types";

jest.mock("../api/useActionsList");

test("renders the loading message", () => {
  const mockUseActionsList = useActionsList as jest.MockedFunction<
    typeof useActionsList
  >;
  const actionsList: ActionData[] = [
    {
      actionTitle: "Reduce your thermostat by ten degree",
      id: 123,
      actionType: "energy",
      carbonSaved: 3.0,
      cost: 6.0,
    },
  ];
  mockUseActionsList.mockImplementation(() => {
    return {
      isLoading: true,
    } as UseQueryResult<[ActionData]>;
  });
  render(<ActionList />);
  const element = screen.getByText(/Loading.../i);
  expect(element).toBeInTheDocument();
});

test("renders the foot", () => {
  const mockUseActionsList = useActionsList as jest.MockedFunction<
    typeof useActionsList
  >;
  const actionsList: ActionData[] = [
    {
      actionTitle: "Reduce your thermostat by ten degree",
      id: 123,
      actionType: "energy",
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
