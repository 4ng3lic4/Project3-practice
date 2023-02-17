require('dotenv').config();
const path = require('path');
const express = require('express');
const db = require('./config/connection'); 
const { seedDatabase } = require('./seeders/seed');
//Apollo Server
const { ApolloServer } = require('@apollo/server');

//Authentication Middleware
const { authMiddleware } = require('./utils/auth');

//Updated version of Apollo, its grabbing the express middleware fro ma different place
const { expressMiddleware } = require('@apollo/server/express4');

//GraphQL
const { typeDefs, resolvers } = require('./schemas');

//Cords framework prevents people using all our API calls on our service 
const cors = require('cors');

//Basic app express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// if not production, enable seed, 
// if in production, only enable seed when the process.env.ENABLE_SEED var is true
if(process.env.NODE_ENV !== 'production' || process.env.ENABLE_SEED === 'true'){
  app.post('/seedDatabase', async (req, res) => {
    const result = await seedDatabase();
    if(result.message === "completed seed"){
      res.status(200);
    }
    else{
      res.status(500);
    }
    res.json(result);
  });
  app.delete('/seedDatabase', async (req, res) => {
    res.status(200).json(result);
  });
}

//Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //authMiddleware for authentication so we can do login for users
  context: authMiddleware,
})

//Start Server API and GraphQL installing Apollo with "cors"
const startServer = async() => {
  await server.start();
  app.use('/graphql', cors(), expressMiddleware(server));
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}


startServer();