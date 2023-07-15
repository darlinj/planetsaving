import React from "react";
import {render, screen} from "@testing-library/react";
import DrivingForm from "./DrivingForm";
import useUserData from "../../api/useUserData";
import useAddOrUpdateUser from "../../api/useAddOrUpdateUser";
import {UseQueryResult} from "@tanstack/react-query";
import {UserData} from "../../types";
import userEvent from "@testing-library/user-event";

const mockMutate = jest.fn(() => {
  return "chicklet";
});

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => ({
    invalidateQueries: jest.fn().mockReturnValue(true),
  }),
}));

jest.mock("../../api/useUserData");
jest.mock("../../api/useAddOrUpdateUser", () => () => {
  return {mutate: mockMutate};
});

const mockUseUserData = useUserData as jest.MockedFunction<typeof useUserData>;
const mockAddOrUpdateUser = useAddOrUpdateUser as jest.MockedFunction<
  typeof useAddOrUpdateUser
>;

let userData: UserData = {
  id: 1234,
  name: "Default user",
  numberOfPeopleInHome: 3,
  kwhOfElectricityUsedPerYear: 3,
  kwhOfGasUsedPerYear: 3,
  drivingMilesPerYear: 8000,
  sizeOfCar: "medium",
  flyingMilesPerYear: 3,
  trainMilesPerYear: 3,
  carType: "ICE",
  greenEnergyTarriff: true,
  amountOfLocalFood: "some",
  amountOfOrganicFood: "some",
  percentageOfFoodWaste: 20,
};

describe("the driving form", () => {
  beforeEach(() => {
    mockMutate.mockClear();
  });
  test("it renders the loading page", () => {
    mockUseUserData.mockImplementation(() => {
      return {
        data: undefined,
        isLoading: true,
      } as UseQueryResult<UserData>;
    });
    render(<DrivingForm />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders an error message if there is no data returned", () => {
    mockUseUserData.mockImplementation(() => {
      return {
        status: "success",
        data: undefined,
        isFetching: false,
        isLoading: false,
      } as unknown as UseQueryResult<UserData>;
    });
    render(<DrivingForm />);
    expect(screen.getByText(/No user data found/i)).toBeInTheDocument();
  });

  test("renders the driving form with default user values", () => {
    mockUseUserData.mockImplementation(() => {
      return {
        status: "success",
        data: userData,
        isLoading: false,
      } as UseQueryResult<UserData>;
    });
    render(<DrivingForm />);

    expect(screen.getByRole("textbox", {name: "Yearly Mileage"})).toHaveValue(
      "8000"
    );
    const electricRadioButton = screen.getByRole("radio", {
      name: "Petrol or Diesel",
    });
    expect(electricRadioButton).toBeChecked();
    const sizeOfCarRadioButton = screen.getByRole("radio", {name: "Medium"});
    expect(sizeOfCarRadioButton).toBeChecked();
  });

  test("It updates the user when the mileage is changed", async () => {
    mockUseUserData.mockImplementation(() => {
      return {
        status: "success",
        data: userData,
        isLoading: false,
      } as UseQueryResult<UserData>;
    });
    render(<DrivingForm />);
    await userEvent.type(
      await screen.findByRole("textbox", {name: "Yearly Mileage"}),
      "{selectall}9000"
    );
    await userEvent.click(
      await screen.findByRole("radiogroup", {name: "Size of car"})
    );
    // jest.runOnlyPendingTimers();
    expect(mockMutate).toHaveBeenCalled();
    expect(mockMutate.mock.calls[0][0]?.drivingMilesPerYear).toBe(9000);
  });

  test("It updates the user when the car type is changed", async () => {
    mockUseUserData.mockImplementation(() => {
      return {
        status: "success",
        data: userData,
        isLoading: false,
      } as UseQueryResult<UserData>;
    });
    render(<DrivingForm />);

    const radioButton = await screen.findByLabelText("Electric");
    await userEvent.click(radioButton);
    expect(mockMutate).toHaveBeenCalled();
    expect(mockMutate.mock.calls[0][0]?.carType).toBe("electric");
  });
});
