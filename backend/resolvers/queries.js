module.exports = {
  getClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.getClimateData();
  },
  getActionsList: (parent, args, {dataSources}, info) => {
    return dataSources.actions.getActions();
  },
};
