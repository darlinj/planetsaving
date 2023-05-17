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
      return operands["drivingMilesPerYear"] * (0.047 / 1000);
    }
    switch (operands.sizeOfCar) {
      case "small":
        return (operands["drivingMilesPerYear"] * (0.253 * 0.7)) / 1000;
      case "large":
        return (operands["drivingMilesPerYear"] * (0.253 * 1.3)) / 1000;
      default:
        return operands["drivingMilesPerYear"] * (0.253 / 1000);
    }
  }
  return 0;
};

module.exports = {calculateCategoryAmount, calculateEmissionsForLeafCategory};
