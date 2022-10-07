const {ApolloServer} = require("apollo-server");

const serverOptions = require("./server_options");

const server = new ApolloServer(serverOptions);

server.listen().then(({url}) => {
  console.log(`☃ Server ready at ${url}`);
});
