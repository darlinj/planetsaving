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

    it("Calculations for a small house", () => {
      const gasEmitted = gasEmissions({
        gasEstimationType: "houseSize",
        houseSize: "small",
        numberOfPeopleInHome: 4,
      }).calculation;
      expect(gasEmitted.toFixed(2)).toEqual("0.61");
    });

    it("Calculations for a large house", () => {
      const gasEmitted = gasEmissions({
        gasEstimationType: "houseSize",
        houseSize: "large",
        numberOfPeopleInHome: 4,
      }).calculation;
      expect(gasEmitted.toFixed(2)).toEqual("1.37");
    });

    it("calculates the per person gas usage based on kwh used", () => {
      const gasEmitted = gasEmissions({
        kwhOfGasUsedPerYear: 18000,
        gasEstimationType: "kwh",
        numberOfPeopleInHome: 4,
      }).calculation;
      expect(gasEmitted.toFixed(2)).toBe("0.91");
    });

    it("calculates the per person gas usage based on m3 used", () => {
      const gasEmitted = gasEmissions({
        m3OfGasUsedPerYear: 1800,
        gasEstimationType: "m3",
        numberOfPeopleInHome: 4,
      }).calculation;
      expect(gasEmitted.toFixed(2)).toBe("1.02");
    });
  });

  describe("Creating the calculation text", () => {
    it("returns an error if the operands are not supplied ", () => {
      const gasEmitted = gasEmissions({}).description;
      expect(gasEmitted).toBe(
        "Unable to calculate gas emissions due to insufficient data"
      );
    });

    it("shows the kwh calculation", () => {
      const gasEmitted = gasEmissions({
        kwhOfGasUsedPerYear: 18000,
        gasEstimationType: "kwh",
        numberOfPeopleInHome: 4,
      }).description;
      expect(gasEmitted).toBe(
        "(18000KWh of gas used * 0.203kg of CO2e per unit / 1000) / 4 people = 0.91 Tons of CO2e"
      );
    });

    it("shows the house size calculation", () => {
      const gasEmitted = gasEmissions({
        houseSize: "medium",
        gasEstimationType: "houseSize",
        numberOfPeopleInHome: 4,
      }).description;
      expect(gasEmitted).toBe(
        "(18000KWh of gas used in a typical medium house * 0.203kg of CO2e per unit / 1000) / 4 people = 0.91 Tons of CO2e"
      );
    });

    it("shows the m3 calculation", () => {
      const gasEmitted = gasEmissions({
        m3OfGasUsedPerYear: 1800,
        gasEstimationType: "m3",
        numberOfPeopleInHome: 4,
      }).description;
      expect(gasEmitted).toBe(
        "(1800 meters cubed of gas used * 11.2KWh per M3 * 0.203kg of CO2e per unit / 1000) / 4 people = 1.02 Tons of CO2e"
      );
    });
  });
});
