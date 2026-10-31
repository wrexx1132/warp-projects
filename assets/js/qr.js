/* Footer QR card: encodes the page you are on and can be copied or downloaded. */
(function () {
  'use strict';

  var canvas = document.getElementById('qrCanvas');
  if (!canvas) return;

  var urlEl = document.getElementById('qrUrl');
  var pageEl = document.getElementById('qrPage');
  var copyBtn = document.getElementById('qrCopy');
  var dlBtn = document.getElementById('qrDownload');
  var toastEl = document.getElementById('toast');
  var toastText = document.getElementById('toastText');
  var toastTimer = null;

  function txt(key, fallback) {
    var el = document.querySelector('[data-i18n="' + key + '"]');
    var v = el ? el.textContent.trim() : '';
    return v || fallback;
  }

  function toast(message) {
    if (!toastEl || !toastText) return;
    toastText.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 3200);
  }

  function hashNow() {
    var h = (location.hash || '').replace('#', '');
    return h || 'home';
  }

  function pageName(h) {
    if (h.indexOf('project-') === 0) {
      var name = document.getElementById('pjName');
      return name ? name.textContent.trim() : h.slice(8);
    }
    var link = document.querySelector('.foot-link[href="#' + h + '"] [data-i18n]');
    if (link && link.textContent.trim()) return link.textContent.trim();
    return document.title;
  }

  function pageUrl(h) {
    var base = location.protocol === 'file:' ? location.href.split('#')[0] : location.origin + location.pathname;
    return base + '#' + h;
  }

  function draw(url) {
    if (typeof qrcode !== 'function') return false;
    var qr = qrcode(0, 'M');
    qr.addData(url, 'Byte');
    qr.make();

    var count = qr.getModuleCount();
    var quiet = 4;
    var total = count + quiet * 2;
    var target = 512;
    var cell = Math.max(2, Math.floor(target / total));
    var size = cell * total;

    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#0b0b0b';
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect((c + quiet) * cell, (r + quiet) * cell, cell, cell);
        }
      }
    }
    return true;
  }

  var lastKey = '';

  function update() {
    var h = hashNow();
    var url = pageUrl(h);
    var name = pageName(h);
    if (url + '|' + name === lastKey) return;
    lastKey = url + '|' + name;
    if (!draw(url)) return;
    if (urlEl) urlEl.textContent = url.replace(/^https?:\/\//, '');
    if (pageEl) pageEl.textContent = name;
    canvas.setAttribute('aria-label', 'QR code for ' + name);
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }

  function copyImage() {
    if (!canvas.toBlob || typeof ClipboardItem === 'undefined' || !navigator.clipboard || !navigator.clipboard.write) {
      copyLink();
      return;
    }
    canvas.toBlob(function (blob) {
      if (!blob) { copyLink(); return; }
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(function () { toast(txt('qr.copied', 'QR code copied')); })
        .catch(function () { copyLink(); });
    }, 'image/png');
  }

  function copyLink() {
    var url = pageUrl(hashNow());
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(function () { toast(txt('qr.linkCopied', 'Link copied')); })
        .catch(function () {
          if (legacyCopy(url)) toast(txt('qr.linkCopied', 'Link copied'));
          else toast(url);
        });
    } else if (legacyCopy(url)) {
      toast(txt('qr.linkCopied', 'Link copied'));
    } else {
      toast(url);
    }
  }

  function download() {
    var h = hashNow();
    canvas.toBlob(function (blob) {
      if (!blob) return;
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'warp-projects-qr-' + h.replace(/[^a-z0-9-]+/gi, '-').toLowerCase() + '.png';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1200);
      toast(txt('qr.saved', 'QR code downloaded'));
    }, 'image/png');
  }

  if (copyBtn) copyBtn.addEventListener('click', copyImage);
  if (dlBtn) dlBtn.addEventListener('click', download);

  window.addEventListener('hashchange', function () {
    lastKey = '';
    update();
  });
  window.addEventListener('popstate', function () {
    lastKey = '';
    update();
  });

  /* The site swaps views by toggling classes, so watch the views themselves. */
  var views = Array.prototype.slice.call(document.querySelectorAll('.view'));
  var pending = 0;
  function schedule() {
    clearTimeout(pending);
    pending = setTimeout(update, 90);
  }
  if (window.MutationObserver && views.length) {
    var obs = new MutationObserver(schedule);
    views.forEach(function (v) { obs.observe(v, { attributes: true, attributeFilter: ['class', 'hidden'] }); });
  }

  /* Keep the page name in the card in sync with the chosen language. */
  var lang = document.documentElement.getAttribute('lang');
  if (window.MutationObserver) {
    new MutationObserver(function () {
      var now = document.documentElement.getAttribute('lang');
      if (now === lang) return;
      lang = now;
      lastKey = '';
      update();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  update();
})();
