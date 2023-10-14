const emissionsPerYearInMTons = 22.6;
const ukPopulation = 67.33;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `Eating out and staying away from home in hotels emits ${emissionsPerYearInMTons} Tons of CO2e
    Divide that by ${ukPopulation} million people and you get ${calc(
    operands
  ).toFixed(2)} Tons per person`;
};

const calc = (_operands) => {
  return emissionsPerYearInMTons / ukPopulation;
};

const referenceUrls = [
  {
    label: "UK and England's carbon footprint to 2020",
    url: "https://www.gov.uk/government/statistics/uks-carbon-footprint",
  },
];
