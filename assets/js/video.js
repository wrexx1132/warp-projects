/* Local showcase player: one click toggles play/pause, corner LEDs follow the cursor. */
(function () {
  'use strict';

  var frames = Array.prototype.slice.call(document.querySelectorAll('.video-frame'));
  var videos = [];

  frames.forEach(function (frame) {
    var video = frame.querySelector('video');
    var button = frame.querySelector('.video-toggle');
    if (!video) return;
    videos.push(video);

    function sync() {
      var playing = !video.paused && !video.ended;
      frame.classList.toggle('is-playing', playing);
      if (button) {
        button.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
        button.setAttribute('aria-pressed', playing ? 'true' : 'false');
      }
    }

    function toggle() {
      if (video.paused || video.ended) {
        videos.forEach(function (other) {
          if (other !== video) other.pause();
        });
        var started = video.play();
        if (started && typeof started.catch === 'function') {
          started.catch(function () { /* autoplay blocked */ });
        }
      } else {
        video.pause();
      }
    }

    frame.addEventListener('click', function (e) {
      if (e.target && e.target.closest && (e.target.closest('a') || e.target.closest('.video-full'))) return;
      e.preventDefault();
      toggle();
    });

    /* Fullscreen: the top-right button expands the whole frame, Esc or the same button exits. */
    var fullBtn = frame.querySelector('.video-full');
    if (fullBtn) {
      fullBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var doc = document;
        if (doc.fullscreenElement === frame || doc.webkitFullscreenElement === frame) {
          (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
        } else if (frame.requestFullscreen) {
          var req = frame.requestFullscreen();
          if (req && typeof req.catch === 'function') req.catch(function () {});
        } else if (frame.webkitRequestFullscreen) {
          frame.webkitRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      });
    }

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    video.addEventListener('ended', sync);
    sync();

    /* Corner LEDs: the closer the pointer gets to a corner, the brighter it glows. */
    var inner = frame.querySelector('.video-inner');
    var leds = {
      tl: frame.querySelector('.led-tl'),
      tr: frame.querySelector('.led-tr'),
      bl: frame.querySelector('.led-bl'),
      br: frame.querySelector('.led-br')
    };
    var REACH = 190;

    function light(e) {
      if (!inner) return;
      var r = inner.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      var dist = {
        tl: Math.sqrt(x * x + y * y),
        tr: Math.sqrt((r.width - x) * (r.width - x) + y * y),
        bl: Math.sqrt(x * x + (r.height - y) * (r.height - y)),
        br: Math.sqrt((r.width - x) * (r.width - x) + (r.height - y) * (r.height - y))
      };
      Object.keys(leds).forEach(function (k) {
        var el = leds[k];
        if (!el) return;
        var v = 1 - dist[k] / REACH;
        el.style.opacity = v > 0 ? (v * 0.95).toFixed(3) : '0';
      });
    }

    function dim() {
      Object.keys(leds).forEach(function (k) {
        if (leds[k]) leds[k].style.opacity = '0';
      });
    }

    frame.addEventListener('pointermove', light);
    frame.addEventListener('pointerleave', dim);
  });

  /* Keep the fullscreen icon and labels in sync (Esc included). */
  function syncFullscreen() {
    var current = document.fullscreenElement || document.webkitFullscreenElement || null;
    frames.forEach(function (frame) {
      var on = current === frame;
      frame.classList.toggle('is-fullscreen', on);
      var btn = frame.querySelector('.video-full');
      if (btn) {
        btn.setAttribute('aria-label', on ? 'Exit fullscreen' : 'Fullscreen');
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    });
  }

  document.addEventListener('fullscreenchange', syncFullscreen);
  document.addEventListener('webkitfullscreenchange', syncFullscreen);

  /* Leaving the page or switching tabs stops playback. */
  window.addEventListener('hashchange', function () {
    videos.forEach(function (v) { v.pause(); });
  });
})();
