const {gql} = require("apollo-server-lambda");
module.exports = gql`
  type Query {
    getClimateData: [ClimateData]
  }
  type ClimateData {
    id: Int
    label: String
    color: String
    amount: Int
  }
`;
