import React from "react";
import {render, screen} from "@testing-library/react";
import GasForm from "./GasForm";
import {UserData} from "../../types";
import userEvent from "@testing-library/user-event";

let userData: UserData = {
  name: "Some Name",
  id: 1234,
  numberOfPeopleInHome: 2.4,
  kwhOfGasUsedPerYear: 6.8,
};

describe("the gas form", () => {
  it("renders the gas form with default user values", () => {
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

  it("updates the form when the Update button is pressed", () => {
    // const handleSubmit = jest.fn();
    const handleChange = jest.fn();
    const {getByRole} = render(
      <GasForm initialFormValues={userData} saveChange={handleChange} />
    );
    const people = getByRole("textbox", {
      name: /How many people share your home/i,
    });
    userEvent.clear(people);
    userEvent.type(people, "4");
    const gasUsed = getByRole("textbox", {
      name: /Annual gas consumed/i,
    });
    userEvent.clear(gasUsed);
    userEvent.type(gasUsed, "400");
    userEvent.click(getByRole("button", {name: /update/i}));
    expect(handleChange).toHaveBeenCalledWith({
      numberOfPeopleInHome: "4",
      kwhOfGasUsedPerYear: "400",
      id: 1234,
      name: "Some Name",
    });
  });
});
