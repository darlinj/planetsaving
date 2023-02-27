const emitionsCalculator = require("./emitions_calculator");
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
      return emitionsCalculator.calculateCategoryAmount(category);
    },
  },
};
