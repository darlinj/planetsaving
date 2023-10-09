const universityEmissionsPerYearInMTons = 18;
const schoolEmissionsPerYearInMTons = 8.5;
const ukPopulation = 67.33;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `Universities in the UK are collectively responsible for ${universityEmissionsPerYearInMTons}MTons of CO2e.
  Schools in the UK are thought to be responsible for ${schoolEmissionsPerYearInMTons}MTons of CO2e.  The author has some doubts about these figures because it would be reasonable to expect that the figure for schools would be higher than that for universities because there are more of them.
    Divide that by ${ukPopulation} million people and you get ${calc(
    operands
  ).toFixed(2)} Tons per person`;
};

const calc = (_operands) => {
  return (
    (universityEmissionsPerYearInMTons + schoolEmissionsPerYearInMTons) /
    ukPopulation
  );
};

const referenceUrls = [
  {
    label: "Analysis reveals scale of tertiary education’s carbon emissions",
    url: "https://climate.leeds.ac.uk/news/analysis-reveals-scale-of-tertiary-educations-carbon-emissions/",
  },
  {
    label: "Carbon Emissions from Schools",
    url: "https://www.sd-commission.org.uk/data/files/publications/Publish_Schools_Carbon_Strategy.pdf",
  },
];
