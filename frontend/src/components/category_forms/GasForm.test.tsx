import React from "react";
import {render, screen} from "@testing-library/react";
import GasForm from "./GasForm";
import {UserData} from "../../types";
import userEvent from "@testing-library/user-event";

let userData: UserData = {
  name: "Some Name",
  id: 1234,
  houseSize: "medium",
  gasEstimationType: "houseSize",
  numberOfPeopleInHome: 2.4,
  kwhOfGasUsedPerYear: 6.8,
  m3OfGasUsedPerYear: 99,
};

describe("the gas form", () => {
  it("renders the gas form with default user values", () => {
    userData.gasEstimationType = "kwh";
    render(<GasForm initialFormValues={userData} saveChange={() => true} />);

    expect(
      screen.getByRole("textbox", {
        name: /How many people share your home?/i,
      })
    ).toHaveValue("2.4");

    expect(
      screen.getByRole("textbox", {
        name: /Annual gas consumed/i,
      })
    ).toHaveValue("6.8");
  });

  it("renders a radio button that allows you to choose your estimation method", () => {
    userData.gasEstimationType = "houseSize";
    const {getByRole} = render(
      <GasForm initialFormValues={userData} saveChange={() => true} />
    );
    expect(getByRole("radio", {name: "House size"})).toBeChecked();
    expect(getByRole("radio", {name: "KWh"})).not.toBeChecked();
    expect(getByRole("radio", {name: "M 3"})).not.toBeChecked();
  });

  it("uses the house sizes if the house size options is picked", async () => {
    userData.gasEstimationType = "kwh";
    const handleChange = jest.fn();
    const {getByRole, findByRole} = render(
      <GasForm initialFormValues={userData} saveChange={handleChange} />
    );
    const estimationType = getByRole("radio", {name: "House size"});
    await userEvent.click(estimationType);
    expect(getByRole("radio", {name: "Small house"})).not.toBeChecked();
    expect(getByRole("radio", {name: "Medium house"})).toBeChecked();
    expect(getByRole("radio", {name: "Large house"})).not.toBeChecked();
    await userEvent.click(await findByRole("button", {name: /update/i}));
    expect(handleChange).toHaveBeenCalledWith({
      gasEstimationType: "houseSize",
      houseSize: "medium",
      numberOfPeopleInHome: 2.4,
      kwhOfGasUsedPerYear: 6.8,
      m3OfGasUsedPerYear: 99,
      id: 1234,
      name: "Some Name",
    });
  });

  it("uses the KWh measure if that option is picked", async () => {
    userData.gasEstimationType = "houseSize";
    const handleChange = jest.fn();
    const {getByRole, findByRole} = render(
      <GasForm initialFormValues={userData} saveChange={handleChange} />
    );
    const estimationType = getByRole("radio", {name: /kwh/i});
    userEvent.click(estimationType);
    const gasUsed = await findByRole("textbox", {
      name: /Annual gas consumed/i,
    });
    await userEvent.clear(gasUsed);
    await userEvent.type(gasUsed, "400");
    await userEvent.click(await getByRole("button", {name: /update/i}));
    expect(handleChange).toHaveBeenCalledWith({
      gasEstimationType: "kwh",
      houseSize: "medium",
      numberOfPeopleInHome: 2.4,
      kwhOfGasUsedPerYear: 400,
      m3OfGasUsedPerYear: 99,
      id: 1234,
      name: "Some Name",
    });
  });

  it("uses the square meters measure if that option is picked", async () => {
    userData.gasEstimationType = "houseSize";
    const handleChange = jest.fn();
    const {getByRole, findByRole} = render(
      <GasForm initialFormValues={userData} saveChange={handleChange} />
    );
    const estimationType = getByRole("radio", {name: /m 3/i});
    userEvent.click(estimationType);
    const gasUsed = await findByRole("textbox", {
      name: /Annual gas consumed/i,
    });
    await userEvent.clear(gasUsed);
    await userEvent.type(gasUsed, "500");
    await userEvent.click(await findByRole("button", {name: /update/i}));
    expect(handleChange).toHaveBeenCalledWith({
      gasEstimationType: "m3",
      houseSize: "medium",
      numberOfPeopleInHome: 2.4,
      kwhOfGasUsedPerYear: 6.8,
      m3OfGasUsedPerYear: 500,
      id: 1234,
      name: "Some Name",
    });
  });
});
