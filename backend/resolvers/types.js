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
      let user = null;
      if (args.userId) {
        user = await dataSources.users.getUser(args.userId);
      } else {
        user = await dataSources.users.getUserByName("AVERAGE JOE");
      }
      return emitionsCalculator.calculateCategoryAmount(
        category,
        user.dataValues
      );
    },
  },
};
