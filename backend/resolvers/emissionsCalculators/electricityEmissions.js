const emissionsPerKWhInKg = 0.309;
const kWhByHouseSize = {
  small: 3000,
  medium: 4800,
  large: 7000,
};

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  let firstPart = "";
  switch (operands.electricityEstimationType) {
    case "kwh":
      firstPart = descByKWh(operands.kwhOfElectricityUsedPerYear);
      break;
    default:
      firstPart = descByHouseSize(operands.houseSize);
  }
  if (operands.numberOfPeopleInHome === undefined || firstPart === undefined) {
    return "Unable to calculate electricity emissions due to insufficient data";
  }
  return `${firstPart} / ${operands.numberOfPeopleInHome} people = ${calc(
    operands
  ).toFixed(2)} Tons of CO2e`;
};

const descByHouseSize = (houseSize) => {
  if (!houseSize) return;
  return `(${kWhByHouseSize[houseSize]}KWh of electricity used in a typical ${houseSize} house * ${emissionsPerKWhInKg}kg of CO2e per unit / 1000)`;
};

const descByKWh = (kwhOfElectricityUsedPerYear) => {
  if (!kwhOfElectricityUsedPerYear) return;
  return `(${kwhOfElectricityUsedPerYear}KWh of electricity used * ${emissionsPerKWhInKg}kg of CO2e per unit / 1000)`;
};

const calc = (operands) => {
  if (!operands.numberOfPeopleInHome) return 0;
  let carbonImpact = 0;
  switch (operands.electricityEstimationType) {
    case "kwh":
      carbonImpact = electricityByKWh(operands.kwhOfElectricityUsedPerYear);
      break;
    default:
      carbonImpact = electricityByHouseSize(operands.houseSize);
  }
  return carbonImpact / operands.numberOfPeopleInHome;
};

const electricityByHouseSize = (houseSize) => {
  if (!houseSize) return 0;
  return (kWhByHouseSize[houseSize] * emissionsPerKWhInKg) / 1000;
};
const electricityByKWh = (kwhOfElectricityUsedPerYear) => {
  if (!kwhOfElectricityUsedPerYear) return 0;
  return (kwhOfElectricityUsedPerYear * emissionsPerKWhInKg) / 1000;
};

const referenceUrls = {
  label: "Carbon Independent electricity calculations",
  url: "https://www.carbonindependent.org/15.html",
};
