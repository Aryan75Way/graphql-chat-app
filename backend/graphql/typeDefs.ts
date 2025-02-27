export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type Message {
    id: ID!
    sender: User!
    receiver: User!
    content: String!
    createdAt: String!
  }

  type Query {
    me: User
    messages(receiverId: ID!): [Message!]!
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): String!
    sendMessage(receiverId: ID!, content: String!): Message!
  }
`;
