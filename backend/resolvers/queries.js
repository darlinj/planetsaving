module.exports = {
  getClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.getClimateData(args);
  },
  getCategoryData: (parent, args, {dataSources}, info) => {
    return dataSources.category.getCategoryData(args);
  },
  getActionsList: (parent, args, {dataSources}, info) => {
    return dataSources.actions.getActions(args);
  },
};
