const Transaksi = require("../../models/transaksi/transaksiModel");

function hitungDiskon(total_belanja) {
  let diskon_persen = 0;

  if (total_belanja > 4000000) {
    diskon_persen = 20;
  } else if (total_belanja >= 3000000) {
    diskon_persen = 10;
  } else if (total_belanja >= 2000000) {
    diskon_persen = 9;
  } else if (total_belanja >= 1000000) {
    diskon_persen = 5;
  } else {
    diskon_persen = 0;
  }

  const jumlah_diskon = (total_belanja * diskon_persen) / 100;
  const total_bayar = total_belanja - jumlah_diskon;

  return {
    diskon_persen,
    jumlah_diskon,
    total_bayar,
  };
}

function formatRupiah(amount) {
  if (amount === null || amount === undefined) return null;
  const num = Number(amount);
  const formatted = num.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `Rp ${formatted}`;
}

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

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
