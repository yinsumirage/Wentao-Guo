// === Language & Theme ===
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const setLang = (lang) => {
  document.documentElement.lang = lang;
  const zh = lang.startsWith("zh");
  $$("[data-zh]").forEach((el) => {
    el.textContent = el.getAttribute("data-zh");
    el.style.display = "";
  });
  $$("[data-en]").forEach((el) => {
    if (!zh) {
      el.textContent = el.getAttribute("data-en");
    }
  });
  // toggled spans inside buttons
  $$(
    "#projects .filters button span[data-zh], #projects .filters button span[data-en]"
  ).forEach((sp) => {
    const isZh = sp.hasAttribute("data-zh");
    sp.style.display =
      (zh && isZh) || (!zh && sp.hasAttribute("data-en")) ? "" : "none";
  });
  localStorage.setItem("lang", lang);
};
const toggleTheme = () => {
  const now = document.documentElement.getAttribute("data-theme");
  const next = now === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
};
$("#langBtn").addEventListener("click", () => {
  setLang(document.documentElement.lang === "zh" ? "en" : "zh");
});
$("#themeBtn").addEventListener("click", toggleTheme);
(function initPrefs() {
  const lang = localStorage.getItem("lang") || "zh";
  const theme =
    localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setLang(lang);
  document.documentElement.setAttribute("data-theme", theme);
  $("#year").textContent = new Date().getFullYear();
  $("#updated").textContent = new Date().toISOString().slice(0, 10);
})();

// === Project filtering ===
function filterProjects(cat) {
  $$("#projGrid .proj").forEach((card) => {
    card.style.display =
      cat === "*" || card.getAttribute("data-cat") === cat ? "" : "none";
  });
}

// === Lightbox Galleries ===
const galleries = {
  hockensa: [
    "assets/papers/25_iros/image/抓取照片.png",
    "assets/papers/25_iros/image/展示图片.png",
    "assets/papers/25_iros/image/包络.png",
    "assets/papers/25_iros/image/手啊.png",
    "assets/papers/25_iros/image/新机构组合图.png",
    "assets/papers/25_iros/image/新机构下压图.png",
  ],
  hoeckend: [
    "assets/papers/25_robio/image/demo集合.png",
    "assets/papers/25_robio/image/照片.png",
    "assets/papers/25_robio/image/抓取照片.png",
    "assets/papers/25_robio/image/whole_hand.png",
    "assets/papers/25_robio/image/水平运动.png",
    "assets/papers/25_robio/image/包络运动.png",
    "assets/papers/25_robio/image/水平夹取力.png",
    "assets/papers/25_robio/image/自适应夹取力.png",
  ],
  srvariant: [
    "assets/papers/26_icra/image/照片.png"
  ],
};
let gKey = null,
  gIdx = 0;
function openGallery(key){
  gKey = key;
  gIdx = 0;
  document.getElementById('lbImg').src = galleries[key][0];
  const lb = document.getElementById('lightbox');
  lb.style.display = 'flex';
  lb.style.background = '#fff';      // ← 这里加
  //lb.style.backdropFilter = 'none';  // ← 这里加
}

function closeGallery() {
  $("#lightbox").style.display = "none";
  $("#lbImg").src = "";
}
function nextImg() {
  if (!gKey) return;
  gIdx = (gIdx + 1) % galleries[gKey].length;
  $("#lbImg").src = galleries[gKey][gIdx];
}
function prevImg() {
  if (!gKey) return;
  gIdx = (gIdx - 1 + galleries[gKey].length) % galleries[gKey].length;
  $("#lbImg").src = galleries[gKey][gIdx];
}
