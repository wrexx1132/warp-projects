/* Image protection: no right-click save, no open-in-new-tab, no drag, no long-press callout. */
(function () {
  'use strict';

  function isImage(target) {
    if (!target || !target.closest) return false;
    return !!target.closest('img, .member-avatar');
  }

  document.addEventListener('contextmenu', function (e) {
    if (isImage(e.target)) e.preventDefault();
  }, true);

  document.addEventListener('dragstart', function (e) {
    if (isImage(e.target)) e.preventDefault();
  }, true);

  document.addEventListener('selectstart', function (e) {
    if (isImage(e.target)) e.preventDefault();
  }, true);

  /* Stop middle-click "open image in new tab" link behaviour on avatars. */
  document.addEventListener('auxclick', function (e) {
    if (isImage(e.target)) e.preventDefault();
  }, true);
})();
