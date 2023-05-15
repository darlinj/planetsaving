const template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

const calculateCategoryAmount = (category, userValues = null) => {
  if (category.children.length == 0) {
    return calculateEmissionsTotal(category.emissions, userValues);
  } else {
    return category.children.reduce(
      (total, c) => total + calculateEmissionsTotal(c.emissions, userValues),
      0
    );
  }
};

const calculateEmissionsTotal = (emissions, userValues = null) => {
  return emissions.reduce((subtotal, emission) => {
    const calculation = calculateEmission(
      emission.dataValues.calculationIdentifier,
      {
        ...emission.dataValues,
        ...userValues,
      }
    );
    return subtotal + calculation;
  }, 0);
};

const calculateEmission = (calculationIdentifier, operands) => {
  if (calculationIdentifier === "driving_tail_pipe") {
    return operands["drivingMilesPerYear"] / 1000;
  }
  return operands.totalCarbonEmited * 1.0;
};

module.exports = {calculateCategoryAmount, calculateEmissionsTotal};
