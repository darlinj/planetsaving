const emissionsPer_PassengerHourKg = 250;
module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `${operands.flyingHoursPerYear} hours flying * (${emissionsPer_PassengerHourKg} Kg CO2e per hour / 1000)`;
};

const calc = (operands) => {
  return operands.flyingHoursPerYear * (emissionsPer_PassengerHourKg / 1000);
};

const referenceUrls = {
  label: "Carbon Independent aviation calculation",
  url: "https://www.carbonindependent.org/22.html",
};
