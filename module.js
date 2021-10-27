import {
  formatNumber,
  resetPolja,
  plusMinus,
  proc,
  proveraBudzeta,
  provera,
  add,
  btnDodaj,
  inputOpis,
  inputCifra,
  dostupanBudzet,
  select,
  prihodTotal,
  rashodTotal,
  totalPrihod,
  totalRashod,
  podaci,
} from './index.js';

formatNumber
plusMinus
proc
provera
dostupanBudzet
prihodTotal
rashodTotal

btnDodaj.addEventListener("click", () => {
  let podatak = {
    tip: select.value,
    opis: inputOpis.value,
    iznos: inputCifra.value,
    tPrihod: totalPrihod,
    tRashod: totalRashod,
  };
  podaci.push(podatak);

  add(podatak);
  resetPolja();
  proveraBudzeta();
});
