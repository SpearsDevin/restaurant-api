const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    menu: [Category]
  }

  type Category {
    name: String
    items: [Item]
  }

  type Item {
    name: String
    description: String
    price: Float
  }
`;

module.exports = typeDefs;
