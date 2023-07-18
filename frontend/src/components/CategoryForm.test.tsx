import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import CategoryForm from "./CategoryForm";
import {MemoryRouter} from "react-router-dom";
import Cookies from "js-cookie";
import * as useUserData from "../api/useUserData";
import useAddOrUpdateUser from "../api/useAddOrUpdateUser";
import userEvent from "@testing-library/user-event";

const mockForm = jest.fn();
jest.mock("./category_forms/FlyingForm", () => (props) => {
  mockForm(props);
  return (
    <div>
      Some form
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.saveChange({some: "data"});
        }}
      >
        <label htmlFor="myTextbox">Number of flights</label>
        <input
          onChange={props.handleChange}
          id="myTextbox"
          name="flights"
          type="text"
        />
        <button onClick={props.submitChange}>Submit Me</button>
      </form>
    </div>
  );
});

jest.mock("js-cookie");
jest.mock("../api/useUserData");

jest.mock("../api/useAddOrUpdateUser");

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

const categoryData = {
  category: "flying",
  label: "some label",
  color: "blue",
  amount: 10,
  calculation: "Some calc",
  referenceUrls: [{url: "someurl", label: "some label"}],
  colorIntensity: 9,
  description: "Some category",
  detailed_description: "Some detailed description",
};

describe("Displaying the category forms", () => {
  beforeEach(() => {
    (useUserData.default as jest.Mock).mockReturnValue({
      data: {some: "Data"},
      isLoading: false,
      isError: false,
    });
    (useAddOrUpdateUser as jest.Mock).mockReturnValue({
      mutate: () => true,
      isLoading: false,
      isError: false,
    });
  });
  it("shows the expected form based on the category type", () => {
    render(<CategoryForm categoryData={categoryData} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText("Some form")).toBeInTheDocument();
  });

  it("looks up the user id in a cookie", () => {
    (Cookies.get as jest.Mock).mockReturnValue("123");
    render(<CategoryForm categoryData={categoryData} />, {
      wrapper: MemoryRouter,
    });
    expect(useUserData.default).toHaveBeenCalledWith(123);
  });

  it("returns a loading thing when the userdata is loading", () => {
    (useUserData.default as jest.Mock).mockReturnValue({
      data: {some: "Data"},
      isLoading: true,
      isError: false,
    });
    render(<CategoryForm categoryData={categoryData} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("returns an error if the userdata fails to load", () => {
    (useUserData.default as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
    });
    render(<CategoryForm categoryData={categoryData} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText("No user data found")).toBeInTheDocument();
  });

  it("returns an error if the userdata returns an error", () => {
    (useUserData.default as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
    });
    render(<CategoryForm categoryData={categoryData} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
  });

  it("passes the right stuff to the form", () => {
    mockForm.mockReset();
    (useUserData.default as jest.Mock).mockReturnValue({
      data: {someSpecial: "Data"},
      isLoading: false,
      isError: false,
    });
    render(<CategoryForm categoryData={categoryData} />, {
      wrapper: MemoryRouter,
    });
    expect(mockForm).toBeCalled();
    expect(mockForm.mock.calls[0][0].initialFormValues).toEqual({
      someSpecial: "Data",
    });
  });

  it("mutates the form data when save is called from the child form", () => {
    const mockMutate = jest.fn();
    (useAddOrUpdateUser as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
    });
    render(<CategoryForm categoryData={categoryData} />, {
      wrapper: MemoryRouter,
    });
    const button = screen.getByRole("button", {name: /Submit Me/i});
    fireEvent.click(button);
    expect(mockMutate).toHaveBeenCalledWith({
      some: "data",
    });
  });
});
