module.exports = {
  getClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.getClimateData();
  },
  getActions: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.getActions();
  },
};
