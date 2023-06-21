const tailPipeEmissions = require("./tailPipeEmissions");

describe("Tail pipe emissions", () => {
  it("correctly calculates the emissions from a medium ICE car", () => {
    const emissions = tailPipeEmissions({
      carType: "ICE",
      sizeOfCar: "medium",
      drivingMilesPerYear: 10000,
    });
    expect(emissions.calculation).toBe(2.53);
  });
});
