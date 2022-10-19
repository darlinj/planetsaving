module.exports = {
  clearClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.clearClimateData();
  },
  clearActions: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.clearActions();
  },
  addClimateChangeData: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.addClimateChangeData(args);
  },
  addAction: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.addAction(args);
  },
};
