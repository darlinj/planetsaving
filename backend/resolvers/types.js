module.exports = {
  ClimateData: {
    subCategories(parent, args, {dataSources}, info) {
      return dataSources.climateData.getSubCategories(parent.id);
    },
    async amount(parent, args, {dataSources}, info) {
      const categoryChildren =
        await dataSources.climateData.getCategoryChildren(parent.id);
      if (categoryChildren.length == 0) {
        return dataSources.climateData.sumEmitionsForCategory(parent.id);
      } else {
        const categoryChildrenWithEmitions =
          await dataSources.climateData.getCategoryChildrenWithEmitions(
            parent.id
          );
        return categoryChildrenWithEmitions.reduce(
          (total, c) => total + calculateEmitionsTotal(c.emitions),
          0
        );
      }
    },
  },
};

const calculateEmitionsTotal = (emitions) => {
  return emitions.reduce((subtotal, emition) => {
    const template = (tpl, args) =>
      tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);
    const calculation_template = "${totalCarbonEmited}*1.0";
    console.log({...emition.dataValues});
    const calculation = template(calculation_template, {
      totalCarbonEmited: emition.totalCarbonEmited,
    });
    return subtotal + eval(calculation);
  }, 0);
};
