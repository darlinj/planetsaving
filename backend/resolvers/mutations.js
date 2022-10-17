module.exports = {
  clearActions: (parent, args, {dataSources}, info) => {
    return dataSources.dynamodb.clearActions();
  },
};
