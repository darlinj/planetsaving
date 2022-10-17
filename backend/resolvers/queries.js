module.exports = {
  getClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.getClimateData();
  },
  getActionsList: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.getActions();
  },
};
