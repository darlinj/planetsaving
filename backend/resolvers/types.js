module.exports = {
  ClimateData: {
    subCategories(parent, args, {dataSources}, info) {
      return dataSources.climateData.getSubCategories(parent.id);
    },
    async amount(parent, args, {dataSources}, info) {
      const category =
        await dataSources.climateData.getCategoryWithChildrenAndEmitions(
          parent.id
        );
      return calculateCategoryAmount(category);
    },
  },
};

const calculateCategoryAmount = (category) => {
  if (category.children.length == 0) {
    return calculateEmitionsTotal(category.emitions);
  } else {
    return category.children.reduce(
      (total, c) => total + calculateEmitionsTotal(c.emitions),
      0
    );
  }
};

const calculateEmitionsTotal = (emitions) => {
  return emitions.reduce((subtotal, emition) => {
    const template = (tpl, args) =>
      tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);
    const calculation_template = "${totalCarbonEmited}*1.0";
    const calculation = template(calculation_template, {
      ...emition.dataValues,
    });
    return subtotal + eval(calculation);
  }, 0);
};
