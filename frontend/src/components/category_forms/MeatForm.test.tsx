import React from "react";
import { render, screen } from "@testing-library/react";
import MeatForm from "./MeatForm";
import { UserData } from "../../types";
import userEvent from "@testing-library/user-event";

const userData: UserData = {
  name: "Some Name",
  id: 1234,
  meatEstimationType: "meals",
  beefMealsPerWeek: 2,
  porkMealsPerWeek: 2,
  lambMealsPerWeek: 2,
  chickenMealsPerWeek: 2,
  cheeseMealsPerWeek: 6,
};

describe("the meat form", () => {
  it("renders the meat form with default user values", () => {
    userData.meatEstimationType = "meals";
    render(<MeatForm initialFormValues={userData} saveChange={() => true} />);

    expect(
      screen.getByRole("textbox", {
        name: /Number of meals per week containing beef/i,
      })
    ).toHaveValue("2");

    expect(
      screen.getByRole("textbox", {
        name: /Number of meals per week containing lamb/i,
      })
    ).toHaveValue("2");

    expect(
      screen.getByRole("textbox", {
        name: /Number of meals per week containing pork/i,
      })
    ).toHaveValue("2");

    expect(
      screen.getByRole("textbox", {
        name: /Number of meals per week containing chicken/i,
      })
    ).toHaveValue("2");
    expect(
      screen.getByRole("textbox", {
        name: /Number of meals per week containing cheese/i,
      })
    ).toHaveValue("6");
  });

  it("renders a radio button that allows you to choose your estimation method", () => {
    userData.meatEstimationType = "meals";
    const { getByRole } = render(
      <MeatForm initialFormValues={userData} saveChange={() => true} />
    );
    expect(getByRole("radio", { name: "Meal based" })).toBeChecked();
    expect(getByRole("radio", { name: "Weight" })).not.toBeChecked();
  });

  it("uses the meals options if that option is picked", async () => {
    userData.meatEstimationType = "weight";
    const handleChange = jest.fn();
    const { getByRole, findByRole } = render(
      <MeatForm initialFormValues={userData} saveChange={handleChange} />
    );
    const estimationType = getByRole("radio", { name: "Meal based" });
    await userEvent.click(estimationType);
    expect(
      getByRole("textbox", { name: /containing beef/i })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { name: /containing lamb/i })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { name: /containing pork/i })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { name: /containing chicken/i })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { name: /containing cheese/i })
    ).toBeInTheDocument();
    await userEvent.click(await findByRole("button", { name: /update/i }));
    expect(handleChange).toHaveBeenCalledWith(
      {
        meatEstimationType: "meals",
        beefMealsPerWeek: 2,
        porkMealsPerWeek: 2,
        lambMealsPerWeek: 2,
        chickenMealsPerWeek: 2,
        cheeseMealsPerWeek: 6,
        id: 1234,
        name: "Some Name",
      },
      expect.anything()
    );
  });

  it("uses the weight options if that option is picked", async () => {
    userData.meatEstimationType = "meals";
    const handleChange = jest.fn();
    const { getByRole, findByRole } = render(
      <MeatForm initialFormValues={userData} saveChange={handleChange} />
    );
    const estimationType = getByRole("radio", { name: "Weight" });
    await userEvent.click(estimationType);
    expect(
      getByRole("textbox", { name: /beef consumed/i })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { name: /lamb consumed/i })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { name: /pork consumed/i })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { name: /chicken consumed/i })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { name: /cheese consumed/i })
    ).toBeInTheDocument();
    await userEvent.click(await findByRole("button", { name: /update/i }));
    expect(handleChange).toHaveBeenCalledWith(
      {
        meatEstimationType: "weight",
        beefMealsPerWeek: 2,
        porkMealsPerWeek: 2,
        lambMealsPerWeek: 2,
        chickenMealsPerWeek: 2,
        cheeseMealsPerWeek: 6,
        id: 1234,
        name: "Some Name",
      },
      expect.anything()
    );
  });
});
