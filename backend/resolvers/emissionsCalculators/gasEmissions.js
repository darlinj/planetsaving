const emissionsPerKWhInKg = 0.203;
module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  if (
    operands.kwhOfGasUsedPerYear == undefined ||
    operands.numberOfPeopleInHome == undefined
  ) {
    return "Unable to calculate gas emissions due to insufficient data";
  }
  //   return `${operands.flyingHoursPerYear} hours flying * (${emissionsPer_PassengerHourKg} Kg CO2e per hour / 1000)`;
  return `(${
    operands.kwhOfGasUsedPerYear
  }KWh of gas used * ${emissionsPerKWhInKg}kg of CO2e per unit / 1000) / ${
    operands.numberOfPeopleInHome
  } people = ${calc(operands).toFixed(2)} Tons of CO2e`;
};

const calc = (operands) => {
  if (
    operands.kwhOfGasUsedPerYear == undefined ||
    operands.numberOfPeopleInHome == undefined
  ) {
    return 0;
  }
  return (
    (operands.kwhOfGasUsedPerYear * emissionsPerKWhInKg) /
    (operands.numberOfPeopleInHome * 1000)
  );
};

const referenceUrls = {
  label: "Carbon Independent gas calculations",
  url: "https://www.carbonindependent.org/15.html",
};
