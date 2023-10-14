const emissionsPerYearInMTons = 9.3;
const ukPopulation = 67.33;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `Emissions from maintaining our homes and filling them with furniture and appliances create ${emissionsPerYearInMTons} Tons of CO2e
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
