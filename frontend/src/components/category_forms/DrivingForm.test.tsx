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

// useAddOrUpdateUser.mockResolvedValue({mutate: () => "foo"});

let initialFormValues: UserData = {
  id: 1234,
  name: "Default user",
  drivingMilesPerYear: 8000,
  sizeOfCar: "medium",
  carType: "ICE",
};

describe("the driving form", () => {
  beforeEach(() => {
    mockMutate.mockClear();
  });

  test("renders the driving form with default user values", () => {
    const saveChange = jest.fn();
    render(
      <DrivingForm
        initialFormValues={initialFormValues}
        saveChange={saveChange}
      />
    );

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
    const saveChange = jest.fn();
    render(
      <DrivingForm
        initialFormValues={initialFormValues}
        saveChange={saveChange}
      />
    );

    const mileageBox = await screen.findByRole("textbox", {
      name: "Yearly Mileage",
    });

    await userEvent.clear(mileageBox);
    await userEvent.type(mileageBox, "{selectall}9000");
    await userEvent.click(
      await screen.findByRole("radiogroup", {name: "Size of car"})
    );
    await userEvent.click(screen.getByRole("button", {name: /update/i}));
    expect(saveChange).toHaveBeenCalled();
    expect(saveChange.mock.calls[0][0]?.drivingMilesPerYear).toBe("9000");
  });

  test("It updates the user when the car type is changed", async () => {
    const saveChange = jest.fn();
    render(
      <DrivingForm
        initialFormValues={initialFormValues}
        saveChange={saveChange}
      />
    );

    const radioButton = await screen.findByLabelText("Electric");
    await userEvent.click(radioButton);
    await userEvent.click(await screen.findByRole("button", {name: /update/i}));
    expect(saveChange).toHaveBeenCalled();
    expect(saveChange.mock.calls[0][0]?.carType).toBe("electric");
  });
});
