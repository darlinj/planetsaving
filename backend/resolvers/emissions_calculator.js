const template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

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
  if (
    calculationIdentifier === "driving_tail_pipe" &&
    operands["drivingMilesPerYear"]
  ) {
    return operands["drivingMilesPerYear"] / 1000;
  }
  return operands.totalCarbonEmited * 1.0;
};

module.exports = {calculateCategoryAmount, calculateEmissionsForLeafCategory};
