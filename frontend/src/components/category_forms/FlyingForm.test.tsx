import React from "react";
import {render, screen} from "@testing-library/react";
import FlyingForm from "./FlyingForm";
import {UserData} from "../../types";

let userData: UserData = {
  id: 1234,
  flyingHoursPerYear: 6.8,
};

describe("the flying form", () => {
  test("renders the flying form with default user values", () => {
    render(
      <FlyingForm
        formValues={userData}
        handleChange={() => true}
        handleChangeAndSubmit={() => true}
        submitChange={() => true}
      />
    );

    expect(
      screen.getByRole("textbox", {
        name: /how many hours do you fly in a year/i,
      })
    ).toHaveValue("6.8");
  });
});
