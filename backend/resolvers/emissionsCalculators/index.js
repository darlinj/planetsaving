const tailPipeEmissionsCalc = require("./tailPipeEmissions");
const simpleMultiplierBy2 = require("./simpleMultiplierBy2");
const flyingCalc = require("./flyingEmissions");
const gasCalc = require("./gasEmissions");
const electricityCalc = require("./electricityEmissions");

const calculateEmission = (calculationIdentifier, operands) => {
  switch (calculationIdentifier) {
    case "simple_multiplier_by_2":
      return simpleMultiplierBy2(operands);
    case "driving_tail_pipe":
      return tailPipeEmissionsCalc(operands);
    case "flying":
      return flyingCalc(operands);
    case "gas":
      return gasCalc(operands);
    case "electricity":
      return electricityCalc(operands);
    default:
      return {
        calculation: operands.totalCarbonEmited * 1.0,
        description: `${operands.totalCarbonEmited} Tons emitted by ${operands.label}`,
        referenceUrls: [],
      };
  }
};

module.exports = calculateEmission;
