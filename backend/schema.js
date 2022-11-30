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
      title: String
      cost: Float
      carbonSaved: Float
      type: String
    ): Action
    addClimateChangeData(
      id: Float
      label: String
      color: String
      amount: Float
    ): ClimateData
  }
  type ClimateData {
    id: Float
    label: String
    color: String
    amount: Float
  }
  type Action {
    id: Float
    title: String
    cost: Float
    carbonSaved: Float
    type: String
  }
`;
