module.exports = {
  ClimateData: {
    subCategories(parent, args, {dataSources}, info) {
      return dataSources.climateData.getSubCategories(parent.id);
    },
    amount(parent, args, {dataSources}, info) {
      return dataSources.climateData.getAmount(parent.id);
    },
  },
};
