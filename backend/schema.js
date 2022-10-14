const {gql} = require("apollo-server-lambda");
module.exports = gql`
  type Query {
    getClimateData: [ClimateData]
    getActions: [Action]
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
