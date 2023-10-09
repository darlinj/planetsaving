const essexPoliceNumbers = 3574;
const totalUKPoliceNumbers = 137600;
const essexPoliceEmissionsPerYearInTons = 10000;
const ukPopulation = 67.33;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `I was unable to find good figures on the carbon emissions of the police in the UK.  
    In lieu of better information I am using the figures for Essex police (currently ${essexPoliceEmissionsPerYearInTons} tons per year}) and scaling that up by the number of police as shown:
    Estimate of total carbon emissions for UK police = ${totalUKPoliceNumbers} police in UK / ${essexPoliceNumbers} police in Essex * ${essexPoliceEmissionsPerYearInTons} Tons of CO2e / 1000000
    Divide that by ${ukPopulation} million people and you get ${calc(
    operands
  ).toFixed(2)} Tons per person`;
};

const calc = (_operands) => {
  return (
    ((totalUKPoliceNumbers / essexPoliceNumbers) *
      essexPoliceEmissionsPerYearInTons) /
    1000000 /
    ukPopulation
  );
};

const referenceUrls = [
  {
    label: "Essex police environment strategy",
    url: "https://www.essex.pfcc.police.uk/wp-content/uploads/2021/03/11.-Draft-Environment-Strategy.pdf",
  },
];
