const gasEmissions = require("./gasEmissions");

describe("gas calculations", () => {
  describe("working out the emission", () => {
    it("returns 0 if the correct operands are not supplied", () => {
      const gasEmitted = gasEmissions({}).calculation;
      expect(gasEmitted).toBe(0);
    });

    it("returns 0 if one of the operands is not present", () => {
      const gasEmitted = gasEmissions({
        kwhOfGasUsedPerYear: 18000,
      }).calculation;
      expect(gasEmitted).toBe(0);
    });

    it("works out the expected gas per person", () => {
      const gasEmitted = gasEmissions({
        kwhOfGasUsedPerYear: 18000,
        numberOfPeopleInHome: 4,
      }).calculation;
      expect(gasEmitted).toBe(0.9135000000000001);
    });
  });

  describe("Creating the calculation text", () => {
    it("returns an error if the operands are not supplied ", () => {
      const gasEmitted = gasEmissions({}).description;
      expect(gasEmitted).toBe(
        "Unable to calculate gas emissions due to insufficient data"
      );
    });

    it("shows the calculation", () => {
      const gasEmitted = gasEmissions({
        kwhOfGasUsedPerYear: 18000,
        numberOfPeopleInHome: 4,
      }).description;
      expect(gasEmitted).toBe(
        "(18000KWh of gas used * 0.203kg of CO2e per unit / 1000) / 4 people = 0.91 Tons of CO2e"
      );
    });
  });
});
