const emissionsPerYearInMTons = 11;
const ukPopulation = 67.33;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `The army, navy and airforce are collectively responsible for ${emissionsPerYearInMTons}MTons of CO2e.
    Divide that by ${ukPopulation} million people and you get ${calc(
    operands
  ).toFixed(2)} Tons per person`;
};

const calc = (_operands) => {
  return emissionsPerYearInMTons / ukPopulation;
};

const referenceUrls = [
  {
    label: "The Environmental Impacts of the UK Military Sector",
    url: "https://www.sgr.org.uk/sites/default/files/2020-05/SGR-DUK_UK_Military_Env_Impacts.pdf",
  },
];
