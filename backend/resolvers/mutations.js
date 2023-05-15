module.exports = {
  clearClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.clearClimateData();
  },
  clearActions: (parent, args, {dataSources}, info) => {
    return dataSources.actions.clearActions();
  },
  clearEmissions: (parent, args, {dataSources}, info) => {
    return dataSources.emissions.clearEmissions();
  },
  clearAverageJoeUser: (parent, args, {dataSources}, info) => {
    return dataSources.users.clearAverageJoeUser();
  },
  addClimateChangeData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.addClimateChangeData(args);
  },
  addAction: (parent, args, {dataSources}, info) => {
    return dataSources.actions.addAction(args);
  },
  addEmission: (parent, args, {dataSources}, info) => {
    return dataSources.emissions.addEmission(args);
  },
  addUser: (parent, args, {dataSources}, info) => {
    return dataSources.users.addUser(args);
  },
  addOrUpdateUser: (parent, args, {dataSources}, info) => {
    return dataSources.users.addOrUpdateUser(args);
  },
};
