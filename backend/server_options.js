const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const dataSources = require("./datasources/index");
const typeDefs = require("./schema");
const resolvers = require("./resolvers/index.js");

module.exports = {
  typeDefs,
  resolvers,
  dataSources,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({embed: true})],
};
