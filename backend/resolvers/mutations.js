module.exports = {
  clearClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.database.clearClimateData();
  },
  clearActions: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.clearActions();
  },
  addClimateChangeData: (parent, args, {dataSources}, info) => {
    return dataSources.database.addClimateChangeData(args);
  },
  addAction: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.addAction(args);
  },
};
