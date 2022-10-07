module.exports = {
  getClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.getClimateData();
  },
};
