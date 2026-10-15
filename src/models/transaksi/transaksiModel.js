const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Transaksi = sequelize.define(
  "Transaksi",
  {
    id_transaksi: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    total_belanja: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    diskon_persen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_diskon: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    total_bayar: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "transaksi",
    timestamps: false,
  }
);

module.exports = Transaksi;
