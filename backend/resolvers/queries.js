module.exports = {
  getClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.getClimateData(args);
  },
  getActionsList: (parent, args, {dataSources}, info) => {
    return dataSources.actions.getActions(args);
  },
};
