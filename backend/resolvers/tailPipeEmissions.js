const carbonEmittedPerMileDieselKg = 0.253;
const carbonEmittedPerMileElectricKg = 0.053;
const largeCarFactor = 1.3;
const smallCarFactor = 0.7;
const carSizeFactors = {small: 0.7, medium: 1.0, large: 1.3};
const typeOfCarFactors = {electric: 0.053, ICE: 0.253};

module.exports = (operands) => {
  return {calculation: calc(operands), description: desc(operands)};
};

const desc = (operands) => {
  const carSizeClause =
    operands.carType == "electric"
      ? ""
      : ` * ${carSizeFactors[operands.sizeOfCar]} car size factor`;
  if (operands["drivingMilesPerYear"]) {
    return `${operands["drivingMilesPerYear"]} miles per year * (${
      typeOfCarFactors[operands.carType]
    } Kg per mile / 1000) ${carSizeClause} `;
  }
  return 0;
};

const calc = (operands) => {
  if (operands["drivingMilesPerYear"]) {
    return (
      (operands["drivingMilesPerYear"] *
        (typeOfCarFactors[operands.carType] *
          carSizeFactors[operands.sizeOfCar])) /
      1000
    );
  }
  return 0;
};
