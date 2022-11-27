module.exports = {
  clearClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.clearClimateData();
  },
  clearActions: (parent, args, {dataSources}, info) => {
    return dataSources.action.clearActions();
  },
  addClimateChangeData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.addClimateChangeData(args);
  },
  addAction: (parent, args, {dataSources}, info) => {
    return dataSources.action.addAction(args);
  },
};
