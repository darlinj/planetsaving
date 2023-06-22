const tailPipeEmissions = require("./tailPipeEmissions");

describe("Tail pipe emissions", () => {
  it("correctly calculates the emissions from a medium ICE car", () => {
    const emissions = tailPipeEmissions({
      carType: "ICE",
      sizeOfCar: "medium",
      drivingMilesPerYear: 10000,
    });
    expect(emissions.calculation).toBe(3.8801000000000005);
    expect(emissions.description).toBe(
      "10000 miles per year * (0.39 Kg per mile / 1000)"
    );
  });
  it("correctly calculates the emissions from a large ICE car", () => {
    const emissions = tailPipeEmissions({
      carType: "ICE",
      sizeOfCar: "large",
      drivingMilesPerYear: 10000,
    });
    expect(emissions.calculation).toBe(4.508000000000001);
    expect(emissions.description).toBe(
      "10000 miles per year * (0.45 Kg per mile / 1000)"
    );
  });
  it("correctly calculates the emissions from a small ICE car", () => {
    const emissions = tailPipeEmissions({
      carType: "ICE",
      sizeOfCar: "small",
      drivingMilesPerYear: 10000,
    });
    expect(emissions.calculation).toBe(3.4615);
    expect(emissions.description).toBe(
      "10000 miles per year * (0.35 Kg per mile / 1000)"
    );
  });

  it("correctly calculates the emissions from an electric car", () => {
    const emissions = tailPipeEmissions({
      carType: "electric",
      sizeOfCar: "small",
      drivingMilesPerYear: 10000,
    });
    expect(emissions.calculation).toBe(1.1913999999999998);
    expect(emissions.description).toBe(
      "10000 miles per year * (0.12 Kg per mile / 1000)"
    );
  });
  it("returns 0 if the number of miles isn't set", () => {
    const emissions = tailPipeEmissions();
    expect(emissions.calculation).toBe(0);
    expect(emissions.description).toBe(
      "Sorry we can't work this out at this time"
    );
  });
});
