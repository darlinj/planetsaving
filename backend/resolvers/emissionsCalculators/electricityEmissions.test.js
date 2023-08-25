const electricityEmissions = require("./electricityEmissions");

describe("electricity calculations", () => {
  describe("working out the emission", () => {
    it("returns 0 if the correct operands are not supplied", () => {
      const electricityEmitted = electricityEmissions({}).calculation;
      expect(electricityEmitted).toBe(0);
    });

    it("returns 0 if one of the operands is not present", () => {
      const electricityEmitted = electricityEmissions({
        kwhOfElectricityUsedPerYear: 18000,
      }).calculation;
      expect(electricityEmitted).toBe(0);
    });

    it("Calculations for a small house", () => {
      const electricityEmitted = electricityEmissions({
        electricityEstimationType: "houseSize",
        houseSize: "small",
        numberOfPeopleInHome: 4,
      }).calculation;
      expect(electricityEmitted.toFixed(2)).toEqual("0.23");
    });

    it("Calculations for a large house", () => {
      const electricityEmitted = electricityEmissions({
        electricityEstimationType: "houseSize",
        houseSize: "large",
        numberOfPeopleInHome: 4,
      }).calculation;
      expect(electricityEmitted.toFixed(2)).toEqual("0.54");
    });

    it("calculates the per person electricity usage based on kwh used", () => {
      const electricityEmitted = electricityEmissions({
        kwhOfElectricityUsedPerYear: 18000,
        electricityEstimationType: "kwh",
        numberOfPeopleInHome: 4,
      }).calculation;
      expect(electricityEmitted.toFixed(2)).toBe("1.39");
    });
  });

  describe("Creating the calculation text", () => {
    it("returns an error if the operands are not supplied ", () => {
      const electricityEmitted = electricityEmissions({}).description;
      expect(electricityEmitted).toBe(
        "Unable to calculate electricity emissions due to insufficient data"
      );
    });

    it("shows the kwh calculation", () => {
      const electricityEmitted = electricityEmissions({
        kwhOfElectricityUsedPerYear: 18000,
        electricityEstimationType: "kwh",
        numberOfPeopleInHome: 4,
      }).description;
      expect(electricityEmitted).toBe(
        "(18000KWh of electricity used * 0.309kg of CO2e per unit / 1000) / 4 people = 1.39 Tons of CO2e"
      );
    });

    it("shows the house size calculation", () => {
      const electricityEmitted = electricityEmissions({
        houseSize: "medium",
        electricityEstimationType: "houseSize",
        numberOfPeopleInHome: 4,
      }).description;
      expect(electricityEmitted).toBe(
        "(4800KWh of electricity used in a typical medium house * 0.309kg of CO2e per unit / 1000) / 4 people = 0.37 Tons of CO2e"
      );
    });
  });
});
