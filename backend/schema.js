const {gql} = require("apollo-server-lambda");
module.exports = gql`
  type Query {
    getClimateData: [ClimateData]
    getActionsList: [Action]
  }
  type Mutation {
    clearActions: Boolean
    clearClimateData: Boolean
    addAction(
      id: Float
      actionTitle: String
      cost: Float
      carbonSaved: Float
      actionType: String
    ): Boolean
    addClimateChangeData(
      id: Float
      label: String
      color: String
      amount: Float
    ): Boolean
  }
  type ClimateData {
    id: Float
    label: String
    color: String
    amount: Float
  }
  type Action {
    id: Float
    actionTitle: String
    cost: Float
    carbonSaved: Float
    actionType: String
  }
`;
