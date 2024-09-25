import React from "react";
import { render, screen } from "@testing-library/react";
import FlyingForm from "./FlyingForm";
import { UserData } from "../../types";
import userEvent from "@testing-library/user-event";

let userData: UserData = {
  name: "Some Name",
  id: 1234,
  flyingHoursPerYear: 6.8,
};

describe("the flying form", () => {
  it("renders the flying form with default user values", () => {
    render(<FlyingForm initialFormValues={userData} saveChange={() => true} />);

    expect(
      screen.getByRole("textbox", {
        name: /how many hours do you fly in a year/i,
      })
    ).toHaveValue("6.8");
  });

  it("updates the form when the Update button is pressed", async () => {
    const handleChange = jest.fn();
    const { getByRole, findByRole } = render(
      <FlyingForm initialFormValues={userData} saveChange={handleChange} />
    );
    const textbox = getByRole("textbox", {
      name: /how many hours do you fly in a year/i,
    });
    await userEvent.clear(textbox);
    await userEvent.type(textbox, "7.7");
    await userEvent.click(await findByRole("button", { name: /update/i }));
    expect(handleChange).toHaveBeenCalledWith(
      {
        flyingHoursPerYear: "7.7",
        id: 1234,
        name: "Some Name",
      },
      expect.anything()
    );
  });
});
