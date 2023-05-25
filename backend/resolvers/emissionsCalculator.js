const tailPipeEmissionsCalc = require("./tailPipeEmissions");
const simpleMultiplierBy2 = require("./simpleMultiplierBy2");

const calculateCategoryAmount = (category, userValues = null) => {
  if (category.children.length == 0) {
    return calculateEmissionsForLeafCategory(category.emissions, userValues);
  } else {
    return category.children.reduce(
      (total, c) =>
        total + calculateEmissionsForLeafCategory(c.emissions, userValues),
      0
    );
  }
};

const calculateEmissionsForLeafCategory = (emissions, userValues = null) => {
  return emissions.reduce((subtotal, emission) => {
    const emissionTotal = calculateEmission(
      emission.dataValues.calculationIdentifier,
      {
        ...emission.dataValues,
        ...userValues,
      }
    );
    return subtotal + emissionTotal;
  }, 0);
};

const calculateEmission = (calculationIdentifier, operands) => {
  switch (calculationIdentifier) {
    case "simple_multiplier_by_2":
      return simpleMultiplierBy2(operands);
    case "driving_tail_pipe":
      return tailPipeEmissionsCalc(operands);
    default:
      return operands.totalCarbonEmited * 1.0;
  }
};

module.exports = {calculateCategoryAmount, calculateEmissionsForLeafCategory};
