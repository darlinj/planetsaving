const meatEmissions = require("./meatEmissions");

describe("meat and dairy calculations", () => {
  describe("working out the emission", () => {
    it("returns null if the meat estimation type is not supplied", () => {
      const meatEmitted = meatEmissions({}).calculation;
      expect(meatEmitted).toBe(null);
    });

    it("returns the sum of beef weight", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "weight",
        beefGramsPerWeek: 100,
      }).calculation;
      expect(meatEmitted).toBe((0.1 * 52 * 60) / 1000);
    });

    it("returns the sum of beef meals", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "meals",
        beefMealsPerWeek: 2,
      }).calculation;
      expect(meatEmitted).toBe((2 * 0.1 * 52 * 60) / 1000);
    });

    it("assumes that the number of meals is 0 if the operand is not set", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "meals",
      }).calculation;
      expect(meatEmitted).toBe(0);
    });

    it("returns the sum of lamb weight", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "weight",
        lambGramsPerWeek: 100,
      }).calculation;
      expect(meatEmitted).toBe((0.1 * 52 * 24) / 1000);
    });

    it("returns the sum of lamb meals", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "meals",
        lambMealsPerWeek: 2,
      }).calculation;
      expect(meatEmitted).toBe((2 * 0.1 * 52 * 24) / 1000);
    });

    it("adds up the different food emissions", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "meals",
        lambMealsPerWeek: 2,
        beefMealsPerWeek: 2,
      }).calculation;
      expect(meatEmitted).toBe((2 * 0.1 * 52 * 24 + 2 * 0.1 * 52 * 60) / 1000);
    });

    it("returns the correct description for the beef calculation", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "weight",
        beefGramsPerWeek: 100,
      }).description;
      expect(meatEmitted).toBe(
        "0.1Kg of beef per week * 52 weeks * 60Kg of CO2e per Kg = 0.312 Tons of CO2e"
      );
    });

    it("returns the correct description for the beef meals calculation", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "meals",
        beefMealsPerWeek: 2,
      }).description;
      expect(meatEmitted).toBe(
        "2 beef meals per week * 0.2Kg per meal * 52 weeks * 60Kg of CO2e per Kg = 0.624 Tons of CO2e"
      );
    });

    it("returns an empty string if the meal data is not included", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "meals",
        beefMealsPerWeek: undefined,
      }).description;
      expect(meatEmitted).toBe("");
    });

    it("returns an empty string if the meal data is 0", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "meals",
        beefMealsPerWeek: undefined,
      }).description;
      expect(meatEmitted).toBe("");
    });

    it("concatenates the descriptions correctly", () => {
      const meatEmitted = meatEmissions({
        meatEstimationType: "meals",
        beefMealsPerWeek: 2,
        lambMealsPerWeek: 2,
      }).description;
      expect(meatEmitted).toBe(
        "2 beef meals per week * 0.2Kg per meal * 52 weeks * 60Kg of CO2e per Kg + 2 lamb meals per week * 0.2Kg per meal * 52 weeks * 24Kg of CO2e per Kg = 0.8736 Tons of CO2e"
      );
    });
  });
});
