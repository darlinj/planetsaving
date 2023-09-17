const emissionsByFoodTypeInKg = {
  beef: 60,
  lamb: 24,
  pork: 7,
  chicken: 6,
  cheese: 21,
};
const weightsPerMeal = {
  beef: 0.1,
  lamb: 0.1,
  pork: 0.1,
  chicken: 0.1,
  cheese: 0.05,
};

const foods = new Array("beef", "lamb", "pork", "chicken", "cheese");

module.exports = (operands = {}) => {
  return {
    calculation: calc(operands),
    description: desc(operands),
    referenceUrls,
  };
};

const desc = (operands) => {
  const totalEmissions = calc(operands) || 0;

  const parts = foods.reduce((sum, food) => {
    if (operands.meatEstimationType === "meals") {
      const descriptionPart = mealDescription(
        food,
        operands[`${food}MealsPerWeek`],
        totalEmissions
      );
      return (
        sum +
        (sum === "" || descriptionPart === "" ? "" : " + ") +
        descriptionPart
      );
    } else {
      const descriptionPart = weightDescription(
        food,
        operands[`${food}GramsPerWeek`],
        totalEmissions
      );
      return (
        sum +
        (sum === "" || descriptionPart === "" ? "" : " + ") +
        descriptionPart
      );
    }
  }, "");
  if (parts === "") return "";
  return parts + ` = ${totalEmissions} Tons of CO2e`;
};

const weightDescription = (food, gramsPerWeek, totalEmissions) => {
  if (gramsPerWeek && gramsPerWeek !== 0) {
    const kgPerWeek = gramsPerWeek / 1000;
    const emissions = emissionsByFoodTypeInKg[food];
    return `${kgPerWeek}Kg of ${food} per week * 52 weeks * ${emissions}Kg of CO2e per Kg`;
  } else {
    return "";
  }
};
const mealDescription = (food, mealsPerWeek, totalEmissions) => {
  if (mealsPerWeek && mealsPerWeek !== 0) {
    const kgPerWeek = mealsPerWeek * weightsPerMeal[food];
    const emissions = emissionsByFoodTypeInKg[food];
    return `${mealsPerWeek} ${food} meals per week * ${kgPerWeek}Kg per meal * 52 weeks * ${emissions}Kg of CO2e per Kg`;
  } else {
    return "";
  }
};

const calc = (operands) => {
  let totalEmissionsKg = 0;
  if (!operands.meatEstimationType) return null;
  return foods.reduce((sum, food) => {
    const foodPerWeekKg =
      operands.meatEstimationType === "meals"
        ? convertMealsToWeight(operands, food)
        : (operands[`${food}GramsPerWeek`] || 0) / 1000;
    totalEmissionsKg = foodPerWeekKg * 52 * emissionsByFoodTypeInKg[food];
    return sum + totalEmissionsKg / 1000;
  }, 0);
};

const convertMealsToWeight = (operands, food) => {
  return (operands[`${food}MealsPerWeek`] || 0) * weightsPerMeal[food];
};

const referenceUrls = [
  {
    label: "Our World in Data",
    url: "https://ourworldindata.org/food-choice-vs-eating-local",
  },
  {
    label: "OECD meat consumption report",
    url: "https://data.oecd.org/agroutput/meat-consumption.htm",
  },
  {
    label: "Cheese consumption report",
    url: "https://www.statista.com/statistics/281114/household-consumption-of-cheese-in-the-united-kingdom-uk/",
  },
];
