const foodTransportEmissionsPerYearMillionTons = 19;
const ukPopulation = 67.33;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `The transport of our food accounts for approximately ${foodTransportEmissionsPerYearMillionTons} million metric tons of C02e.  \
    Divide that by ${ukPopulation} million people and you get ${calc(
    operands
  ).toFixed(2)} Tons per person`;
};

const calc = (operands) => {
  return foodTransportEmissionsPerYearMillionTons / ukPopulation;
};

const referenceUrls = [
  {
    label: "Share of global food miles by transport method",
    url: "https://ourworldindata.org/grapher/share-food-miles-by-method",
  },
  {
    label:
      "You want to reduce the carbon footprint of your food? Focus on what you eat, not whether your food is local",
    url: "https://ourworldindata.org/food-choice-vs-eating-local",
  },
  {
    label: "Food Miles and Sustainability",
    url: "http://www.i-sis.org.uk/FMAS.php",
  },
  {
    label: "Avoid air-freighted food",
    url: "https://goclimatarian.com/eat-seasonal-and-local/avoid-air-freighted-food/",
  },
];
