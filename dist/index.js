const btnDodaj = document.querySelector("#btnDodaj");
const inputOpis = document.querySelector("#opis");
const inputCifra = document.querySelector("#cifra");
const dostupanBudzet = document.querySelector("#dostupan-budzet");
const select = document.querySelector("#prihod-rashod");
const prihodTotal = document.querySelector("#prihod");
const rashodTotal = document.querySelector("#rashod");
let totalPrihod = 0;
let totalRashod = 0;
const podaci = [];

function formatNumber(num) {
  return Intl.NumberFormat().format(num);
}

function resetPolja() {
  inputOpis.value = "";
  inputCifra.value = "";
  select.value = "";
}

function plusMinus(n) {
  if (Number(n) <= 0) {
    return n;
  } else {
    return "+" + n;
  }
}

function proc(prihod, rashod) {
  if (rashod > 0) {
    return Math.round((rashod / prihod) * 100);
  } else {
    return "";
  }
}

function proveraBudzeta() {
  let budzet = totalPrihod - totalRashod;
  let formatiran = formatNumber(budzet);
  dostupanBudzet.innerHTML = `${plusMinus(formatiran)}`;
  prihodTotal.innerHTML = `+${formatNumber(totalPrihod)}`;
  rashodTotal.innerHTML = `-${formatNumber(
    totalRashod
  )} <span class='spanProcenat'>${proc(totalPrihod, totalRashod)}%</span>`;
}

function provera(podatak) {
  if (!podatak.opis == "" && podatak.iznos > 0) {
    return true;
  } else {
    console.log(`Proverite Unose`);
  }
}

const add = (podatak) => {
  if (podatak.tip == "prihod" && provera(podatak)) {
    totalPrihod += Number(podatak.iznos);
    const divPrihod = document.querySelector(".prihodi");
    const divPrihodList = document.createElement("div");

    const btnDel = document.createElement("button");
    btnDel.className = "btnDelPr";
    btnDel.innerHTML = "&#10008;";
    const p = document.createElement("p");
    p.className = "para";
    p.innerHTML = `
        ${podatak.opis}    +${formatNumber(podatak.iznos)}
        `;
    p.append(btnDel);
    divPrihodList.append(p);
    divPrihod.append(divPrihodList);
    btnDel.addEventListener("click", () => {
      totalPrihod -= podatak.iznos;
      p.remove();
      proveraBudzeta();
    });
  }
  if (podatak.tip == "rashod" && provera(podatak)) {
    totalRashod += Number(podatak.iznos);
    const divRashod = document.querySelector(".rashodi");
    const divRashodList = document.createElement("div");
    const btnDel = document.createElement("button");
    btnDel.className = "btnDelRa";
    btnDel.innerHTML = "&#10008;";
    const p = document.createElement("p");
    p.className = "para";
    p.innerHTML = `
        ${podatak.opis}    -${formatNumber(podatak.iznos)}   ${proc(
      totalPrihod,
      podatak.iznos
    )}%
        `;
    p.append(btnDel);
    divRashodList.append(p);
    divRashod.append(divRashodList);
    btnDel.addEventListener("click", () => {
      totalRashod -= podatak.iznos;
      p.remove();
      proveraBudzeta();
    });

    divRashod.append(divRashodList);
  }

  proveraBudzeta();
};

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



export {formatNumber, resetPolja, plusMinus, proc, proveraBudzeta, provera, add, btnDodaj, inputOpis, inputCifra, dostupanBudzet, select, prihodTotal, rashodTotal, totalPrihod, totalRashod, podaci}