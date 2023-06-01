const emissionsCalculator = require("./emissionsCalculator");

describe("the emissions calculation", () => {
  it("working out the amount for a single single emission", async () => {
    const emissions = [{dataValues: {totalCarbonEmited: 10}}];
    const totalEmissions =
      emissionsCalculator.calculateEmissionsForLeafCategory(emissions);
    expect(totalEmissions).toEqual(10);
  });

  it("working out the amount for multiple emissions", async () => {
    const emissions = [
      {dataValues: {totalCarbonEmited: 5}},
      {dataValues: {totalCarbonEmited: 10}},
    ];
    const totalEmissions =
      emissionsCalculator.calculateEmissionsForLeafCategory(emissions);
    expect(totalEmissions).toEqual(15);
  });

  describe("Testing a simple calculation", () => {
    it("calculate the tail pipe emissions for a simple multiplier", () => {
      const emissions = [
        {
          dataValues: {
            calculationIdentifier: "simple_multiplier_by_2",
          },
        },
      ];
      const user = {userValueToMultiply: 10};
      const totalEmissions =
        emissionsCalculator.calculateEmissionsForLeafCategory(emissions, user);
      expect(Math.round(totalEmissions * 100) / 100).toEqual(20);
    });
  });
});

describe("returning the text based calculation", () => {
  it("returns a calc even if the label is not set", () => {
    const category = {
      children: [],
    };

    const calculation = emissionsCalculator.getCalculation(category, {});
    expect(calculation).toEqual("Category has data problems!");
  });

  it("returns a calculation for a leaf category", () => {
    const category = {
      children: [],
      label: "Food",
    };

    const calculation = emissionsCalculator.getCalculation(category, {});
    expect(calculation).toEqual("No emissions associated with Food category");
  });

  it("returns the calculations for all children if there are children", () => {
    const category = {
      children: [{label: "Food"}, {label: "Beer"}],
    };

    const calculation = emissionsCalculator.getCalculation(category, {});
    expect(calculation).toEqual(
      "No emissions associated with Food category + No emissions associated with Beer category"
    );
  });

  it("returns the calculation for a leaf category with a single emission", () => {
    const category = {
      label: "Food",
      emissions: [{dataValues: {label: "Cabbages", totalCarbonEmited: 10}}],
      children: [],
    };

    const calculation = emissionsCalculator.getCalculation(category, {});
    expect(calculation).toEqual("10 Tons emitted by Cabbages");
  });

  it("returns the calculations for a leaf category with a multiple emission", () => {
    const category = {
      label: "Food",
      emissions: [
        {dataValues: {label: "Cabbages", totalCarbonEmited: 10}},
        {dataValues: {label: "Potatoes", totalCarbonEmited: 5}},
      ],
      children: [],
    };

    const calculation = emissionsCalculator.getCalculation(category, {});
    expect(calculation).toEqual(
      "10 Tons emitted by Cabbages + 5 Tons emitted by Potatoes"
    );
  });

  it("works out the calculation using the specified calculation identifier if supplied", () => {
    const category = {
      label: "Food",
      emissions: [
        {
          dataValues: {
            label: "Cabbages",
            totalCarbonEmited: 10,
            calculationIdentifier: "simple_multiplier_by_2",
          },
        },
      ],
      children: [],
    };

    const calculation = emissionsCalculator.getCalculation(category, {});
    expect(calculation).toEqual("10 Tons emitted by Cabbages");
  });
});

describe("the category calculation", () => {
  it("working out the amount for a single category with a single emission", async () => {
    const category = {
      emissions: [{dataValues: {totalCarbonEmited: 10}}],
      children: [],
    };
    const totalEmissions =
      emissionsCalculator.calculateCategoryAmount(category);
    expect(totalEmissions).toEqual(10);
  });

  it("working out the amount for a single category with multiple emissions", async () => {
    const category = {
      emissions: [
        {dataValues: {totalCarbonEmited: 10}},
        {dataValues: {totalCarbonEmited: 5}},
      ],
      children: [],
    };
    const totalEmissions =
      emissionsCalculator.calculateCategoryAmount(category);
    expect(totalEmissions).toEqual(15);
  });

  it("working out the amount for a category with children with multiple emissions", async () => {
    const category = {
      children: [
        {
          emissions: [
            {dataValues: {totalCarbonEmited: 10}},
            {dataValues: {totalCarbonEmited: 5}},
          ],
        },
        {
          emissions: [
            {dataValues: {totalCarbonEmited: 3}},
            {dataValues: {totalCarbonEmited: 5}},
          ],
        },
      ],
    };
    const totalEmissions =
      emissionsCalculator.calculateCategoryAmount(category);
    expect(totalEmissions).toEqual(23);
  });
});
