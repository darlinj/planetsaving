module.exports = {
  clearClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.clearClimateData();
  },
  clearActions: (parent, args, {dataSources}, info) => {
    return dataSources.actions.clearActions();
  },
  clearEmitions: (parent, args, {dataSources}, info) => {
    return dataSources.emitions.clearEmitions();
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
  addEmition: (parent, args, {dataSources}, info) => {
    return dataSources.emitions.addEmition(args);
  },
  addUser: (parent, args, {dataSources}, info) => {
    return dataSources.users.addUser(args);
  },
  addOrUpdateUser: (parent, args, {dataSources}, info) => {
    return dataSources.users.addOrUpdateUser(args);
  },
};
