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
      title: String
      cost: Float
      carbonSaved: Float
      category: String
    ): Action
    addClimateChangeData(
      label: String
      category: String
      amount: Float
      parentId: Int
    ): ClimateData
  }
  type ClimateData {
    id: Float
    label: String
    category: String
    amount: Float
    parentId: Int
  }
  type Action {
    id: Float
    title: String
    cost: Float
    carbonSaved: Float
    category: String
  }
`;
