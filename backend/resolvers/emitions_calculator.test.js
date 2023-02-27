const emitionsCalculator = require("./emitions_calculator");

describe("the emitions calculation", () => {
  it("working out the amount for a single single emition", async () => {
    const emitions = [{dataValues: {totalCarbonEmited: 10}}];
    const totalEmitions = emitionsCalculator.calculateEmitionsTotal(emitions);
    expect(totalEmitions).toEqual(10);
  });

  it("working out the amount for multiple emitions", async () => {
    const emitions = [
      {dataValues: {totalCarbonEmited: 5}},
      {dataValues: {totalCarbonEmited: 10}},
    ];
    const totalEmitions = emitionsCalculator.calculateEmitionsTotal(emitions);
    expect(totalEmitions).toEqual(15);
  });

  it("working out the amount based on the template if supplied", async () => {
    const emitions = [
      {
        dataValues: {
          totalCarbonEmited: 5,
          calculationTemplate: "${totalCarbonEmited} * 2",
        },
      },
      {dataValues: {totalCarbonEmited: 10}},
    ];
    const totalEmitions = emitionsCalculator.calculateEmitionsTotal(emitions);
    expect(totalEmitions).toEqual(20);
  });
});

describe("the category calculation", () => {
  it("working out the amount for a single category with a single emition", async () => {
    const category = {
      emitions: [{dataValues: {totalCarbonEmited: 10}}],
      children: [],
    };
    const totalEmitions = emitionsCalculator.calculateCategoryAmount(category);
    expect(totalEmitions).toEqual(10);
  });

  it("working out the amount for a single category with multiple emitions", async () => {
    const category = {
      emitions: [
        {dataValues: {totalCarbonEmited: 10}},
        {dataValues: {totalCarbonEmited: 5}},
      ],
      children: [],
    };
    const totalEmitions = emitionsCalculator.calculateCategoryAmount(category);
    expect(totalEmitions).toEqual(15);
  });

  it("working out the amount for a category with children with multiple emitions", async () => {
    const category = {
      children: [
        {
          emitions: [
            {dataValues: {totalCarbonEmited: 10}},
            {dataValues: {totalCarbonEmited: 5}},
          ],
        },
        {
          emitions: [
            {dataValues: {totalCarbonEmited: 3}},
            {dataValues: {totalCarbonEmited: 5}},
          ],
        },
      ],
    };
    const totalEmitions = emitionsCalculator.calculateCategoryAmount(category);
    expect(totalEmitions).toEqual(23);
  });
});
