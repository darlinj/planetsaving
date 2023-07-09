const emissionsCalculator = require("./emissionsCalculator");

const getUser = async (userId, dataSources) => {
  if (userId) {
    return await dataSources.users.getUser({id: userId});
  }
  return await dataSources.users.getUserByName("AVERAGE JOE");
};

module.exports = {
  Category: {
    async amount(parent, args, {dataSources}, info) {
      const category =
        await dataSources.climateData.getCategoryWithChildrenAndEmissions(
          parent.id
        );
      const user = await getUser(args.userId, dataSources);
      return emissionsCalculator.calculateCategoryAmount(
        category,
        user.dataValues
      );
    },
    async calculation(parent, args, {dataSources}, info) {
      const category =
        await dataSources.climateData.getCategoryWithChildrenAndEmissions(
          parent.id
        );
      const user = await getUser(args.userId, dataSources);
      return emissionsCalculator.getCalculation(category, user.dataValues);
    },
    async referenceUrls(parent, args, {dataSources}, info) {
      const category =
        await dataSources.climateData.getCategoryWithChildrenAndEmissions(
          parent.id
        );
      const user = await getUser(args.userId, dataSources);
      return emissionsCalculator.getReferences(category, user.dataValues);
    },
  },
  ClimateData: {
    subCategories(parent, args, {dataSources}, info) {
      return dataSources.climateData.getSubCategories(parent.id);
    },
    async amount(parent, args, {dataSources}, info) {
      const category =
        await dataSources.climateData.getCategoryWithChildrenAndEmissions(
          parent.id
        );
      const user = await getUser(args.userId, dataSources);
      return emissionsCalculator.calculateCategoryAmount(
        category,
        user.dataValues
      );
    },
  },
};
