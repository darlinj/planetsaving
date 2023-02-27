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
        return dataSources.climateData.sumEmitionsForChildCategories(parent.id);
      }
    },
  },
};
