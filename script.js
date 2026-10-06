const semboller = ["🍎", "🚗", "🐶", "⚽", "🌟", "🎸", "🍕", "🚀"];
const tahta = document.getElementById("tahta");
const hamleEl = document.getElementById("hamle");
const sureEl = document.getElementById("sure");
const mesaj = document.getElementById("mesaj");

let acikKartlar = [];
let hamle = 0;
let eslesen = 0;
let kilitli = false;
let sure = 0;
let zamanlayici = null;

function karistir(dizi) {
  const kopya = [...dizi];
  for (let i = kopya.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
  }
  return kopya;
}

function baslat() {
  clearInterval(zamanlayici);
  tahta.innerHTML = "";
  mesaj.textContent = "";
  acikKartlar = [];
  hamle = 0;
  eslesen = 0;
  sure = 0;
  kilitli = false;
  hamleEl.textContent = 0;
  sureEl.textContent = 0;

  karistir([...semboller, ...semboller]).forEach((sembol) => {
    const kart = document.createElement("div");
    kart.className = "kart";
    kart.dataset.sembol = sembol;
    kart.innerHTML = `<span class="on">${sembol}</span><span class="arka">❓</span>`;
    kart.addEventListener("click", () => kartTikla(kart));
    tahta.appendChild(kart);
  });
}

function kartTikla(kart) {
  if (kilitli || kart.classList.contains("acik") || kart.classList.contains("eslesti")) return;

  // İlk tıklamada süreyi başlat
  if (!zamanlayici || sure === 0 && hamle === 0 && acikKartlar.length === 0) {
    clearInterval(zamanlayici);
    zamanlayici = setInterval(() => {
      sure++;
      sureEl.textContent = sure;
    }, 1000);
  }

  kart.classList.add("acik");
  acikKartlar.push(kart);

  if (acikKartlar.length === 2) {
    hamle++;
    hamleEl.textContent = hamle;
    kilitli = true;
    const [a, b] = acikKartlar;

    if (a.dataset.sembol === b.dataset.sembol) {
      a.classList.replace("acik", "eslesti");
      b.classList.replace("acik", "eslesti");
      acikKartlar = [];
      kilitli = false;
      eslesen++;

      if (eslesen === semboller.length) {
        clearInterval(zamanlayici);
        mesaj.textContent = `🎉 Tebrikler! ${hamle} hamlede, ${sure} saniyede bitirdin.`;
      }
    } else {
      setTimeout(() => {
        a.classList.remove("acik");
        b.classList.remove("acik");
        acikKartlar = [];
        kilitli = false;
      }, 800);
    }
  }
}

document.getElementById("yeniden").addEventListener("click", baslat);
baslat();