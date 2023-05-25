const emissionsCalculator = require("./emissionsCalculator");
module.exports = {
  Category: {
    async amount(parent, args, {dataSources}, info) {
      const category =
        await dataSources.climateData.getCategoryWithChildrenAndEmissions(
          parent.id
        );
      let user = null;
      if (args.userId) {
        user = await dataSources.users.getUser({id: args.userId});
      }
      console.log("HELLO", user.dataValues);
      if (!user) {
        user = await dataSources.users.getUserByName("AVERAGE JOE");
      }
      return emissionsCalculator.calculateCategoryAmount(
        category,
        user.dataValues
      );
    },
  },
  ClimateData: {
    subCategories(parent, args, {dataSources}, info) {
      return dataSources.climateData.getSubCategories(parent.id);
    },
    async amount(parent, args, {dataSources}, info) {
      console.log("HELLO", args);
      const category =
        await dataSources.climateData.getCategoryWithChildrenAndEmissions(
          parent.id
        );
      let user = null;
      if (args.userId) {
        user = await dataSources.users.getUser({id: args.userId});
      }
      if (!user) {
        user = await dataSources.users.getUserByName("AVERAGE JOE");
      }
      return emissionsCalculator.calculateCategoryAmount(
        category,
        user.dataValues
      );
    },
  },
};
