const typeDefs = `#graphql
  type Transaksi {
    id_transaksi: ID!
    total_belanja: String!
    diskon_persen: String!
    jumlah_diskon: String!
    total_bayar: String!
    created_at: String
    updated_at: String
    deleted_at: String
  }

  extend type Query {
    transaksi: [Transaksi!]!
    transaksiById(id: ID!): Transaksi
  }

  extend type Mutation {
    tambahTransaksi(total_belanja: Float!): Transaksi!
    updateTransaksi(id: ID!, total_belanja: Float!): Transaksi!
    deleteTransaksi(id: ID!): Transaksi!
    restoreTransaksi(id: ID!): Transaksi!
  }
`;

module.exports = typeDefs;
