// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');

// const { ApolloServer } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
//   introspection: true
// });

// server.start().then(() => {
//   console.log('server started');
//   server.applyMiddleware({ app });
// });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// // app.use(routes);

// //Wait on this until I'm done testing
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// // });

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Apollo server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });

// // db.once('open', () => {
// //   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// // });

const express = require('express');
const path = require('path');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers
const {authMiddleware} = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.start().then(() => {
  console.log('server started');
  server.applyMiddleware({ app });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});