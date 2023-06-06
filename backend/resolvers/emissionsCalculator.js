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
    if (!emission) return 0;
    const calculatedEmissions = calculateEmission(
      emission.dataValues.calculationIdentifier,
      {
        ...emission.dataValues,
        ...userValues,
      }
    );
    return subtotal + calculatedEmissions.calculation;
  }, 0);
};

const calculateEmission = (calculationIdentifier, operands) => {
  switch (calculationIdentifier) {
    case "simple_multiplier_by_2":
      return simpleMultiplierBy2(operands);
    case "driving_tail_pipe":
      return tailPipeEmissionsCalc(operands);
    default:
      return {
        calculation: operands.totalCarbonEmited * 1.0,
        description: `${operands.totalCarbonEmited} Tons emitted by ${operands.label}`,
      };
  }
};

const calculationsForCategory = (category, user) => {
  if (!category.label) return "Category has data problems!";
  if (!category.emissions || category.emissions.length == 0)
    return `No emissions associated with ${category.label} category`;
  return category.emissions.reduce((combinedCalculation, emission) => {
    const joiner = combinedCalculation == "" ? "" : " + ";
    return (
      combinedCalculation +
      joiner +
      calculateEmission(emission.calculationIdentifier, {
        ...emission.dataValues,
        ...user,
      }).description
    );
  }, "");
};

const getCalculation = (category, userValues = null) => {
  if (category.children.length == 0) {
    return calculationsForCategory(category, userValues);
  } else {
    return category.children.reduce((total, c) => {
      const joiner = total == "" ? "" : " + ";
      return total + joiner + calculationsForCategory(c, userValues);
    }, "");
  }
};

module.exports = {
  calculateCategoryAmount,
  calculateEmissionsForLeafCategory,
  getCalculation,
};
