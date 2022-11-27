module.exports = {
  getClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.database.getClimateData();
  },
  getActionsList: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.getActions();
  },
};
