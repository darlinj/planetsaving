const {ApolloServer} = require("apollo-server-lambda");
const serverOptions = require("./server_options");

const server = new ApolloServer(serverOptions);

exports.graphqlHandler = server.createHandler();
