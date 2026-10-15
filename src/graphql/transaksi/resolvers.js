const Transaksi = require("../../models/transaksi/transaksiModel");
const { hitungDiskon } = require("../../services/diskonService");
const { formatRupiah, formatDate } = require("../../utils/formatter");

const resolvers = {
  Query: {
    transaksi: async () => {
      return await Transaksi.findAll({
        order: [["created_at", "DESC"]],
      });
    },

    transaksiById: async (_, { id }) => {
      const data = await Transaksi.findByPk(id);
      if (!data) {
        throw new Error("Transaksi tidak ditemukan");
      }
      return data;
    },
  },

  Mutation: {
    // TAMBAH TRANSAKSI (Sesuai slide: tambahTransaksi(total_belanja: 5000000))
    tambahTransaksi: async (_, { total_belanja }) => {
      const { diskon_persen, jumlah_diskon, total_bayar } =
        hitungDiskon(total_belanja);
      const waktu = new Date();

      return await Transaksi.create({
        total_belanja,
        diskon_persen,
        jumlah_diskon,
        total_bayar,
        created_at: waktu,
        updated_at: waktu,
        deleted_at: null,
      });
    },

    updateTransaksi: async (_, { id, total_belanja }) => {
      const data = await Transaksi.findByPk(id);
      if (!data) {
        throw new Error("Transaksi tidak ditemukan");
      }

      const { diskon_persen, jumlah_diskon, total_bayar } =
        hitungDiskon(total_belanja);
      await data.update({
        total_belanja,
        diskon_persen,
        jumlah_diskon,
        total_bayar,
        updated_at: new Date(),
      });

      return data;
    },

    deleteTransaksi: async (_, { id }) => {
      const data = await Transaksi.findByPk(id);
      if (!data) {
        throw new Error("Transaksi tidak ditemukan");
      }

      const waktu = new Date();
      await data.update({
        deleted_at: waktu,
        updated_at: waktu,
      });

      return data;
    },

    restoreTransaksi: async (_, { id }) => {
      const data = await Transaksi.findByPk(id);
      if (!data) {
        throw new Error("Transaksi tidak ditemukan");
      }

      await data.update({
        deleted_at: null,
        updated_at: new Date(),
      });

      return data;
    },
  },

  Transaksi: {
    total_belanja: (parent) => formatRupiah(parent.total_belanja),
    diskon_persen: (parent) => `${parent.diskon_persen}%`,
    jumlah_diskon: (parent) => formatRupiah(parent.jumlah_diskon),
    total_bayar: (parent) => formatRupiah(parent.total_bayar),
    created_at: (parent) => formatDate(parent.created_at),
    updated_at: (parent) => formatDate(parent.updated_at),
    deleted_at: (parent) => formatDate(parent.deleted_at),
  },
};

module.exports = resolvers;
