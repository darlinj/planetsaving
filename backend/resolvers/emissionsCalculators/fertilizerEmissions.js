const fertilizerPerYearUKTones = 1.4;
const co2ePerTon = 5.1;
const proportionOfDomesticallyProducedFood = 0.54;
const ukPopulation = 67.33;

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  return `The United Kingdom consumes approximately ${fertilizerPerYearUKTones} million metric tons of fertilizer per year.  \
    However only ${
      proportionOfDomesticallyProducedFood * 100
    }% of food is grown in the UK so we have to scale up the fertilizer used to ${(
    fertilizerPerYearUKTones *
    (1 / proportionOfDomesticallyProducedFood)
  ).toFixed(2)} million metric tons.
    Each kilogram of fertilizer produces ${co2ePerTon}Kg of CO2e.  \
    Therefore emissions from food grown for the UK is ${(
      fertilizerPerYearUKTones *
      (1 / proportionOfDomesticallyProducedFood) *
      co2ePerTon
    ).toFixed(2)} million tons C02e. \
    Divide that by ${ukPopulation} million people and you get ${calc(
    operands
  ).toFixed(2)} Tons per person`;
};

const calc = (operands) => {
  return (
    (fertilizerPerYearUKTones *
      (1 / proportionOfDomesticallyProducedFood) *
      co2ePerTon) /
    ukPopulation
  );
};

const referenceUrls = [
  {
    label: "The Real Climate Impact of Organic Farming",
    url: "https://foodprint.org/blog/the-real-climate-impact-of-organic-farming/",
  },
  {
    label: "Fertilizer industry in the UK",
    url: "https://www.statista.com/topics/4588/agricultural-fertilizer-market-in-the-uk",
  },
  {
    label: "International trade administration",
    url: "https://www.trade.gov/country-commercial-guides/united-kingdom-agricultural-sectors",
  },
  {
    label: "Reduce your farm’s impact on climate change",
    url: "https://www.yara.co.uk/grow-the-future/sustainable-farming/carbon-footprint",
  },
];
