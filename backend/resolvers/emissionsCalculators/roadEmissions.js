// Add up the total carbon emitted for each type of road and multiply it by the total life cycle cost of the road build and maintenance and then divide by the lifespan of a road (40 years)
const emissionsPerYearInMTons = 10.28;
const greatBritainPopulation = 65.44;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `Road building and maintenance is responsible for ${emissionsPerYearInMTons} MTons CO2e per year in Great Britain.
    Divide that by ${greatBritainPopulation} million people (in Great Britain) and you get ${calc(
    operands
  ).toFixed(2)} Tons per person`;
};

const calc = (_operands) => {
  return emissionsPerYearInMTons / greatBritainPopulation;
};

const referenceUrls = [
  {
    label: "Measuring Road Infrastructure Carbon",
    url: "https://decarbon8.org.uk/wp-content/uploads/sites/59/2022/02/Measuring-Road-Infrastructure-Carbon.pdf",
  },
];
