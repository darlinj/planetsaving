const template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

const calculateCategoryAmount = (category, userValues = null) => {
  if (category.children.length == 0) {
    return calculateEmissionsTotal(category.emissions, userValues);
  } else {
    return category.children.reduce(
      (total, c) => total + calculateEmissionsTotal(c.emissions, userValues),
      0
    );
  }
};

const calculateEmissionsTotal = (emissions, userValues = null) => {
  return emissions.reduce((subtotal, emission) => {
    const calculationTemplate =
      emission.dataValues.calculationTemplate || "${totalCarbonEmited}*1.0";
    const calculation = template(calculationTemplate, {
      ...emission.dataValues,
      ...userValues,
    });
    return subtotal + eval(calculation);
  }, 0);
};

module.exports = {calculateCategoryAmount, calculateEmissionsTotal};
