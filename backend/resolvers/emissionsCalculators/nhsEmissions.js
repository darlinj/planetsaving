const emissionsPerYearInMTons = 25;
const ukPopulation = 67.33;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `The NHS in the UK is responsible for 25MTons of CO2e.
    Divide that by ${ukPopulation} million people and you get ${calc(
    operands
  ).toFixed(2)} Tons per person`;
};

const calc = (_operands) => {
  return emissionsPerYearInMTons / ukPopulation;
};

const referenceUrls = [
  {
    label: "Health care's response to climate change",
    url: "https://www.thelancet.com/journals/lanplh/article/PIIS2542-5196(20)30271-0/",
  },
  {
    label: "The NHS: Carbon footprint",
    url: "https://www.fph.org.uk/media/3126/k9-fph-sig-nhs-carbon-footprint-final.pdf",
  },
];
