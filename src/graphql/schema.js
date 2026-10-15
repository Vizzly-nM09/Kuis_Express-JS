const transaksiTypeDefs = require("./transaksi/schema");

const rootTypeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [
  rootTypeDefs,
  transaksiTypeDefs,
];

module.exports = typeDefs;
