const template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

const calculateCategoryAmount = (category, userValues = null) => {
  if (category.children.length == 0) {
    return calculateEmitionsTotal(category.emitions);
  } else {
    return category.children.reduce(
      (total, c) => total + calculateEmitionsTotal(c.emitions, userValues),
      0
    );
  }
};

const calculateEmitionsTotal = (emitions, userValues = null) => {
  return emitions.reduce((subtotal, emition) => {
    const calculationTemplate =
      emition.dataValues.calculationTemplate || "${totalCarbonEmited}*1.0";
    const calculation = template(calculationTemplate, {
      ...emition.dataValues,
      ...userValues,
    });
    return subtotal + eval(calculation);
  }, 0);
};

module.exports = {calculateCategoryAmount, calculateEmitionsTotal};
