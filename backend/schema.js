const {gql} = require("apollo-server-lambda");
module.exports = gql`
  type Query {
    getClimateData: [ClimateData]
  }
  type ClimateData {
    id: Float
    label: String
    color: String
    amount: Float
  }
`;
