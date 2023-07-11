const iceFactorsPerMile = {
  small: 0.215 * 1.61,
  medium: 0.241 * 1.61,
  large: 0.28 * 1.61,
};
const electricFactorsPerMile = {
  small: 0.074 * 1.61,
  medium: 0.075 * 1.61,
  large: 0.077 * 1.61,
};

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  const factors =
    operands.carType == "electric" ? electricFactorsPerMile : iceFactorsPerMile;
  if (operands["drivingMilesPerYear"]) {
    return `${operands["drivingMilesPerYear"]} miles per year * (${factors[
      operands.sizeOfCar
    ].toFixed(2)} Kg per mile for a ${operands.carType} car / 1000) = ${calc(
      operands
    ).toFixed(2)} Tons of CO2e`;
  }
  return `Sorry we can't work this out at this time`;
};

const calc = (operands) => {
  if (operands["drivingMilesPerYear"]) {
    if (operands["carType"] == "ICE") {
      return (
        (operands["drivingMilesPerYear"] *
          iceFactorsPerMile[operands.sizeOfCar]) /
        1000
      );
    }
    if (operands["carType"] == "electric") {
      return (
        (operands["drivingMilesPerYear"] *
          electricFactorsPerMile[operands.sizeOfCar]) /
        1000
      );
    }
  }
  return 0;
};

const referenceUrls = {
  label: "Electric cars vs Internal combustion engines",
  url: "https://www.transportenvironment.org/discover/how-clean-are-electric-cars/",
};
