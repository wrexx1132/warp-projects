/* Local showcase player: full controls, seek, mute, fullscreen and per-language subtitles. */
(function () {
  'use strict';

  var LANGS = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
    { code: 'ja', label: '日本語' }
  ];

  /* Cues match the video timeline (seconds). The English captions are burned into the
     picture; everything else is drawn over a black band that covers the originals. */
  var CUES = {
    en: [
      [13.0, 17.1, 'Hello guys, today I’m gonna talk about what WARP Projects is.'],
      [17.2, 18.6, 'And who we are.'],
      [18.7, 20.8, 'So WARP Projects is a'],
      [21.7, 24.6, 'independent studio that publishes open-sourced projects.'],
      [25.3, 30.4, 'So we build them, document them and then clearly publish them.'],
      [31.1, 36.3, 'And yeah, we are not that many people — we are only like 5 people.'],
      [39.3, 43.7, 'Yeah, we tend to make people’s lives easier.'],
      [46.7, 49.4, 'Yeah, we’re gonna publish more projects soon.'],
      [49.6, 56.2, 'Take a look around our website and see.'],
      [58.3, 61.5, 'There are gonna be more projects soon, so'],
      [62.2, 64.7, 'stay tuned — and yeah, that’s it.'],
      [65.1, 66.3, 'I’m not very experienced with this, so sorry if I’m not clear enough :(']
    ],
    tr: [
      [13.0, 17.1, 'Selam arkadaşlar, bugün WARP Projects’in ne olduğundan bahsedeceğim.'],
      [17.2, 18.6, 'Ve biz kimiz.'],
      [18.7, 20.8, 'Yani WARP Projects,'],
      [21.7, 24.6, 'açık kaynak projeler yayınlayan bağımsız bir stüdyo.'],
      [25.3, 30.4, 'Onları geliştiriyoruz, belgeliyoruz ve sonra açıkça yayınlıyoruz.'],
      [31.1, 36.3, 'Ve evet, çok kalabalık değiliz — sadece 5 kişi gibiyiz.'],
      [39.3, 43.7, 'Evet, insanların hayatını kolaylaştırmaya çalışıyoruz.'],
      [46.7, 49.4, 'Evet, yakında daha fazla proje yayınlayacağız.'],
      [49.6, 56.2, 'Web sitemize bir göz atın ve görün.'],
      [58.3, 61.5, 'Yakında daha fazla proje olacak, yani'],
      [62.2, 64.7, 'takipte kalın — ve evet, bu kadar.'],
      [65.1, 66.3, 'Bu konuda çok deneyimli değilim, yeterince net olamadıysam kusura bakmayın :(']
    ],
    de: [
      [13.0, 17.1, 'Hallo Leute, heute erzähle ich, was WARP Projects eigentlich ist.'],
      [17.2, 18.6, 'Und wer wir sind.'],
      [18.7, 20.8, 'WARP Projects ist also ein'],
      [21.7, 24.6, 'unabhängiges Studio, das Open-Source-Projekte veröffentlicht.'],
      [25.3, 30.4, 'Wir bauen sie, dokumentieren sie und veröffentlichen sie dann klar.'],
      [31.1, 36.3, 'Und ja, wir sind nicht viele — wir sind nur etwa 5 Leute.'],
      [39.3, 43.7, 'Ja, wir versuchen, das Leben der Menschen einfacher zu machen.'],
      [46.7, 49.4, 'Ja, wir werden bald mehr Projekte veröffentlichen.'],
      [49.6, 56.2, 'Schaut euch auf unserer Website um und seht selbst.'],
      [58.3, 61.5, 'Es wird bald mehr Projekte geben, also'],
      [62.2, 64.7, 'bleibt dran — und ja, das war’s.'],
      [65.1, 66.3, 'Ich habe nicht viel Erfahrung damit, sorry, wenn ich mich nicht klar genug ausdrücke :(']
    ],
    fr: [
      [13.0, 17.1, 'Salut les gars, aujourd’hui je vais parler de ce qu’est WARP Projects.'],
      [17.2, 18.6, 'Et qui nous sommes.'],
      [18.7, 20.8, 'Donc WARP Projects est un'],
      [21.7, 24.6, 'studio indépendant qui publie des projets open source.'],
      [25.3, 30.4, 'On les crée, on les documente, puis on les publie clairement.'],
      [31.1, 36.3, 'Et oui, on n’est pas très nombreux — on est environ 5 personnes.'],
      [39.3, 43.7, 'Oui, on essaie de rendre la vie des gens plus simple.'],
      [46.7, 49.4, 'Oui, on va bientôt publier plus de projets.'],
      [49.6, 56.2, 'Jetez un œil à notre site et voyez par vous-même.'],
      [58.3, 61.5, 'Il y aura bientôt plus de projets, donc'],
      [62.2, 64.7, 'restez à l’écoute — et voilà, c’est tout.'],
      [65.1, 66.3, 'Je n’ai pas beaucoup d’expérience, désolé si je ne suis pas assez clair :(']
    ],
    es: [
      [13.0, 17.1, 'Hola chicos, hoy voy a hablar de qué es WARP Projects.'],
      [17.2, 18.6, 'Y quiénes somos.'],
      [18.7, 20.8, 'Así que WARP Projects es un'],
      [21.7, 24.6, 'estudio independiente que publica proyectos de código abierto.'],
      [25.3, 30.4, 'Los creamos, los documentamos y luego los publicamos claramente.'],
      [31.1, 36.3, 'Y sí, no somos muchos: solo somos como 5 personas.'],
      [39.3, 43.7, 'Sí, solemos hacer la vida de la gente más fácil.'],
      [46.7, 49.4, 'Sí, pronto vamos a publicar más proyectos.'],
      [49.6, 56.2, 'Echa un vistazo a nuestra web y compruébalo.'],
      [58.3, 61.5, 'Pronto habrá más proyectos, así que'],
      [62.2, 64.7, 'mantente atento, y sí, eso es todo.'],
      [65.1, 66.3, 'No tengo mucha experiencia con esto, perdón si no soy lo bastante claro :(']
    ],
    pt: [
      [13.0, 17.1, 'E aí, pessoal, hoje vou falar sobre o que é o WARP Projects.'],
      [17.2, 18.6, 'E quem nós somos.'],
      [18.7, 20.8, 'Então o WARP Projects é um'],
      [21.7, 24.6, 'estúdio independente que publica projetos de código aberto.'],
      [25.3, 30.4, 'A gente cria, documenta e depois publica tudo com clareza.'],
      [31.1, 36.3, 'E sim, não somos muitos — somos só umas 5 pessoas.'],
      [39.3, 43.7, 'Sim, a gente costuma facilitar a vida das pessoas.'],
      [46.7, 49.4, 'Sim, vamos publicar mais projetos em breve.'],
      [49.6, 56.2, 'Dê uma olhada no nosso site e veja.'],
      [58.3, 61.5, 'Vão existir mais projetos em breve, então'],
      [62.2, 64.7, 'fique ligado — e é isso.'],
      [65.1, 66.3, 'Não tenho muita experiência com isso, desculpa se eu não for claro o suficiente :(']
    ],
    ru: [
      [13.0, 17.1, 'Привет, ребята, сегодня я расскажу, что такое WARP Projects.'],
      [17.2, 18.6, 'И кто мы.'],
      [18.7, 20.8, 'Итак, WARP Projects — это'],
      [21.7, 24.6, 'независимая студия, которая публикует проекты с открытым кодом.'],
      [25.3, 30.4, 'Мы их создаём, документируем и затем открыто публикуем.'],
      [31.1, 36.3, 'И да, нас не так много — нас всего около 5 человек.'],
      [39.3, 43.7, 'Да, мы стараемся делать жизнь людей проще.'],
      [46.7, 49.4, 'Да, скоро мы выпустим больше проектов.'],
      [49.6, 56.2, 'Загляните на наш сайт и посмотрите сами.'],
      [58.3, 61.5, 'Скоро будет больше проектов, так что'],
      [62.2, 64.7, 'оставайтесь с нами — и да, это всё.'],
      [65.1, 66.3, 'У меня не так много опыта, извините, если объясняю не очень понятно :(']
    ],
    ja: [
      [13.0, 17.1, 'みなさんこんにちは、今日はWARP Projectsが何なのか話します。'],
      [17.2, 18.6, 'そして、私たちが誰なのか。'],
      [18.7, 20.8, 'WARP Projectsは'],
      [21.7, 24.6, 'オープンソースのプロジェクトを公開している独立系スタジオです。'],
      [25.3, 30.4, '作って、ドキュメントを整えて、わかりやすく公開します。'],
      [31.1, 36.3, 'そう、人数は多くなくて、5人くらいです。'],
      [39.3, 43.7, 'はい、みんなの生活を少し楽にしたいと思っています。'],
      [46.7, 49.4, 'はい、近いうちにもっとプロジェクトを公開します。'],
      [49.6, 56.2, '私たちのサイトを覗いてみてください。'],
      [58.3, 61.5, '近いうちにもっとプロジェクトが増えるので'],
      [62.2, 64.7, 'お楽しみに — 以上です。'],
      [65.1, 66.3, 'あまり経験がないので、うまく伝わらなかったらごめんね :(']
    ]
  };

  var LABELS = {
    en: { play: 'Play', pause: 'Pause', mute: 'Mute', unmute: 'Unmute', subs: 'Subtitles', off: 'Off', seek: 'Seek' },
    tr: { play: 'Oynat', pause: 'Duraklat', mute: 'Sesi kapat', unmute: 'Sesi aç', subs: 'Altyazı', off: 'Kapalı', seek: 'Ara' },
    de: { play: 'Abspielen', pause: 'Pause', mute: 'Ton aus', unmute: 'Ton an', subs: 'Untertitel', off: 'Aus', seek: 'Suchen' },
    fr: { play: 'Lecture', pause: 'Pause', mute: 'Couper le son', unmute: 'Activer le son', subs: 'Sous-titres', off: 'Désactivés', seek: 'Parcourir' },
    es: { play: 'Reproducir', pause: 'Pausa', mute: 'Silenciar', unmute: 'Activar sonido', subs: 'Subtítulos', off: 'Desactivados', seek: 'Buscar' },
    pt: { play: 'Reproduzir', pause: 'Pausar', mute: 'Silenciar', unmute: 'Ativar som', subs: 'Legendas', off: 'Desativadas', seek: 'Buscar' },
    ru: { play: 'Смотреть', pause: 'Пауза', mute: 'Без звука', unmute: 'Включить звук', subs: 'Субтитры', off: 'Выкл.', seek: 'Перемотка' },
    ja: { play: '再生', pause: '一時停止', mute: 'ミュート', unmute: 'ミュート解除', subs: '字幕', off: 'オフ', seek: 'シーク' }
  };

  function siteLang() {
    var l = (document.documentElement.getAttribute('lang') || '').toLowerCase().slice(0, 2);
    if (!CUES[l]) {
      try { l = (localStorage.getItem('warp.lang') || '').toLowerCase().slice(0, 2); } catch (e) {}
    }
    return CUES[l] ? l : 'en';
  }

  /* Subtitles are always on: the English captions burned into the picture are
     never shown, the localized line is always drawn in their place. */
  var cc = { lang: siteLang(), picked: false };
  var MASK_FROM = 12.35;
  var players = [];
  var frames = Array.prototype.slice.call(document.querySelectorAll('.video-frame'));

  function labels() { return LABELS[siteLang()] || LABELS.en; }

  function fmt(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60);
    var s = Math.floor(t % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function cueAt(t) {
    var list = CUES[cc.lang] || CUES.en;
    for (var i = 0; i < list.length; i++) {
      if (t >= list[i][0] && t < list[i][1]) return list[i][2];
    }
    return '';
  }

  function init(frame) {
    var video = frame.querySelector('video');
    if (!video) return;
    var inner = frame.querySelector('.video-inner');
    var cueEl = frame.querySelector('.vp-cue');
    var playBtn = frame.querySelector('.vp-play');
    var curEl = frame.querySelector('.vp-cur');
    var durEl = frame.querySelector('.vp-dur');
    var track = frame.querySelector('.vp-track');
    var buf = frame.querySelector('.vp-buf');
    var prog = frame.querySelector('.vp-prog');
    var knob = frame.querySelector('.vp-knob');
    var ccBtn = frame.querySelector('.vp-cc');
    var muteBtn = frame.querySelector('.vp-mute');
    var fullBtn = frame.querySelector('.video-full');
    var menu = frame.querySelector('.vp-menu');
    var centerBtn = frame.querySelector('.video-toggle');
    var togglePauseIcon = !!centerBtn;

    var api = {
      video: video,
      frame: frame,
      renderCue: renderCue,
      syncCc: syncCc,
      buildMenu: buildMenu
    };
    players.push(api);

    function isPlaying() { return !video.paused && !video.ended; }

    function toggle() {
      if (video.paused || video.ended) {
        players.forEach(function (p) {
          if (p.video !== video) p.video.pause();
        });
        var started = video.play();
        if (started && typeof started.catch === 'function') started.catch(function () {});
      } else {
        video.pause();
      }
    }

    function syncPlay() {
      var playing = isPlaying();
      frame.classList.toggle('is-playing', playing);
      if (playBtn) {
        playBtn.classList.toggle('is-paused', !playing);
        playBtn.setAttribute('aria-label', labels()[playing ? 'pause' : 'play']);
      }
      if (centerBtn) {
        centerBtn.setAttribute('aria-label', labels()[playing ? 'pause' : 'play']);
        centerBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      }
    }

    function renderCue() {
      if (!cueEl) return;
      var t = video.currentTime || 0;
      var text = cueAt(t);
      cueEl.textContent = text;
      cueEl.classList.toggle('is-on', !!text);
      frame.classList.toggle('has-cue', !!text);
      /* the caption band of the picture is always covered, so the burned-in
         English line can never appear, not even for a frame */
      if (inner) inner.classList.toggle('is-masked', t >= MASK_FROM);
    }

    function syncTime() {
      var d = video.duration;
      var t = video.currentTime || 0;
      if (curEl) curEl.textContent = fmt(t);
      if (durEl) durEl.textContent = isFinite(d) ? fmt(d) : '0:00';
      var ratio = isFinite(d) && d > 0 ? t / d : 0;
      if (prog) prog.style.transform = 'scaleX(' + ratio + ')';
      if (knob) knob.style.left = (ratio * 100).toFixed(3) + '%';
      if (track) {
        track.setAttribute('aria-valuenow', Math.round(ratio * 100));
        track.setAttribute('aria-valuetext', fmt(t) + ' / ' + (isFinite(d) ? fmt(d) : '0:00'));
      }
      if (buf) {
        var b = 0;
        try {
          if (video.buffered && video.buffered.length) b = video.buffered.end(video.buffered.length - 1) / d;
        } catch (e) {}
        buf.style.transform = 'scaleX(' + Math.min(1, isFinite(b) ? b : 0) + ')';
      }
      renderCue();
    }

    function syncMute() {
      if (!muteBtn) return;
      muteBtn.classList.toggle('is-muted', video.muted || video.volume === 0);
      muteBtn.setAttribute('aria-label', labels()[video.muted ? 'unmute' : 'mute']);
    }

    function buildMenu() {
      if (!menu) return;
      menu.innerHTML = '';
      LANGS.forEach(function (lang) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'vp-mi';
        b.setAttribute('role', 'menuitemradio');
        b.setAttribute('aria-checked', String(cc.lang === lang.code));
        b.innerHTML = '<span class="vp-mi-name">' + lang.label + '</span><span class="vp-mi-tick" aria-hidden="true">✓</span>';
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          cc.lang = lang.code;
          cc.picked = true;
          closeMenu();
          players.forEach(function (p) { p.renderCue(); p.syncCc(); });
        });
        menu.appendChild(b);
      });
    }

    function syncCc() {
      if (ccBtn) {
        ccBtn.classList.add('is-on');
        ccBtn.setAttribute('aria-label', labels().subs);
      }
      if (menu) {
        Array.prototype.forEach.call(menu.querySelectorAll('.vp-mi'), function (el, i) {
          el.setAttribute('aria-checked', String(!!LANGS[i] && cc.lang === LANGS[i].code));
        });
      }
    }

    var closeTimer = null;
    function openMenu() {
      if (!menu) return;
      menu.hidden = false;
      ccBtn.setAttribute('aria-expanded', 'true');
      frame.classList.add('is-menu-open');
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closeMenu, 8000);
    }
    function closeMenu() {
      if (!menu) return;
      menu.hidden = true;
      if (ccBtn) ccBtn.setAttribute('aria-expanded', 'false');
      frame.classList.remove('is-menu-open');
      clearTimeout(closeTimer);
    }
    api.closeMenu = closeMenu;

    if (ccBtn) {
      ccBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (menu && !menu.hidden) closeMenu();
        else openMenu();
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggle();
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        video.muted = !video.muted;
        syncMute();
      });
    }

    frame.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.closest && (t.closest('a') || t.closest('.video-full') || t.closest('.vp-bar') ||
          t.closest('.vp-menu'))) return;
      e.preventDefault();
      closeMenu();
      toggle();
    });

    /* click / drag on the progress track */
    var dragging = false;
    function seekTo(clientX) {
      var r = track.getBoundingClientRect();
      if (!r.width || !isFinite(video.duration)) return;
      var ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      video.currentTime = ratio * video.duration;
      syncTime();
    }
    if (track) {
      track.addEventListener('pointerdown', function (e) {
        e.stopPropagation();
        e.preventDefault();
        dragging = true;
        frame.classList.add('is-seek');
        try { track.setPointerCapture(e.pointerId); } catch (err) {}
        seekTo(e.clientX);
      });
      track.addEventListener('pointermove', function (e) {
        if (dragging) seekTo(e.clientX);
      });
      track.addEventListener('pointerup', function (e) {
        dragging = false;
        frame.classList.remove('is-seek');
        try { track.releasePointerCapture(e.pointerId); } catch (err) {}
      });
      track.addEventListener('pointercancel', function () {
        dragging = false;
        frame.classList.remove('is-seek');
      });
      track.addEventListener('keydown', function (e) {
        var step = 5;
        if (e.key === 'ArrowRight') { video.currentTime = Math.min(video.duration || 0, video.currentTime + step); e.preventDefault(); }
        else if (e.key === 'ArrowLeft') { video.currentTime = Math.max(0, video.currentTime - step); e.preventDefault(); }
        else if (e.key === 'Home') { video.currentTime = 0; e.preventDefault(); }
        else if (e.key === 'End') { video.currentTime = Math.max(0, (video.duration || 0) - 0.4); e.preventDefault(); }
        syncTime();
      });
    }

    /* fullscreen */
    if (fullBtn) {
      fullBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        markHintDone();
        closeMenu();
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

    /* corner LEDs */
    var leds = {
      tl: frame.querySelector('.led-tl'),
      tr: frame.querySelector('.led-tr'),
      bl: frame.querySelector('.led-bl'),
      br: frame.querySelector('.led-br')
    };
    var REACH = 190;
    frame.addEventListener('pointermove', function (e) {
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
        if (!leds[k]) return;
        var v = 1 - dist[k] / REACH;
        leds[k].style.opacity = v > 0 ? (v * 0.95).toFixed(3) : '0';
      });
    });
    frame.addEventListener('pointerleave', function () {
      Object.keys(leds).forEach(function (k) { if (leds[k]) leds[k].style.opacity = '0'; });
    });

    /* show the control bar while the pointer moves */
    var uiTimer = null;
    if (inner) {
      inner.addEventListener('pointermove', function () {
        inner.classList.add('is-ui');
        clearTimeout(uiTimer);
        uiTimer = setTimeout(function () { inner.classList.remove('is-ui'); }, 2600);
      });
      inner.addEventListener('pointerleave', function () {
        clearTimeout(uiTimer);
        inner.classList.remove('is-ui');
      });
    }

    video.addEventListener('play', syncPlay);
    video.addEventListener('pause', syncPlay);
    video.addEventListener('ended', syncPlay);
    video.addEventListener('timeupdate', syncTime);
    video.addEventListener('loadedmetadata', syncTime);
    video.addEventListener('seeked', syncTime);
    video.addEventListener('progress', syncTime);
    video.addEventListener('volumechange', syncMute);

    buildMenu();
    syncPlay();
    syncTime();
    syncMute();
    syncCc();
  }

  frames.forEach(init);

  /* The desktop hint mentions F / F11: hide it for good once either is used. */
  function markHintDone() {
    frames.forEach(function (frame) { frame.classList.add('is-hint-done'); });
  }

  /* Desktop only: nudge the hint in once the video is actually on screen. */
  var hintMq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)');
  if ('IntersectionObserver' in window && frames.length) {
    var nudgeTimer = 0;
    var hintIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var frame = entry.target;
        if (!entry.isIntersecting || !hintMq.matches) return;
        hintIo.unobserve(frame);
        if (frame.classList.contains('is-hint-done')) return;
        frame.classList.add('is-hint-nudge');
        clearTimeout(nudgeTimer);
        nudgeTimer = setTimeout(function () {
          frame.classList.remove('is-hint-nudge');
        }, 5200);
      });
    }, { threshold: 0.45 });
    frames.forEach(function (frame) { hintIo.observe(frame); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'F11') { markHintDone(); return; }
    if (e.key !== 'f' && e.key !== 'F') return;
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var frame = frames[0];
    if (!frame || !frame.offsetParent) return;
    markHintDone();
    e.preventDefault();
    var doc = document;
    if (doc.fullscreenElement === frame || doc.webkitFullscreenElement === frame) {
      (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
    } else if (frame.requestFullscreen) {
      var req = frame.requestFullscreen();
      if (req && typeof req.catch === 'function') req.catch(function () {});
    } else if (frame.webkitRequestFullscreen) {
      frame.webkitRequestFullscreen();
    }
  });

  /* Keep the fullscreen icon and labels in sync (Esc included). */
  function syncFullscreen() {
    var current = document.fullscreenElement || document.webkitFullscreenElement || null;
    frames.forEach(function (frame) {
      var on = current === frame;
      frame.classList.toggle('is-fullscreen', on);
      if (on) frame.classList.add('is-hint-done');
      var btn = frame.querySelector('.video-full');
      if (btn) {
        btn.setAttribute('aria-label', on ? 'Exit fullscreen' : 'Fullscreen');
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    });
  }

  document.addEventListener('fullscreenchange', syncFullscreen);
  document.addEventListener('webkitfullscreenchange', syncFullscreen);

  /* Close an open subtitle menu when clicking anywhere else. */
  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && (e.target.closest('.vp-cc') || e.target.closest('.vp-menu'))) return;
    players.forEach(function (p) { if (p.closeMenu) p.closeMenu(); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') players.forEach(function (p) { if (p.closeMenu) p.closeMenu(); });
  });

  /* Site language changed: follow it unless the visitor picked a subtitle language. */
  var langObserver = new MutationObserver(function () {
    if (cc.picked) return;
    var l = siteLang();
    if (l === cc.lang) return;
    cc.lang = l;
    players.forEach(function (p) { p.buildMenu(); p.syncCc(); p.renderCue(); });
  });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  /* Leaving the page or switching tabs stops playback. */
  window.addEventListener('hashchange', function () {
    players.forEach(function (p) { p.video.pause(); });
  });
})();
