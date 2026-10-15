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

module.exports = {
  hitungDiskon,
};
