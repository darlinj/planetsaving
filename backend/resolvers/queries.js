module.exports = {
  getClimateData: (parent, args, {dataSources}, info) => {
    return dataSources.climateData.getClimateData();
  },
  getActionsList: (parent, args, {dataSources}, info) => {
    console.log(dataSources);
    return dataSources.actions.getActions();
  },
};
