/* Beta intro notice — shown once per browser unless "Don't show this again" is ticked. */
(function () {
  'use strict';

  var KEY = 'warp.intro.dismissed';
  var el = document.getElementById('intro');
  if (!el) return;

  var closeBtn = document.getElementById('introClose');
  var dontShow = document.getElementById('introDontShow');
  var enterBtn = document.getElementById('introEnter');
  var patchBtn = document.getElementById('introPatch');
  var lastFocus = null;

  function seen() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  function close() {
    if (dontShow && dontShow.checked) {
      try { localStorage.setItem(KEY, '1'); } catch (e) { /* storage unavailable */ }
    }
    el.classList.remove('is-open');
    document.documentElement.classList.remove('intro-lock');
    document.removeEventListener('keydown', onKey, true);
    window.setTimeout(function () { el.hidden = true; }, 360);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function onKey(e) {
    if (!el.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== 'Tab') return;

    var focusables = [closeBtn, enterBtn, patchBtn, dontShow].filter(Boolean);
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function open() {
    if (seen()) return;
    lastFocus = document.activeElement;
    el.hidden = false;
    document.documentElement.classList.add('intro-lock');
    void el.offsetWidth;
    el.classList.add('is-open');
    document.addEventListener('keydown', onKey, true);
    if (closeBtn) closeBtn.focus();
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (enterBtn) enterBtn.addEventListener('click', close);
  if (patchBtn) {
    patchBtn.addEventListener('click', function () {
      close();
      var tab = document.querySelector('.tab[data-view="patch"]');
      if (tab) tab.click();
    });
  }
  el.addEventListener('click', function (e) {
    if (e.target === el) close();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', open);
  } else {
    open();
  }
})();
