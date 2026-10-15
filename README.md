# Program Perhitungan Diskon Belanja — Express.js & GraphQL (Quiz)

A modular backend application for calculating shopping discounts and customer payments, built with **Express.js (v5)**, **Apollo Server (v5)**, and **Sequelize ORM (MySQL)**.

---

## 🛠️ Tech Stack

- **Runtime & Framework**: Node.js & Express 5
- **API Architecture**: GraphQL (Apollo Server 5) via `@as-integrations/express5`
- **ORM & Database**: Sequelize 6 with MySQL (`mysql2`)
- **Environment**: `dotenv`
- **Dev Tool**: `nodemon`

---

## 📊 Ketentuan Diskon (Discount Rules)

Program menentukan persentase diskon secara otomatis berdasarkan total belanja pelanggan:

| Total Belanja     | Persentase Diskon | Rumus Diskon          | Total Bayar              |
| :---------------- | :---------------: | :-------------------- | :----------------------- |
| `< Rp 1.000.000`  |      **0%**       | `total_belanja * 0%`  | `total_belanja - diskon` |
| `>= Rp 1.000.000` |      **5%**       | `total_belanja * 5%`  | `total_belanja - diskon` |
| `>= Rp 2.000.000` |      **9%**       | `total_belanja * 9%`  | `total_belanja - diskon` |
| `>= Rp 3.000.000` |      **10%**      | `total_belanja * 10%` | `total_belanja - diskon` |
| `> Rp 4.000.000`  |      **20%**      | `total_belanja * 20%` | `total_belanja - diskon` |

---

## 📂 Project Structure

```text
├── server.js                          # Entry point (loads .env, starts listener)
├── package.json
├── .env.example                       # Environment variables template
├── .gitignore
├── src/
│   ├── app.js                         # Express app & Apollo Server configuration
│   ├── config/
│   │   └── database.js                # Sequelize MySQL connection
│   ├── models/
│   │   └── transaksi/
│   │       └── transaksiModel.js      # Sequelize model for transaksi (UUID, Decimal, Timestamps)
│   └── graphql/
│       ├── schema.js                  # Root GraphQL schema definition
│       └── transaksi/
│           ├── schema.js              # GraphQL schema for transaksi
│           └── resolvers.js           # Resolvers with discount logic & Rupiah formatters
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <YOUR_REPOSITORY_URL>
cd Kuis_ExpressJS
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (you can use `.env.example` as a reference):

```env
PORT=your_port (usually 3000 but depends)
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password if you have password
DB_HOST=localhost
DB_DIALECT=mysql or your database language
DB_TIMEZONE=+07:00 or whatever time you're on

```

### 3. Run Development Server

```bash
npm run dev
```

- **Health Check API**: [http://localhost:3000/](http://localhost:3000/)
- **Apollo GraphQL Sandbox**: [http://localhost:3000/graphql](http://localhost:3000/graphql)

---

## 🧪 GraphQL Query & Mutation Examples

### 1. Tambah Transaksi (Calculate Discount & Save)

```graphql
mutation {
  tambahTransaksi(total_belanja: 5000000) {
    id_transaksi
    total_belanja
    diskon_persen
    jumlah_diskon
    total_bayar
    created_at
    updated_at
    deleted_at
  }
}
```

**Response:**

```json
{
  "data": {
    "tambahTransaksi": {
      "id_transaksi": "1e4acf2e-bc52-4830-858b-796d6346c09b",
      "total_belanja": "Rp 5.000.000,00",
      "diskon_persen": "20%",
      "jumlah_diskon": "Rp 1.000.000,00",
      "total_bayar": "Rp 4.000.000,00",
      "created_at": "2026-10-15 20:09:35",
      "updated_at": "2026-10-15 20:09:35",
      "deleted_at": null
    }
  }
}
```

### 2. Get All Transaksi

```graphql
query {
  transaksi {
    id_transaksi
    total_belanja
    diskon_persen
    jumlah_diskon
    total_bayar
    created_at
  }
}
```

### 3. Soft Delete & Restore

```graphql
# Soft delete
mutation {
  deleteTransaksi(id: "<ID_TRANSAKSI>") {
    id_transaksi
    deleted_at
  }
}

# Restore
mutation {
  restoreTransaksi(id: "<ID_TRANSAKSI>") {
    id_transaksi
    deleted_at
  }
}
```

---

<div align="center">

Built by **𝗠𝗶𝙪𝗿𝗮** 🚀

</div>
