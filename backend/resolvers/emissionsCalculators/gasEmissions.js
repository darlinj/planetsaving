const emissionsPerKWhInKg = 0.203;
const kwhInOneM3OfGas = 11.2;
const emissionsPerM3InKg = emissionsPerKWhInKg * kwhInOneM3OfGas;
const kWhByHouseSize = {
  small: 12000,
  medium: 18000,
  large: 27000,
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
  switch (operands.gasEstimationType) {
    case "kwh":
      firstPart = descByKWh(operands.kwhOfGasUsedPerYear);
      break;
    case "m3":
      firstPart = descByM3(operands.m3OfGasUsedPerYear);
      break;
    default:
      firstPart = descByHouseSize(operands.houseSize);
  }
  if (operands.numberOfPeopleInHome === undefined || firstPart === undefined) {
    return "Unable to calculate gas emissions due to insufficient data";
  }
  return `${firstPart} / ${operands.numberOfPeopleInHome} people = ${calc(
    operands
  ).toFixed(2)} Tons of CO2e`;
};

const descByHouseSize = (houseSize) => {
  if (!houseSize) return;
  return `(${kWhByHouseSize[houseSize]}KWh of gas used in a typical ${houseSize} house * ${emissionsPerKWhInKg}kg of CO2e per unit / 1000)`;
};

const descByKWh = (kwhOfGasUsedPerYear) => {
  if (!kwhOfGasUsedPerYear) return;
  return `(${kwhOfGasUsedPerYear}KWh of gas used * ${emissionsPerKWhInKg}kg of CO2e per unit / 1000)`;
};

const descByM3 = (m3OfGasUsedPerYear) => {
  if (!m3OfGasUsedPerYear) return;
  return `(${m3OfGasUsedPerYear} meters cubed of gas used * ${kwhInOneM3OfGas}KWh per M3 * ${emissionsPerKWhInKg}kg of CO2e per unit / 1000)`;
};

const calc = (operands) => {
  if (!operands.numberOfPeopleInHome) return 0;
  let carbonImpact = 0;
  switch (operands.gasEstimationType) {
    case "kwh":
      carbonImpact = gasByKWh(operands.kwhOfGasUsedPerYear);
      break;
    case "m3":
      carbonImpact = gasByM3(operands.m3OfGasUsedPerYear);
      break;
    default:
      carbonImpact = gasByHouseSize(operands.houseSize);
  }
  return carbonImpact / operands.numberOfPeopleInHome;
};

const gasByHouseSize = (houseSize) => {
  if (!houseSize) return 0;
  return (kWhByHouseSize[houseSize] * emissionsPerKWhInKg) / 1000;
};
const gasByKWh = (kwhOfGasUsedPerYear) => {
  if (!kwhOfGasUsedPerYear) return 0;
  return (kwhOfGasUsedPerYear * emissionsPerKWhInKg) / 1000;
};

const gasByM3 = (m3OfGasUsedPerYear) => {
  if (!m3OfGasUsedPerYear) return 0;
  return (m3OfGasUsedPerYear * emissionsPerM3InKg) / 1000;
};

const referenceUrls = {
  label: "Carbon Independent gas calculations",
  url: "https://www.carbonindependent.org/15.html",
};
