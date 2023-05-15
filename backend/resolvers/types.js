const emissionsCalculator = require("./emissions_calculator");
module.exports = {
  ClimateData: {
    subCategories(parent, args, {dataSources}, info) {
      return dataSources.climateData.getSubCategories(parent.id);
    },
    async amount(parent, args, {dataSources}, info) {
      const category =
        await dataSources.climateData.getCategoryWithChildrenAndEmissions(
          parent.id
        );
      let user = null;
      if (args.userId) {
        user = await dataSources.users.getUser({id: args.userId});
      } else {
        user = await dataSources.users.getUserByName("AVERAGE JOE");
      }
      return emissionsCalculator.calculateCategoryAmount(
        category,
        user.dataValues
      );
    },
  },
};
