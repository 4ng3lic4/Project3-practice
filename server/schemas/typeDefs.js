const { gql } = require('graphql-tag');


//Update information for plants
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    plants: [Plant]!
  }

  type Plant {
    _id: ID
    name: String
    plantAuthor: String
    description: String
    price: Float,
    animalSafe: String,
    careLevel: String,
    growthHabit: String,
    soilRequirement: String,
    light: String,
    air: String,
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    comment_text: String
    comment_author: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    plants(username: String): [Plant]
    plant(plantId: ID!): Plant
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlant(name: String!): Plant
    addComment(plantId: ID!, comment_text: String!): Plant
    removePlant(plantId: ID!): Plant
    removeComment(plantId: ID!, commentId: ID!): Plant
  }
`;

module.exports = typeDefs;