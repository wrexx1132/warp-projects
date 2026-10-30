(function () {
  try {
    var t = localStorage.getItem('warp.theme');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
    var l = localStorage.getItem('warp.lang');
    if (l) { document.documentElement.dataset.lang = l; document.documentElement.lang = l; }
  } catch (e) { /* storage unavailable */ }
})();
