import React from "react";
import {render, screen} from "@testing-library/react";
import DrivingForm from "./DrivingForm";
import useUserData from "../../api/useUserData";
import {UseQueryResult} from "@tanstack/react-query";
import {UserData} from "../../types";

jest.mock("../../api/useUserData");

const mockUseUserData = useUserData as jest.MockedFunction<typeof useUserData>;

describe("the driving form", () => {
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
    const userData: UserData = {
      id: 1234,
      name: "Default user",
      numberOfPeopleInHome: 3,
      kwhOfElectricityUsedPerYear: 3,
      kwhOfGasUsedPerYear: 3,
      drivingMilesPerYear: 9000,
      sizeOfCar: "Medium",
      flyingMilesPerYear: 3,
      trainMilesPerYear: 3,
      carType: "electric",
      greenEnergyTarriff: true,
      amountOfLocalFood: "some",
      amountOfOrganicFood: "some",
      percentageOfFoodWaste: 20,
    };
    mockUseUserData.mockImplementation(() => {
      return {
        status: "success",
        data: userData,
        isLoading: false,
      } as UseQueryResult<UserData>;
    });
    render(<DrivingForm />);

    expect(screen.getByRole("textbox", {name: "Yearly Mileage"})).toHaveValue(
      "9000"
    );
    const electricRadioButton = screen.getByRole("radio", {name: "Electric"});
    expect(electricRadioButton).toBeChecked();
    const sizeOfCarRadioButton = screen.getByRole("radio", {name: "Medium"});
    expect(sizeOfCarRadioButton).toBeChecked();
  });
});
