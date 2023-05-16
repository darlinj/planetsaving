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
  if (calculationIdentifier === "driving_tail_pipe") {
    return tailPipeEmissionsCalc(operands);
  }
  return operands.totalCarbonEmited * 1.0;
};

const tailPipeEmissionsCalc = (operands) => {
  if (operands["drivingMilesPerYear"]) {
    if (operands["carType"] === "electric") {
      return 0;
    }
    switch (operands.sizeOfCar) {
      case "small":
        return operands["drivingMilesPerYear"] * (0.28 / 1000);
      case "large":
        return operands["drivingMilesPerYear"] * (0.41 / 1000);
      default:
        return operands["drivingMilesPerYear"] * (0.31 / 1000);
    }
  }
};

module.exports = {calculateCategoryAmount, calculateEmissionsForLeafCategory};
