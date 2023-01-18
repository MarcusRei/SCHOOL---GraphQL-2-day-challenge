require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { resolvers } = require("./resolvers");
const { loadFiles } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");

//Use express middleware
const app = express();

//Will parse the requests
app.use(express.json());

//MAke static files available
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

//Sets port
const port = 5000;

//Main running function to start everything
async function run() {
  try {
    //Load in schema and make it executable
    const typeDefs = await loadFiles(path.join(__dirname, "schema.graphql"));
    const schema = makeExecutableSchema({
      typeDefs: typeDefs,
      resolvers: resolvers,
    });

    //Use apollo GUI
    const server = new ApolloServer({ schema: schema });
    await server.start();

    app.use("/graphql", expressMiddleware(server));

    //Start server
    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
