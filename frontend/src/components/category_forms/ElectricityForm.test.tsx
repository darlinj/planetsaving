import React from "react";
import {render, screen} from "@testing-library/react";
import ElectricityForm from "./ElectricityForm";
import {UserData} from "../../types";
import userEvent from "@testing-library/user-event";

const userData: UserData = {
  name: "Some Name",
  id: 1234,
  houseSize: "medium",
  electricityEstimationType: "houseSize",
  numberOfPeopleInHome: 2.4,
  kwhOfElectricityUsedPerYear: 6.8,
};

describe("the electricity form", () => {
  it("renders the electricity form with default user values", () => {
    userData.electricityEstimationType = "kwh";
    render(
      <ElectricityForm initialFormValues={userData} saveChange={() => true} />
    );

    expect(
      screen.getByRole("textbox", {
        name: /How many people share your home?/i,
      })
    ).toHaveValue("2.4");

    expect(
      screen.getByRole("textbox", {
        name: /Annual electricity consumed/i,
      })
    ).toHaveValue("6.8");
  });

  it("renders a radio button that allows you to choose your estimation method", () => {
    userData.electricityEstimationType = "houseSize";
    const {getByRole} = render(
      <ElectricityForm initialFormValues={userData} saveChange={() => true} />
    );
    expect(getByRole("radio", {name: "House size"})).toBeChecked();
    expect(getByRole("radio", {name: "KWh"})).not.toBeChecked();
  });

  it("uses the house sizes if the house size options is picked", async () => {
    userData.electricityEstimationType = "kwh";
    const handleChange = jest.fn();
    const {getByRole, findByRole} = render(
      <ElectricityForm initialFormValues={userData} saveChange={handleChange} />
    );
    const estimationType = getByRole("radio", {name: "House size"});
    await userEvent.click(estimationType);
    expect(getByRole("radio", {name: "Small house"})).not.toBeChecked();
    expect(getByRole("radio", {name: "Medium house"})).toBeChecked();
    expect(getByRole("radio", {name: "Large house"})).not.toBeChecked();
    await userEvent.click(await findByRole("button", {name: /update/i}));
    expect(handleChange).toHaveBeenCalledWith({
      electricityEstimationType: "houseSize",
      houseSize: "medium",
      numberOfPeopleInHome: 2.4,
      kwhOfElectricityUsedPerYear: 6.8,
      id: 1234,
      name: "Some Name",
    });
  });

  it("uses the KWh measure if that option is picked", async () => {
    userData.electricityEstimationType = "houseSize";
    const handleChange = jest.fn();
    const {getByRole, findByRole} = render(
      <ElectricityForm initialFormValues={userData} saveChange={handleChange} />
    );
    const estimationType = getByRole("radio", {name: /kwh/i});
    userEvent.click(estimationType);
    const electricityUsed = await findByRole("textbox", {
      name: /Annual electricity consumed/i,
    });
    await userEvent.clear(electricityUsed);
    await userEvent.type(electricityUsed, "400");
    await userEvent.click(await getByRole("button", {name: /update/i}));
    expect(handleChange).toHaveBeenCalledWith({
      electricityEstimationType: "kwh",
      houseSize: "medium",
      numberOfPeopleInHome: 2.4,
      kwhOfElectricityUsedPerYear: "400",
      id: 1234,
      name: "Some Name",
    });
  });
});
