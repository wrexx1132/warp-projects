(function () {
  'use strict';

  var root = document.documentElement;

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ---------- flags ---------- */
  var FLAGS = {
    gb: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="40" fill="#012169"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="9"/><path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" stroke-width="4.5"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/></svg>',
    tr: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="40" fill="#E30A17"/><circle cx="23" cy="20" r="9.4" fill="#fff"/><circle cx="26.6" cy="20" r="7.5" fill="#E30A17"/><path d="M0 -4.4 L1.06 -1.46 L4.19 -1.36 L1.71 0.56 L2.59 3.56 L0 1.8 L-2.59 3.56 L-1.71 0.56 L-4.19 -1.36 L-1.06 -1.46 Z" transform="translate(36 20) scale(1.1)" fill="#fff"/></svg>',
    de: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="13.34" fill="#000"/><rect y="13.34" width="60" height="13.33" fill="#DD0000"/><rect y="26.67" width="60" height="13.33" fill="#FFCE00"/></svg>',
    fr: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="20" height="40" fill="#0055A4"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#EF4135"/></svg>',
    es: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/></svg>',
    pt: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="40" fill="#DA291C"/><rect width="24" height="40" fill="#046A38"/><circle cx="24" cy="20" r="7.4" fill="#FFE900"/><circle cx="24" cy="20" r="4.4" fill="#DA291C"/></svg>',
    ru: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="13.34" fill="#fff"/><rect y="13.34" width="60" height="13.33" fill="#0039A6"/><rect y="26.67" width="60" height="13.33" fill="#D52B1E"/></svg>',
    jp: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="10" fill="#BC002D"/></svg>'
  };

  var LANGS = [
    { code: 'en', name: 'English',   flag: 'gb' },
    { code: 'tr', name: 'Türkçe',    flag: 'tr' },
    { code: 'de', name: 'Deutsch',   flag: 'de' },
    { code: 'fr', name: 'Français',  flag: 'fr' },
    { code: 'es', name: 'Español',   flag: 'es' },
    { code: 'pt', name: 'Português', flag: 'pt' },
    { code: 'ru', name: 'Русский',   flag: 'ru' },
    { code: 'ja', name: '日本語',      flag: 'jp' }
  ];

  /* ---------- strings ---------- */
  var I18N = {
    en: {
      'nav.home': 'Main Menu',
      'nav.projects': 'Projects',
      'nav.members': 'Warp Projects Team',
      'nav.patch': 'Patch Notes',
      'nav.help': 'Help',
      'nav.event': 'Event',
      'event.kicker': 'Event',
      'event.title': 'Events and new projects',
      'event.sub': 'New drops, events and project reveals land here first. Keep an eye on this space.',
      'event.join': 'Join',
      'event.none': 'no event yet',
      'ann.aria': 'Announcement',
      'ann.label': 'ANNOUNCEMENT!',
      'ann.close': 'Close announcement',
      'help.title': 'Help',
      'help.sub': 'Small team, fast answers. Discord is the quickest way to reach us.',
      'help.p1': 'Use the ticket channels on our Discord server for:',
      'help.li1': 'Bug reports',
      'help.li2': 'Download or install problems',
      'help.li3': 'Feature ideas and project suggestions',
      'help.li4': 'Anything else',
      'help.p2': 'Open a ticket on our',
      'help.p3': 'server and we will get back to you.',
      'nav.license': 'License',
      'patch.kicker': 'Changelog',
      'patch.title': 'Patch Notes',
      'patch.lead': 'Every change to the site and projects, newest first.',
      'patch.badge': 'Updated · October 2026',
      'license.kicker': 'License',
      'license.title': 'Open source. Openly shared.',
      'license.body': 'Warp Projects are fully open source. As long as they are not used for malicious purposes, anyone is free to use, study and improve them. We accept no responsibility in any situation. Thank you for using our projects.',
      'license.p1t': 'Free to use',
      'license.p1': 'No account, no paywall, no tracking.',
      'license.p2t': 'Open to study',
      'license.p2': 'Read the code, fork it, learn from it.',
      'license.p3t': 'Use responsibly',
      'license.p3': 'No guarantee is provided for any other site or page outside ours, including in cases of misuse or modification.',
      'license.thanks': 'Thank you for using our projects.',
      'hero.sub': 'This site was built so you can download our projects, see exactly what is inside each one, and explore everything in detail before you commit. Thanks in advance for choosing us.',
      'projects.kicker': 'Library',
      'projects.title': 'Projects',
      'projects.sub': 'What we are building right now.',
      'projects.badge': 'Projects in development',
      'project.back': 'All projects',
      'project.video': 'Project video — coming soon',
      'project.screens': 'Screenshots',
      'project.about': 'About this project',
      'project.download': 'Download',
      'project.notReleased': 'Not released yet',
      'project.noInfo': 'No info yet',
      'project.noInfoSub': 'This project is not published yet. Details will appear here once it is ready.',
      'project.note': 'No account. No hassle. No ads.',
      'project.more': 'More projects',
      'project.developer': 'Developer',
      'project.released': 'Released',
      'project.updated': 'Last update',
      'project.version': 'Version',
      'project.size': 'Size',
      'project.license': 'License',
      'project.platform': 'Platform',
      'project.status': 'In development',
      'project.toast': 'This project is not published yet. Join our Discord to hear about the release first.',
      'members.kicker': 'Team',
      'members.title': 'Warp Projects Team',
      'members.sub': 'The people behind the projects.',
      'foot.title': 'Join the community',
      'foot.rights': 'All rights reserved.',
      'qr.kicker': 'Share',
      'qr.title': 'Scan to open this page',
      'qr.hint': 'Same code for everyone — it changes with the page you are on.',
      'qr.copy': 'Copy QR',
      'qr.download': 'Download PNG',
      'qr.copied': 'QR code copied',
      'qr.saved': 'QR code downloaded',
      'qr.linkCopied': 'Link copied',
      'theme.label': 'Switch theme',
      'lang.label': 'Change language',
      'common.soon': 'Coming soon',
      'foot.pages': 'Pages',
      'about.kicker': 'About',
      'about.title': 'About Warp Projects',
      'about.p1': 'Warp Projects is an independent studio that publishes open-source projects. That is what we do: build them, document them clearly and publish everything in one place.',
      'about.p2': 'Every release here is free to download. You can read what is inside, check the requirements and inspect the project before anything touches your machine — that is the whole point of this site.',
      'about.cta.projects': 'Explore projects',
      'about.cta.discord': 'Join the Discord',
      'video.kicker': 'Showcase',
      'video.title': 'Warp Projects in motion',
      'video.sub': 'A short walkthrough of what we build and how to use it.',
      'video.soon': 'Video coming soon',
      'faq.kicker': 'FAQ',
      'faq.title': 'Frequently asked questions',
      'faq.sub': 'Everything people ask us most, in one place. Still stuck? The Discord is always open.',
      'faq.q1': 'What exactly is Warp Projects?',
      'faq.a1': 'Warp Projects is an independent studio that publishes open-source projects. Everything we finish ends up here, free to download and inspect before you install anything.',
      'faq.q2': 'How do I download a project?',
      'faq.a2': 'Open the Projects tab, pick a project and read its page: what is included, the version, the platforms and any requirements. The download button is right there — no account and no waiting.',
      'faq.q3': 'Are the projects really free?',
      'faq.a3': 'Yes. Every public release on this site is free to download and use. There are no paid tiers, no locked files and no hidden ads — if a project ever changes, it will be clearly marked.',
      'faq.q4': 'Which platforms do you support?',
      'faq.a4': 'Most releases target Windows, with occasional web projects that run entirely in the browser. Each project page lists exactly what it supports, so you know before you download.',
      'faq.q5': 'How often are projects updated?',
      'faq.a5': 'Whenever there is something worth shipping. Big releases and fixes are announced on our Discord and YouTube, and each project page shows its latest version and date.',
      'faq.q6': 'Something is broken, or I have an idea. Where do I write?',
      'faq.a6': 'If you find a bug or have an idea, write to us on Discord. You can post your idea in the general channel and discuss it with the team. For a bug, open a ticket with detailed information and attach a screenshot so we can see exactly what went wrong. Thanks in advance!'
    },
    tr: {
      'nav.home': 'Ana Menü',
      'nav.projects': 'Projeler',
      'nav.members': 'Warp Projects Ekibi',
      'nav.patch': 'Yama Notları',
      'nav.help': 'Yardım',
      'nav.event': 'Etkinlik',
      'event.kicker': 'Etkinlik',
      'event.title': 'Etkinlikler ve yeni projeler',
      'event.sub': 'Yeni çıkışlar, etkinlikler ve proje tanıtımları ilk burada paylaşılır. Bu alanı takipte kal.',
      'event.join': 'Katıl',
      'event.none': 'etkinlik yok',
      'ann.aria': 'Duyuru',
      'ann.label': 'DUYURU!',
      'ann.close': 'Duyuruyu kapat',
      'help.title': 'Yardım',
      'help.sub': 'Küçük bir ekibiz, en hızlı yanıt Discord’da.',
      'help.p1': 'Discord sunucumuzdaki ticket kanallarını şunlar için kullanabilirsin:',
      'help.li1': 'Hata bildirimleri',
      'help.li2': 'İndirme veya kurulum sorunları',
      'help.li3': 'Özellik fikirleri ve proje önerileri',
      'help.li4': 'Diğer her şey',
      'help.p2': 'Biletini',
      'help.p3': 'sunucumuzda aç, sana dönelim.',
      'nav.license': 'Lisans',
      'patch.kicker': 'Değişiklikler',
      'patch.title': 'Yama Notları',
      'patch.lead': 'Site ve projelerdeki tüm değişiklikler, en yeniden eskiye.',
      'patch.badge': 'Güncellendi · Ekim 2026',
      'license.kicker': 'Lisans',
      'license.title': 'Açık kaynak. Açıkça paylaşıldı.',
      'license.body': 'Warp Projects projeleri tamamen açık kaynaktır. Kötü amaçlı kullanılmadığı sürece herkes tarafından özgürce kullanılabilir, incelenebilir ve geliştirilebilir. Herhangi bir durumda sorumluluk kabul edilmez. Projelerimizi kullandığınız için teşekkürler.',
      'license.p1t': 'Ücretsiz kullanım',
      'license.p1': 'Hesap yok, ödeme yok, takip yok.',
      'license.p2t': 'İncelemeye açık',
      'license.p2': 'Kodu oku, çatalla, öğren.',
      'license.p3t': 'Sorumlu kullan',
      'license.p3': 'Kötü kullanım veya değiştirilme durumlarında, bizim sayfamız dışındaki hiçbir sayfa için garanti verilmez.',
      'license.thanks': 'Projelerimizi kullandığınız için teşekkürler.',
      'hero.sub': 'Bu site, projelerimizi indirebilmeniz, tam olarak ne indireceğinizi detaylıca görebilmeniz ve her şeyi inceleyebilmeniz için tasarlandı. Şimdiden bizi tercih ettiğiniz için teşekkürler.',
      'projects.kicker': 'Kütüphane',
      'projects.title': 'Projeler',
      'projects.sub': 'Şu anda üzerinde çalıştığımız projeler.',
      'projects.badge': 'Geliştirme aşamasındaki projeler',
      'project.back': 'Tüm projeler',
      'project.video': 'Proje videosu — yakında',
      'project.screens': 'Ekran görüntüleri',
      'project.about': 'Bu proje hakkında',
      'project.download': 'İndir',
      'project.notReleased': 'Henüz yayınlanmadı',
      'project.noInfo': 'Henüz bilgi yok',
      'project.noInfoSub': 'Bu proje henüz yayınlanmadı. Hazır olduğunda detaylar burada görünecek.',
      'project.note': 'Hesap yok, uğraşma yok, reklam yok.',
      'project.more': 'Diğer projeler',
      'project.developer': 'Geliştirici',
      'project.released': 'Yayın tarihi',
      'project.updated': 'Son güncelleme',
      'project.version': 'Sürüm',
      'project.size': 'Boyut',
      'project.license': 'Lisans',
      'project.platform': 'Platform',
      'project.status': 'Geliştirme aşamasında',
      'project.toast': 'Bu proje henüz yayınlanmadı. Çıkışından ilk senin haberin olması için Discord’a katıl.',
      'members.kicker': 'Ekip',
      'members.title': 'Warp Projects Ekibi',
      'members.sub': 'Projelerin arkasındaki isimler.',
      'foot.title': 'Topluluğa katıl',
      'foot.rights': 'Tüm hakları saklıdır.',
      'qr.kicker': 'Paylaş',
      'qr.title': 'Bu sayfayı açmak için okut',
      'qr.hint': 'Herkes için aynı kod — bulunduğun sayfaya göre değişir.',
      'qr.copy': 'QR kopyala',
      'qr.download': 'PNG indir',
      'qr.copied': 'QR kod kopyalandı',
      'qr.saved': 'QR kod indirildi',
      'qr.linkCopied': 'Bağlantı kopyalandı',
      'theme.label': 'Temayı değiştir',
      'lang.label': 'Dili değiştir',
      'common.soon': 'Yakında',
      'foot.pages': 'Sayfalar',
      'about.kicker': 'Hakkında',
      'about.title': 'Warp Projects Hakkında',
      'about.p1': 'Warp Projects, açık kaynak projeler yayınlayan bağımsız bir stüdyodur. Yaptığımız iş bundan ibaret: projeleri geliştirir, net biçimde belgeler ve hepsini tek bir yerde yayınlarız.',
      'about.p2': 'Buradaki her sürüm ücretsiz indirilebilir. İçinde ne olduğunu okuyabilir, gereksinimleri kontrol edebilir ve bilgisayarınıza dokunmadan önce projeyi inceleyebilirsiniz — bu sitenin tüm amacı bu.',
      'about.cta.projects': 'Projeleri keşfet',
      'about.cta.discord': "Discord'a katıl",
      'video.kicker': 'Vitrin',
      'video.title': 'Warp Projects hareket halinde',
      'video.sub': 'Ne geliştirdiğimizi ve nasıl kullanıldığını gösteren kısa bir tur.',
      'video.soon': 'Video yakında',
      'faq.kicker': 'S.S.S.',
      'faq.title': 'Sıkça sorulan sorular',
      'faq.sub': 'En çok merak edilenler tek yerde. Hâlâ takıldıysan Discord her zaman açık.',
      'faq.q1': 'Warp Projects tam olarak nedir?',
      'faq.a1': 'Warp Projects, açık kaynak projeler yayınlayan küçük ve bağımsız bir stüdyodur. Tamamladığımız her şey burada: ücretsiz, kurmadan önce incelenebilir halde.',
      'faq.q2': 'Bir projeyi nasıl indiririm?',
      'faq.a2': 'Projeler sekmesini aç, bir proje seç ve sayfasını oku: nelerin dahil olduğunu, sürümü, platformları ve gereksinimleri görürsün. İndirme butonu tam orada — hesap yok, bekleme yok.',
      'faq.q3': 'Projeler gerçekten ücretsiz mi?',
      'faq.a3': 'Evet. Bu sitedeki tüm herkese açık sürümler ücretsizdir. Ücretli sürüm, kilitli dosya veya gizli reklam yok; bir şey değişirse açıkça belirtilir.',
      'faq.q4': 'Hangi platformları destekliyorsunuz?',
      'faq.a4': 'Sürümlerin çoğu Windows için; ara sıra tamamen tarayıcıda çalışan web projeleri de oluyor. Her proje sayfası neyi desteklediğini net şekilde listeler.',
      'faq.q5': 'Projeler ne sıklıkla güncelleniyor?',
      'faq.a5': 'Yayınlamaya değer bir şey olduğunda. Büyük sürümler ve düzeltmeler Discord ile YouTube üzerinden duyurulur; her proje sayfası son sürümü ve tarihini gösterir.',
      'faq.q6': 'Bir şey bozuk ya da bir fikrim var. Nereye yazmalıyım?',
      'faq.a6': 'Bir hata bulduğunda ya da aklında bir fikir varsa Discord’a yazabilirsin. Fikrini general kanalına yazabilir, ilgililerle tartışabilirsin. Bir hata için ticket açıp detaylı bilgi verebilir, görsel atarak hatayı görmemizi sağlayabilirsin. Şimdiden teşekkürler!'
    },
    de: {
      'nav.home': 'Hauptmenü',
      'nav.projects': 'Projekte',
      'nav.members': 'Warp Projects Team',
      'nav.patch': 'Patchnotes',
      'nav.help': 'Hilfe',
      'nav.event': 'Event',
      'event.kicker': 'Event',
      'event.title': 'Events und neue Projekte',
      'event.sub': 'Neue Releases, Events und Projektvorstellungen erscheinen zuerst hier. Schau hier regelmäßig vorbei.',
      'event.join': 'Beitreten',
      'event.none': 'noch kein Event',
      'ann.aria': 'Ankündigung',
      'ann.label': 'ANKÜNDIGUNG!',
      'ann.close': 'Ankündigung schließen',
      'help.title': 'Hilfe',
      'help.sub': 'Kleines Team, schnelle Antworten. Discord ist der schnellste Weg zu uns.',
      'help.p1': 'Nutze die Ticket-Kanäle auf unserem Discord-Server für:',
      'help.li1': 'Fehlerberichte',
      'help.li2': 'Download- oder Installationsprobleme',
      'help.li3': 'Feature-Ideen und Projektvorschläge',
      'help.li4': 'Alles andere',
      'help.p2': 'Öffne ein Ticket auf unserem',
      'help.p3': 'Server, wir melden uns bei dir.',
      'nav.license': 'Lizenz',
      'patch.kicker': 'Changelog',
      'patch.title': 'Patchnotes',
      'patch.lead': 'Alle Änderungen an Website und Projekten, neueste zuerst.',
      'patch.badge': 'Aktualisiert · Oktober 2026',
      'license.kicker': 'Lizenz',
      'license.title': 'Open Source. Offen geteilt.',
      'license.body': 'Die Projekte von Warp Projects sind vollständig Open Source. Solange sie nicht für böswillige Zwecke genutzt werden, darf sie jeder frei verwenden, untersuchen und verbessern. In keinem Fall übernehmen wir Haftung. Danke, dass du unsere Projekte nutzt.',
      'license.p1t': 'Frei nutzbar',
      'license.p1': 'Kein Konto, keine Bezahlschranke, kein Tracking.',
      'license.p2t': 'Offen zum Prüfen',
      'license.p2': 'Lies den Code, forke ihn, lerne daraus.',
      'license.p3t': 'Verantwortungsvoll nutzen',
      'license.p3': 'Für Seiten außerhalb unserer Website wird keine Garantie übernommen — auch nicht bei Missbrauch oder Veränderung.',
      'license.thanks': 'Danke, dass du unsere Projekte nutzt.',
      'hero.sub': 'Diese Seite wurde entwickelt, damit du unsere Projekte herunterladen, genau sehen kannst, was enthalten ist, und alles im Detail prüfen kannst. Danke, dass du dich für uns entschieden hast.',
      'projects.kicker': 'Bibliothek',
      'projects.title': 'Projekte',
      'projects.sub': 'Woran wir gerade arbeiten.',
      'projects.badge': 'Projekte in Entwicklung',
      'project.back': 'Alle Projekte',
      'project.video': 'Projektvideo — bald verfügbar',
      'project.screens': 'Screenshots',
      'project.about': 'Über dieses Projekt',
      'project.download': 'Download',
      'project.notReleased': 'Noch nicht veröffentlicht',
      'project.noInfo': 'Noch keine Info',
      'project.noInfoSub': 'Dieses Projekt ist noch nicht veröffentlicht. Details erscheinen hier, sobald es fertig ist.',
      'project.note': 'Kein Konto. Kein Aufwand. Keine Werbung.',
      'project.more': 'Weitere Projekte',
      'project.developer': 'Entwickler',
      'project.released': 'Veröffentlicht',
      'project.updated': 'Letztes Update',
      'project.version': 'Version',
      'project.size': 'Größe',
      'project.license': 'Lizenz',
      'project.platform': 'Plattform',
      'project.status': 'In Entwicklung',
      'project.toast': 'Dieses Projekt ist noch nicht veröffentlicht. Komm auf unseren Discord, um den Release zuerst zu erfahren.',
      'members.kicker': 'Team',
      'members.title': 'Warp Projects Team',
      'members.sub': 'Die Menschen hinter den Projekten.',
      'foot.title': 'Werde Teil der Community',
      'foot.rights': 'Alle Rechte vorbehalten.',
      'qr.kicker': 'Teilen',
      'qr.title': 'Scannen, um diese Seite zu öffnen',
      'qr.hint': 'Derselbe Code für alle — er ändert sich mit der Seite, auf der du bist.',
      'qr.copy': 'QR kopieren',
      'qr.download': 'PNG laden',
      'qr.copied': 'QR-Code kopiert',
      'qr.saved': 'QR-Code heruntergeladen',
      'qr.linkCopied': 'Link kopiert',
      'theme.label': 'Design wechseln',
      'lang.label': 'Sprache ändern',
      'common.soon': 'Demnächst',
      'foot.pages': 'Seiten',
      'about.kicker': 'Über uns',
      'about.title': 'Über Warp Projects',
      'about.p1': 'Warp Projects ist ein unabhängiges Studio, das Open-Source-Projekte veröffentlicht. Genau das ist unsere Arbeit: sie bauen, klar dokumentieren und alles an einem Ort veröffentlichen.',
      'about.p2': 'Jede Veröffentlichung hier ist kostenlos. Du kannst lesen, was enthalten ist, die Voraussetzungen prüfen und das Projekt ansehen, bevor etwas auf deinen Rechner kommt — genau dafür gibt es diese Seite.',
      'about.cta.projects': 'Projekte entdecken',
      'about.cta.discord': 'Dem Discord beitreten',
      'video.kicker': 'Einblick',
      'video.title': 'Warp Projects in Bewegung',
      'video.sub': 'Ein kurzer Rundgang durch das, was wir bauen, und wie man es benutzt.',
      'video.soon': 'Video folgt in Kürze',
      'faq.kicker': 'FAQ',
      'faq.title': 'Häufige Fragen',
      'faq.sub': 'Das Wichtigste an einem Ort. Noch Fragen? Der Discord ist immer offen.',
      'faq.q1': 'Was genau ist Warp Projects?',
      'faq.a1': 'Warp Projects ist ein kleines, unabhängiges Studio, das Open-Source-Projekte veröffentlicht. Alles, was fertig wird, landet hier: kostenlos und prüfbar, bevor du etwas installierst.',
      'faq.q2': 'Wie lade ich ein Projekt herunter?',
      'faq.a2': 'Öffne den Reiter Projekte, wähle ein Projekt und lies die Seite: Inhalt, Version, Plattformen und Voraussetzungen. Der Download-Button ist direkt dort — ohne Konto und ohne Wartezeit.',
      'faq.q3': 'Sind die Projekte wirklich kostenlos?',
      'faq.a3': 'Ja. Jede öffentliche Version auf dieser Seite ist kostenlos. Keine bezahlten Stufen, keine gesperrten Dateien, keine versteckte Werbung. Änderungen werden klar gekennzeichnet.',
      'faq.q4': 'Welche Plattformen werden unterstützt?',
      'faq.a4': 'Die meisten Versionen sind für Windows gedacht, gelegentlich gibt es Web-Projekte, die komplett im Browser laufen. Jede Projektseite listet genau, was unterstützt wird.',
      'faq.q5': 'Wie oft werden Projekte aktualisiert?',
      'faq.a5': 'Immer, wenn es etwas zu veröffentlichen gibt. Große Releases und Fixes kündigen wir auf Discord und YouTube an; jede Projektseite zeigt Version und Datum.',
      'faq.q6': 'Etwas ist kaputt oder ich habe eine Idee. Wohin damit?',
      'faq.a6': 'Wenn du einen Fehler findest oder eine Idee hast, schreib uns auf Discord. Deine Idee kannst du im General-Channel posten und mit dem Team besprechen. Für einen Fehler öffnest du ein Ticket mit detaillierten Infos und einem Screenshot, damit wir genau sehen, was schiefgelaufen ist. Danke im Voraus!'
    },
    fr: {
      'nav.home': 'Menu principal',
      'nav.projects': 'Projets',
      'nav.members': 'Équipe Warp Projects',
      'nav.patch': 'Notes de version',
      'nav.help': 'Aide',
      'nav.event': 'Événement',
      'event.kicker': 'Événement',
      'event.title': 'Événements et nouveaux projets',
      'event.sub': 'Les nouvelles sorties, événements et présentations de projets arrivent ici en premier. Garde un œil par ici.',
      'event.join': 'Rejoindre',
      'event.none': 'aucun événement',
      'ann.aria': 'Annonce',
      'ann.label': 'ANNONCE !',
      'ann.close': 'Fermer l’annonce',
      'help.title': 'Aide',
      'help.sub': 'Petite équipe, réponses rapides. Discord est le moyen le plus simple de nous joindre.',
      'help.p1': 'Utilise les salons de tickets sur notre serveur Discord pour :',
      'help.li1': 'Signaler un bug',
      'help.li2': 'Problèmes de téléchargement ou d’installation',
      'help.li3': 'Idées de fonctionnalités et suggestions de projets',
      'help.li4': 'Tout le reste',
      'help.p2': 'Ouvre un ticket sur notre',
      'help.p3': 'et nous te répondrons.',
      'nav.license': 'Licence',
      'patch.kicker': 'Journal des modifications',
      'patch.title': 'Notes de version',
      'patch.lead': "Toutes les modifications du site et des projets, les plus récentes d'abord.",
      'patch.badge': 'Mis à jour · octobre 2026',
      'license.kicker': 'Licence',
      'license.title': 'Open source. Partagé ouvertement.',
      'license.body': "Les projets Warp Projects sont entièrement open source. Tant qu'ils ne sont pas utilisés à des fins malveillantes, chacun est libre de les utiliser, de les étudier et de les améliorer. Nous déclinons toute responsabilité en toute circonstance. Merci d’utiliser nos projets.",
      'license.p1t': 'Libre d’utilisation',
      'license.p1': 'Pas de compte, pas de paywall, pas de suivi.',
      'license.p2t': 'Ouvert à l’étude',
      'license.p2': 'Lisez le code, forkez-le, apprenez-en.',
      'license.p3t': 'À utiliser avec responsabilité',
      'license.p3': "Aucune garantie n'est fournie pour les pages situées en dehors de notre site, y compris en cas de mauvaise utilisation ou de modification.",
      'license.thanks': 'Merci d’utiliser nos projets.',
      'hero.sub': "Ce site a été conçu pour que vous puissiez télécharger nos projets, voir précisément ce qu'ils contiennent et tout examiner en détail. Merci d'avance de nous avoir choisis.",
      'projects.kicker': 'Bibliothèque',
      'projects.title': 'Projets',
      'projects.sub': 'Ce que nous construisons en ce moment.',
      'projects.badge': 'Projets en développement',
      'project.back': 'Tous les projets',
      'project.video': 'Vidéo du projet — bientôt',
      'project.screens': 'Captures d’écran',
      'project.about': 'À propos de ce projet',
      'project.download': 'Télécharger',
      'project.notReleased': 'Pas encore publié',
      'project.noInfo': 'Pas encore d\'infos',
      'project.noInfoSub': 'Ce projet n\'est pas encore publié. Les détails apparaîtront ici dès qu\'il sera prêt.',
      'project.note': 'Sans compte. Sans effort. Sans pub.',
      'project.more': 'Autres projets',
      'project.developer': 'Développeur',
      'project.released': 'Sortie',
      'project.updated': 'Dernière mise à jour',
      'project.version': 'Version',
      'project.size': 'Taille',
      'project.license': 'Licence',
      'project.platform': 'Plateforme',
      'project.status': 'En développement',
      'project.toast': 'Ce projet n’est pas encore publié. Rejoins notre Discord pour être informé du lancement.',
      'members.kicker': 'Équipe',
      'members.title': 'Équipe Warp Projects',
      'members.sub': 'Les personnes derrière les projets.',
      'foot.title': 'Rejoignez la communauté',
      'foot.rights': 'Tous droits réservés.',
      'qr.kicker': 'Partager',
      'qr.title': 'Scannez pour ouvrir cette page',
      'qr.hint': 'Le même code pour tous — il change selon la page où vous êtes.',
      'qr.copy': 'Copier le QR',
      'qr.download': 'Télécharger PNG',
      'qr.copied': 'QR code copié',
      'qr.saved': 'QR code téléchargé',
      'qr.linkCopied': 'Lien copié',
      'theme.label': 'Changer de thème',
      'lang.label': 'Changer de langue',
      'common.soon': 'Bientôt',
      'foot.pages': 'Pages',
      'about.kicker': 'À propos',
      'about.title': 'À propos de Warp Projects',
      'about.p1': "Warp Projects est un studio indépendant qui publie des projets open source. C'est notre métier : les créer, les documenter clairement et tout publier au même endroit.",
      'about.p2': "Chaque version publiée ici est gratuite. Vous pouvez lire ce qu'elle contient, vérifier les prérequis et inspecter le projet avant qu'il n'arrive sur votre machine : c'est tout l'intérêt de ce site.",
      'about.cta.projects': 'Explorer les projets',
      'about.cta.discord': 'Rejoindre le Discord',
      'video.kicker': 'Aperçu',
      'video.title': 'Warp Projects en mouvement',
      'video.sub': 'Un court aperçu de ce que nous créons et de la façon de l’utiliser.',
      'video.soon': 'Vidéo bientôt disponible',
      'faq.kicker': 'FAQ',
      'faq.title': 'Questions fréquentes',
      'faq.sub': "Les questions les plus posées, au même endroit. Besoin d'aide ? Le Discord est toujours ouvert.",
      'faq.q1': "Qu'est-ce que Warp Projects exactement ?",
      'faq.a1': "Warp Projects est un petit studio indépendant qui publie des projets open source. Tout ce que nous terminons arrive ici, gratuitement et vérifiable avant l'installation.",
      'faq.q2': 'Comment télécharger un projet ?',
      'faq.a2': 'Ouvrez l’onglet Projets, choisissez un projet et lisez sa page : contenu, version, plateformes et prérequis. Le bouton de téléchargement est juste là, sans compte ni attente.',
      'faq.q3': 'Les projets sont-ils vraiment gratuits ?',
      'faq.a3': "Oui. Chaque version publique sur ce site est gratuite. Pas d'offre payante, pas de fichier verrouillé, pas de publicité cachée. Tout changement sera clairement indiqué.",
      'faq.q4': 'Quelles plateformes sont prises en charge ?',
      'faq.a4': 'La plupart des versions visent Windows, avec parfois des projets web qui tournent entièrement dans le navigateur. Chaque page indique précisément ce qui est pris en charge.',
      'faq.q5': 'À quelle fréquence les projets sont-ils mis à jour ?',
      'faq.a5': "Dès qu'il y a quelque chose à publier. Les grosses sorties et les correctifs sont annoncés sur Discord et YouTube, et chaque page affiche la version et la date.",
      'faq.q6': "Quelque chose ne marche pas, ou j'ai une idée. Où écrire ?",
      'faq.a6': 'Si vous trouvez un bug ou si vous avez une idée, écrivez-nous sur Discord. Vous pouvez poster votre idée dans le salon général et en discuter avec l’équipe. Pour un bug, ouvrez un ticket avec des détails et une capture d’écran pour qu’on voie exactement ce qui ne va pas. Merci d’avance !'
    },
    es: {
      'nav.home': 'Menú principal',
      'nav.projects': 'Proyectos',
      'nav.members': 'Equipo de Warp Projects',
      'nav.patch': 'Notas de parche',
      'nav.help': 'Ayuda',
      'nav.event': 'Evento',
      'event.kicker': 'Evento',
      'event.title': 'Eventos y nuevos proyectos',
      'event.sub': 'Los nuevos lanzamientos, eventos y presentaciones de proyectos llegan aquí primero. Mantente atento.',
      'event.join': 'Unirse',
      'event.none': 'sin evento',
      'ann.aria': 'Anuncio',
      'ann.label': '¡ANUNCIO!',
      'ann.close': 'Cerrar anuncio',
      'help.title': 'Ayuda',
      'help.sub': 'Equipo pequeño, respuestas rápidas. Discord es la forma más rápida de contactarnos.',
      'help.p1': 'Usa los canales de tickets de nuestro servidor de Discord para:',
      'help.li1': 'Informes de errores',
      'help.li2': 'Problemas de descarga o instalación',
      'help.li3': 'Ideas de funciones y sugerencias de proyectos',
      'help.li4': 'Cualquier otra cosa',
      'help.p2': 'Abre un ticket en nuestro',
      'help.p3': 'y te responderemos.',
      'nav.license': 'Licencia',
      'patch.kicker': 'Registro de cambios',
      'patch.title': 'Notas de parche',
      'patch.lead': 'Todos los cambios del sitio y los proyectos, los más recientes primero.',
      'patch.badge': 'Actualizado · octubre de 2026',
      'license.kicker': 'Licencia',
      'license.title': 'Código abierto. Compartido abiertamente.',
      'license.body': 'Los proyectos de Warp Projects son totalmente de código abierto. Siempre que no se usen con fines maliciosos, cualquiera puede usarlos, estudiarlos y mejorarlos libremente. No aceptamos ninguna responsabilidad en ningún caso. Gracias por usar nuestros proyectos.',
      'license.p1t': 'Uso libre',
      'license.p1': 'Sin cuenta, sin pago, sin rastreo.',
      'license.p2t': 'Abierto al estudio',
      'license.p2': 'Lee el código, haz un fork, aprende de él.',
      'license.p3t': 'Úsalo con responsabilidad',
      'license.p3': 'No se ofrece ninguna garantía para páginas fuera de nuestro sitio, tampoco en casos de uso indebido o modificación.',
      'license.thanks': 'Gracias por usar nuestros proyectos.',
      'hero.sub': 'Este sitio está diseñado para que puedas descargar nuestros proyectos, ver exactamente qué incluye cada uno y explorarlo todo con detalle. Gracias de antemano por elegirnos.',
      'projects.kicker': 'Biblioteca',
      'projects.title': 'Proyectos',
      'projects.sub': 'Lo que estamos construyendo ahora mismo.',
      'projects.badge': 'Proyectos en desarrollo',
      'project.back': 'Todos los proyectos',
      'project.video': 'Vídeo del proyecto — próximamente',
      'project.screens': 'Capturas',
      'project.about': 'Sobre este proyecto',
      'project.download': 'Descargar',
      'project.notReleased': 'Aún no publicado',
      'project.noInfo': 'Aún sin información',
      'project.noInfoSub': 'Este proyecto aún no está publicado. Los detalles aparecerán aquí cuando esté listo.',
      'project.note': 'Sin cuenta. Sin complicaciones. Sin anuncios.',
      'project.more': 'Más proyectos',
      'project.developer': 'Desarrollador',
      'project.released': 'Publicado',
      'project.updated': 'Última actualización',
      'project.version': 'Versión',
      'project.size': 'Tamaño',
      'project.license': 'Licencia',
      'project.platform': 'Plataforma',
      'project.status': 'En desarrollo',
      'project.toast': 'Este proyecto aún no está publicado. Únete a nuestro Discord para enterarte del lanzamiento.',
      'members.kicker': 'Equipo',
      'members.title': 'Equipo de Warp Projects',
      'members.sub': 'La gente detrás de los proyectos.',
      'foot.title': 'Únete a la comunidad',
      'foot.rights': 'Todos los derechos reservados.',
      'qr.kicker': 'Compartir',
      'qr.title': 'Escanea para abrir esta página',
      'qr.hint': 'El mismo código para todos: cambia según la página en la que estés.',
      'qr.copy': 'Copiar QR',
      'qr.download': 'Descargar PNG',
      'qr.copied': 'Código QR copiado',
      'qr.saved': 'Código QR descargado',
      'qr.linkCopied': 'Enlace copiado',
      'theme.label': 'Cambiar tema',
      'lang.label': 'Cambiar idioma',
      'common.soon': 'Muy pronto',
      'foot.pages': 'Páginas',
      'about.kicker': 'Acerca de',
      'about.title': 'Acerca de Warp Projects',
      'about.p1': 'Warp Projects es un estudio independiente que publica proyectos de código abierto. Eso es lo que hacemos: crearlos, documentarlos con claridad y publicarlo todo en un mismo lugar.',
      'about.p2': 'Cada versión publicada aquí es gratuita. Puedes leer qué incluye, revisar los requisitos e inspeccionar el proyecto antes de que llegue a tu equipo: de eso trata este sitio.',
      'about.cta.projects': 'Explorar proyectos',
      'about.cta.discord': 'Unirse al Discord',
      'video.kicker': 'Muestra',
      'video.title': 'Warp Projects en movimiento',
      'video.sub': 'Un recorrido breve por lo que creamos y cómo usarlo.',
      'video.soon': 'Vídeo muy pronto',
      'faq.kicker': 'FAQ',
      'faq.title': 'Preguntas frecuentes',
      'faq.sub': 'Lo que más nos preguntan, en un solo lugar. ¿Sigues con dudas? El Discord siempre está abierto.',
      'faq.q1': '¿Qué es exactamente Warp Projects?',
      'faq.a1': 'Warp Projects es un pequeño estudio independiente que publica proyectos de código abierto. Todo lo que terminamos llega aquí, gratis y revisable antes de instalar nada.',
      'faq.q2': '¿Cómo descargo un proyecto?',
      'faq.a2': 'Abre la pestaña Proyectos, elige uno y lee su página: contenido, versión, plataformas y requisitos. El botón de descarga está ahí mismo, sin cuenta y sin esperas.',
      'faq.q3': '¿Los proyectos son realmente gratis?',
      'faq.a3': 'Sí. Todas las versiones públicas de este sitio son gratuitas. Sin niveles de pago, sin archivos bloqueados y sin publicidad oculta. Si algo cambia, se indicará con claridad.',
      'faq.q4': '¿Qué plataformas son compatibles?',
      'faq.a4': 'La mayoría de las versiones son para Windows, con algún proyecto web que funciona por completo en el navegador. Cada página indica exactamente qué admite.',
      'faq.q5': '¿Cada cuánto se actualizan los proyectos?',
      'faq.a5': 'Siempre que haya algo que merezca la pena publicar. Los lanzamientos y arreglos se anuncian en Discord y YouTube, y cada página muestra la versión y la fecha.',
      'faq.q6': 'Algo no funciona o tengo una idea. ¿Dónde escribo?',
      'faq.a6': 'Si encuentras un error o tienes una idea, escríbenos en Discord. Puedes publicar tu idea en el canal general y comentarla con el equipo. Para un error, abre un ticket con información detallada y adjunta una captura para que veamos exactamente qué falla. ¡Gracias de antemano!'
    },
    pt: {
      'nav.home': 'Menu principal',
      'nav.projects': 'Projetos',
      'nav.members': 'Equipe da Warp Projects',
      'nav.patch': 'Notas de atualização',
      'nav.help': 'Ajuda',
      'nav.event': 'Evento',
      'event.kicker': 'Evento',
      'event.title': 'Eventos e novos projetos',
      'event.sub': 'Novos lançamentos, eventos e apresentações de projetos chegam aqui primeiro. Fique de olho.',
      'event.join': 'Entrar',
      'event.none': 'sem evento',
      'ann.aria': 'Anúncio',
      'ann.label': 'ANÚNCIO!',
      'ann.close': 'Fechar anúncio',
      'help.title': 'Ajuda',
      'help.sub': 'Equipe pequena, respostas rápidas. O Discord é o caminho mais rápido para falar com a gente.',
      'help.p1': 'Use os canais de ticket no nosso servidor do Discord para:',
      'help.li1': 'Relatos de bugs',
      'help.li2': 'Problemas de download ou instalação',
      'help.li3': 'Ideias de recursos e sugestões de projetos',
      'help.li4': 'Qualquer outra coisa',
      'help.p2': 'Abra um ticket no nosso',
      'help.p3': 'e responderemos.',
      'nav.license': 'Licença',
      'patch.kicker': 'Registro de alterações',
      'patch.title': 'Notas de atualização',
      'patch.lead': 'Todas as mudanças no site e nos projetos, da mais recente para a mais antiga.',
      'patch.badge': 'Atualizado · outubro de 2026',
      'license.kicker': 'Licença',
      'license.title': 'Código aberto. Compartilhado abertamente.',
      'license.body': 'Os projetos da Warp Projects são totalmente de código aberto. Desde que não sejam usados para fins maliciosos, qualquer pessoa pode usá-los, estudá-los e melhorá-los livremente. Não assumimos qualquer responsabilidade em nenhuma situação. Obrigado por usar nossos projetos.',
      'license.p1t': 'Livre para usar',
      'license.p1': 'Sem conta, sem pagamento, sem rastreamento.',
      'license.p2t': 'Aberto para estudo',
      'license.p2': 'Leia o código, faça um fork, aprenda com ele.',
      'license.p3t': 'Use com responsabilidade',
      'license.p3': 'Não há garantia para páginas fora do nosso site, inclusive em casos de uso indevido ou modificação.',
      'license.thanks': 'Obrigado por usar nossos projetos.',
      'hero.sub': 'Este site foi criado para que você baixe nossos projetos, veja exatamente o que está incluído e explore tudo em detalhes. Obrigado desde já por nos escolher.',
      'projects.kicker': 'Biblioteca',
      'projects.title': 'Projetos',
      'projects.sub': 'O que estamos construindo agora.',
      'projects.badge': 'Projetos em desenvolvimento',
      'project.back': 'Todos os projetos',
      'project.video': 'Vídeo do projeto — em breve',
      'project.screens': 'Capturas de tela',
      'project.about': 'Sobre este projeto',
      'project.download': 'Baixar',
      'project.notReleased': 'Ainda não publicado',
      'project.noInfo': 'Ainda sem informações',
      'project.noInfoSub': 'Este projeto ainda não foi publicado. Os detalhes aparecerão aqui quando estiver pronto.',
      'project.note': 'Sem conta. Sem complicação. Sem anúncios.',
      'project.more': 'Mais projetos',
      'project.developer': 'Desenvolvedor',
      'project.released': 'Lançamento',
      'project.updated': 'Última atualização',
      'project.version': 'Versão',
      'project.size': 'Tamanho',
      'project.license': 'Licença',
      'project.platform': 'Plataforma',
      'project.status': 'Em desenvolvimento',
      'project.toast': 'Este projeto ainda não foi publicado. Entre no nosso Discord para saber do lançamento primeiro.',
      'members.kicker': 'Equipe',
      'members.title': 'Equipe da Warp Projects',
      'members.sub': 'As pessoas por trás dos projetos.',
      'foot.title': 'Junte-se à comunidade',
      'foot.rights': 'Todos os direitos reservados.',
      'qr.kicker': 'Compartilhar',
      'qr.title': 'Escaneie para abrir esta página',
      'qr.hint': 'O mesmo código para todos — muda conforme a página em que você está.',
      'qr.copy': 'Copiar QR',
      'qr.download': 'Baixar PNG',
      'qr.copied': 'QR code copiado',
      'qr.saved': 'QR code baixado',
      'qr.linkCopied': 'Link copiado',
      'theme.label': 'Alternar tema',
      'lang.label': 'Alterar idioma',
      'common.soon': 'Em breve',
      'foot.pages': 'Páginas',
      'about.kicker': 'Sobre',
      'about.title': 'Sobre a Warp Projects',
      'about.p1': 'A Warp Projects é um estúdio independente que publica projetos de código aberto. É isso que fazemos: criá-los, documentá-los com clareza e publicar tudo num só lugar.',
      'about.p2': 'Cada versão publicada aqui é gratuita. Você pode ler o que está incluído, conferir os requisitos e inspecionar o projeto antes de instalar qualquer coisa — é exatamente para isso que este site existe.',
      'about.cta.projects': 'Explorar projetos',
      'about.cta.discord': 'Entrar no Discord',
      'video.kicker': 'Vitrine',
      'video.title': 'Warp Projects em movimento',
      'video.sub': 'Um passeio rápido pelo que criamos e como usar.',
      'video.soon': 'Vídeo em breve',
      'faq.kicker': 'FAQ',
      'faq.title': 'Perguntas frequentes',
      'faq.sub': 'O que mais perguntam, num só lugar. Ainda com dúvidas? O Discord está sempre aberto.',
      'faq.q1': 'O que é exatamente a Warp Projects?',
      'faq.a1': 'A Warp Projects é um pequeno estúdio independente que publica projetos de código aberto. Tudo o que terminamos vem parar aqui, de graça e pronto para inspecionar antes de instalar.',
      'faq.q2': 'Como faço para baixar um projeto?',
      'faq.a2': 'Abra a aba Projetos, escolha um projeto e leia a página: conteúdo, versão, plataformas e requisitos. O botão de download fica ali mesmo, sem conta e sem espera.',
      'faq.q3': 'Os projetos são realmente gratuitos?',
      'faq.a3': 'Sim. Todas as versões públicas deste site são gratuitas. Sem planos pagos, sem arquivos bloqueados e sem anúncios escondidos. Qualquer mudança será indicada com clareza.',
      'faq.q4': 'Quais plataformas são suportadas?',
      'faq.a4': 'A maioria das versões é para Windows, com alguns projetos web que rodam inteiramente no navegador. Cada página lista exatamente o que é suportado.',
      'faq.q5': 'Com que frequência os projetos são atualizados?',
      'faq.a5': 'Sempre que houver algo que valha a pena publicar. Lançamentos e correções são anunciados no Discord e no YouTube, e cada página mostra a versão e a data.',
      'faq.q6': 'Algo quebrou ou tenho uma ideia. Onde escrevo?',
      'faq.a6': 'Se você encontrar um bug ou tiver uma ideia, fale com a gente no Discord. Você pode postar sua ideia no canal geral e discutir com a equipe. Para um bug, abra um ticket com informações detalhadas e envie um print para que a gente veja exatamente o que aconteceu. Obrigado desde já!'
    },
    ru: {
      'nav.home': 'Главное меню',
      'nav.projects': 'Проекты',
      'nav.members': 'Команда Warp Projects',
      'nav.patch': 'Патчноуты',
      'nav.help': 'Помощь',
      'nav.event': 'Событие',
      'event.kicker': 'Событие',
      'event.title': 'События и новые проекты',
      'event.sub': 'Новые релизы, события и презентации проектов появляются здесь первыми. Следите за обновлениями.',
      'event.join': 'Присоединиться',
      'event.none': 'событий пока нет',
      'ann.aria': 'Объявление',
      'ann.label': 'ОБЪЯВЛЕНИЕ!',
      'ann.close': 'Закрыть объявление',
      'help.title': 'Помощь',
      'help.sub': 'Маленькая команда, быстрые ответы. Discord — самый быстрый способ связаться с нами.',
      'help.p1': 'Используй каналы тикетов на нашем сервере Discord для:',
      'help.li1': 'Сообщений об ошибках',
      'help.li2': 'Проблем со скачиванием или установкой',
      'help.li3': 'Идей функций и предложений проектов',
      'help.li4': 'Всего остального',
      'help.p2': 'Открой тикет на нашем',
      'help.p3': '— мы ответим.',
      'nav.license': 'Лицензия',
      'patch.kicker': 'Журнал изменений',
      'patch.title': 'Патчноуты',
      'patch.lead': 'Все изменения сайта и проектов — сначала новые.',
      'patch.badge': 'Обновлено · октябрь 2026',
      'license.kicker': 'Лицензия',
      'license.title': 'Открытый код. Открыто для всех.',
      'license.body': 'Проекты Warp Projects полностью открыты. Пока они не используются в злонамеренных целях, любой может свободно использовать, изучать и улучшать их. Мы не несём ответственности ни в каких ситуациях. Спасибо, что пользуетесь нашими проектами.',
      'license.p1t': 'Свободное использование',
      'license.p1': 'Без аккаунта, оплаты и отслеживания.',
      'license.p2t': 'Открыто для изучения',
      'license.p2': 'Читайте код, форкайте, учитесь.',
      'license.p3t': 'Используйте ответственно',
      'license.p3': 'Гарантия не предоставляется для страниц за пределами нашего сайта, в том числе при неправильном использовании или изменении.',
      'license.thanks': 'Спасибо, что пользуетесь нашими проектами.',
      'hero.sub': 'Этот сайт создан для того, чтобы вы могли скачивать наши проекты, подробно видеть, что в них входит, и изучать всё заранее. Спасибо, что выбираете нас.',
      'projects.kicker': 'Библиотека',
      'projects.title': 'Проекты',
      'projects.sub': 'Над чем мы работаем прямо сейчас.',
      'projects.badge': 'Проекты в разработке',
      'project.back': 'Все проекты',
      'project.video': 'Видео проекта — скоро',
      'project.screens': 'Скриншоты',
      'project.about': 'О проекте',
      'project.download': 'Скачать',
      'project.notReleased': 'Ещё не опубликовано',
      'project.noInfo': 'Пока нет информации',
      'project.noInfoSub': 'Этот проект ещё не опубликован. Детали появятся здесь, когда он будет готов.',
      'project.note': 'Без аккаунта. Без возни. Без рекламы.',
      'project.more': 'Другие проекты',
      'project.developer': 'Разработчик',
      'project.released': 'Дата выхода',
      'project.updated': 'Последнее обновление',
      'project.version': 'Версия',
      'project.size': 'Размер',
      'project.license': 'Лицензия',
      'project.platform': 'Платформа',
      'project.status': 'В разработке',
      'project.toast': 'Этот проект ещё не опубликован. Заходи в наш Discord, чтобы узнать о релизе первым.',
      'members.kicker': 'Команда',
      'members.title': 'Команда Warp Projects',
      'members.sub': 'Люди, стоящие за проектами.',
      'foot.title': 'Присоединяйтесь к сообществу',
      'foot.rights': 'Все права защищены.',
      'qr.kicker': 'Поделиться',
      'qr.title': 'Сканируйте, чтобы открыть эту страницу',
      'qr.hint': 'Один код для всех — он меняется вместе со страницей, на которой вы находитесь.',
      'qr.copy': 'Копировать QR',
      'qr.download': 'Скачать PNG',
      'qr.copied': 'QR-код скопирован',
      'qr.saved': 'QR-код скачан',
      'qr.linkCopied': 'Ссылка скопирована',
      'theme.label': 'Сменить тему',
      'lang.label': 'Сменить язык',
      'common.soon': 'Скоро',
      'foot.pages': 'Страницы',
      'about.kicker': 'О нас',
      'about.title': 'О Warp Projects',
      'about.p1': 'Warp Projects — независимая студия, которая публикует проекты с открытым исходным кодом. Именно этим мы и занимаемся: создаём их, понятно документируем и публикуем всё в одном месте.',
      'about.p2': 'Каждый релиз здесь бесплатный. Вы можете прочитать, что входит в проект, проверить требования и изучить его до того, как что-то попадёт на ваш компьютер — ради этого сайт и сделан.',
      'about.cta.projects': 'Смотреть проекты',
      'about.cta.discord': 'Присоединиться к Discord',
      'video.kicker': 'Витрина',
      'video.title': 'Warp Projects в движении',
      'video.sub': 'Короткий обзор того, что мы делаем и как этим пользоваться.',
      'video.soon': 'Видео скоро появится',
      'faq.kicker': 'FAQ',
      'faq.title': 'Частые вопросы',
      'faq.sub': 'Самое частое — в одном месте. Остались вопросы? Discord всегда открыт.',
      'faq.q1': 'Что такое Warp Projects?',
      'faq.a1': 'Warp Projects — небольшая независимая студия, которая публикует проекты с открытым исходным кодом. Всё готовое появляется здесь: бесплатно и с возможностью проверить до установки.',
      'faq.q2': 'Как скачать проект?',
      'faq.a2': 'Откройте вкладку «Проекты», выберите проект и прочитайте страницу: состав, версия, платформы и требования. Кнопка скачивания рядом — без аккаунта и ожидания.',
      'faq.q3': 'Проекты действительно бесплатные?',
      'faq.a3': 'Да. Все публичные версии на этом сайте бесплатны. Нет платных уровней, закрытых файлов и скрытой рекламы. Если что-то изменится, это будет явно указано.',
      'faq.q4': 'Какие платформы поддерживаются?',
      'faq.a4': 'Большинство версий — для Windows, иногда появляются веб-проекты, полностью работающие в браузере. На странице каждого проекта указано, что поддерживается.',
      'faq.q5': 'Как часто обновляются проекты?',
      'faq.a5': 'Когда есть что выпускать. Крупные релизы и исправления анонсируем в Discord и на YouTube, а страница проекта показывает версию и дату.',
      'faq.q6': 'Что-то сломалось или есть идея. Куда писать?',
      'faq.a6': 'Если нашёл ошибку или есть идея — напиши нам в Discord. Идею можно опубликовать в канале general и обсудить с командой. Для ошибки создай тикет с подробностями и приложи скриншот, чтобы мы точно увидели, что пошло не так. Заранее спасибо!'
    },
    ja: {
      'nav.home': 'メインメニュー',
      'nav.projects': 'プロジェクト',
      'nav.members': 'Warp Projects チーム',
      'nav.patch': 'パッチノート',
      'nav.help': 'ヘルプ',
      'nav.event': 'イベント',
      'event.kicker': 'イベント',
      'event.title': 'イベントと新しいプロジェクト',
      'event.sub': '新しいリリース、イベント、プロジェクトの発表は最初にここに届きます。ぜひチェックしてください。',
      'event.join': '参加',
      'event.none': 'イベントはまだありません',
      'ann.aria': 'お知らせ',
      'ann.label': 'お知らせ！',
      'ann.close': 'お知らせを閉じる',
      'help.title': 'ヘルプ',
      'help.sub': '小さなチームなので、Discord が一番早く連絡できます。',
      'help.p1': '以下の内容は、Discord サーバーのチケットチャンネルで受け付けています。',
      'help.li1': '不具合の報告',
      'help.li2': 'ダウンロードやインストールの問題',
      'help.li3': '機能のアイデアやプロジェクトの提案',
      'help.li4': 'その他のこと',
      'help.p2': '私たちの',
      'help.p3': 'サーバーでチケットを開いてください。返信します。',
      'nav.license': 'ライセンス',
      'patch.kicker': '変更履歴',
      'patch.title': 'パッチノート',
      'patch.lead': 'サイトとプロジェクトの変更を新しい順に。',
      'patch.badge': '更新 · 2026年10月',
      'license.kicker': 'ライセンス',
      'license.title': 'オープンソース。オープンに共有。',
      'license.body': 'Warp Projects のプロジェクトはすべて完全なオープンソースです。悪意のある目的で使用されない限り、誰でも自由に利用・調査・改良できます。いかなる場合も責任を負いません。私たちのプロジェクトをご利用いただきありがとうございます。',
      'license.p1t': '自由に利用',
      'license.p1': 'アカウント不要、課金なし、トラッキングなし。',
      'license.p2t': '自由に調査',
      'license.p2': 'コードを読み、フォークし、学べます。',
      'license.p3t': '責任ある利用を',
      'license.p3': '当サイト以外のページについては、不正な使用や改変の場合も含め、いかなる保証も行いません。',
      'license.thanks': '私たちのプロジェクトをご利用いただきありがとうございます。',
      'hero.sub': 'このサイトは、私たちのプロジェクトをダウンロードし、内容を詳しく確認して、じっくり検討できるように作られました。選んでいただき、ありがとうございます。',
      'projects.kicker': 'ライブラリ',
      'projects.title': 'プロジェクト',
      'projects.sub': 'いま制作中のプロジェクト。',
      'projects.badge': '開発中のプロジェクト',
      'project.back': 'すべてのプロジェクト',
      'project.video': 'プロジェクト動画 — 近日公開',
      'project.screens': 'スクリーンショット',
      'project.about': 'このプロジェクトについて',
      'project.download': 'ダウンロード',
      'project.notReleased': '未リリース',
      'project.noInfo': '情報はまだありません',
      'project.noInfoSub': 'このプロジェクトはまだ公開されていません。準備ができ次第、ここに詳細が表示されます。',
      'project.note': 'アカウント不要。手間なし。広告なし。',
      'project.more': '他のプロジェクト',
      'project.developer': '開発元',
      'project.released': 'リリース',
      'project.updated': '最終更新',
      'project.version': 'バージョン',
      'project.size': 'サイズ',
      'project.license': 'ライセンス',
      'project.platform': 'プラットフォーム',
      'project.status': '開発中',
      'project.toast': 'このプロジェクトはまだ公開されていません。リリース情報は Discord で最初にお知らせします。',
      'members.kicker': 'チーム',
      'members.title': 'Warp Projects チーム',
      'members.sub': 'プロジェクトを支えるメンバー。',
      'foot.title': 'コミュニティに参加',
      'foot.rights': '無断転載を禁じます。',
      'qr.kicker': '共有',
      'qr.title': 'スキャンしてこのページを開く',
      'qr.hint': 'みんな同じコード — 開いているページによって変わります。',
      'qr.copy': 'QRをコピー',
      'qr.download': 'PNGをダウンロード',
      'qr.copied': 'QRコードをコピーしました',
      'qr.saved': 'QRコードをダウンロードしました',
      'qr.linkCopied': 'リンクをコピーしました',
      'theme.label': 'テーマを切り替え',
      'lang.label': '言語を変更',
      'common.soon': '近日公開',
      'foot.pages': 'ページ',
      'about.kicker': '概要',
      'about.title': 'Warp Projects について',
      'about.p1': 'Warp Projects は、オープンソースのプロジェクトを公開する独立スタジオです。作って、わかりやすく説明して、すべて同じ場所で公開する。それが私たちの仕事です。',
      'about.p2': 'ここで公開しているものはすべて無料でダウンロードできます。中身や必要な環境を確認し、手元に入れる前にじっくり調べられます。このサイトはそのためにあります。',
      'about.cta.projects': 'プロジェクトを見る',
      'about.cta.discord': 'Discord に参加',
      'video.kicker': 'ショーケース',
      'video.title': 'Warp Projects の動く姿',
      'video.sub': '何を作っているのか、どう使うのかを短く紹介します。',
      'video.soon': '動画は近日公開',
      'faq.kicker': 'FAQ',
      'faq.title': 'よくある質問',
      'faq.sub': 'よく聞かれることを一か所に。まだ迷ったら Discord へ。',
      'faq.q1': 'Warp Projects とは何ですか？',
      'faq.a1': 'Warp Projects は、オープンソースのプロジェクトを公開する小さな独立スタジオです。完成したものはすべてここに無料で公開され、インストール前に確認できます。',
      'faq.q2': 'プロジェクトのダウンロード方法は？',
      'faq.a2': '「プロジェクト」タブを開き、作品を選んでページを読んでください。内容・バージョン・対応環境・必要なものが書かれています。ダウンロードボタンはその場にあり、アカウントも待ち時間も不要です。',
      'faq.q3': '本当に無料ですか？',
      'faq.a3': 'はい。このサイトの公開版はすべて無料です。有料プランやロックされたファイル、隠れた広告はありません。変更がある場合は明記します。',
      'faq.q4': '対応プラットフォームは？',
      'faq.a4': '多くは Windows 向けで、ブラウザだけで動く Web プロジェクトもあります。各プロジェクトのページに対応内容を明記しています。',
      'faq.q5': '更新頻度は？',
      'faq.a5': '公開する価値のあるものができたときです。大きなリリースや修正は Discord と YouTube で告知し、各ページに最新バージョンと日付を表示します。',
      'faq.q6': '不具合や提案はどこへ？',
      'faq.a6': '不具合を見つけたときやアイデアがあるときは、Discord で教えてください。アイデアは general チャンネルに投稿してチームと話し合えます。不具合の場合は、詳細とスクリーンショットを添えてチケットを開いてください。よろしくお願いします！'
    },
  };

  /* ---------- projects ---------- */
  /* every project is one file in /projects; index.json lists them in order */
  var PROJECTS = {};
  var projectsLoaded = false;
  var projectsLoading = null;
  var pendingProject = null;

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function projectInitial(name) {
    var letter = String(name || '').replace(/[^A-Za-z0-9]/g, '').charAt(0);
    return (letter || 'W').toUpperCase();
  }

  function renderProjectCards() {
    var wrap = document.getElementById('projectCards');
    if (!wrap) return;
    var ids = Object.keys(PROJECTS);
    if (!ids.length) return;
    wrap.innerHTML = ids.map(function (id) {
      var p = PROJECTS[id];
      return '<a class="project-cover is-link" href="#project-' + encodeURIComponent(id) + '" data-project="' + escapeHtml(id) + '">' +
        '<span class="cover-sheen" aria-hidden="true"></span>' +
        '<div class="cover-art" aria-hidden="true"><span class="cover-w">' + escapeHtml(projectInitial(p.name)) + '</span></div>' +
        '<div class="cover-foot">' +
          '<p class="cover-name">' + escapeHtml(p.name) + '</p>' +
          '<span class="cover-meta">' + escapeHtml(p.version) + ' \u00b7 ' + escapeHtml(p.size) + '</span>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  function loadProjects() {
    if (projectsLoading) return projectsLoading;
    projectsLoading = fetch('projects/index.json', { cache: 'no-store' })
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (list) {
        var files = Array.isArray(list) ? list : (list && list.projects) || [];
        return Promise.all(files.map(function (file) {
          return fetch('projects/' + file, { cache: 'no-store' })
            .then(function (res) { return res.ok ? res.json() : null; })
            .catch(function () { return null; });
        }));
      })
      .then(function (items) {
        items.forEach(function (project) {
          if (project && project.id) PROJECTS[project.id] = project;
        });
        projectsLoaded = true;
        renderProjectCards();
        if (pendingProject) {
          var id = pendingProject;
          pendingProject = null;
          openProject(id, { silent: true });
          scrollTop();
        }
        return PROJECTS;
      })
      .catch(function () {
        projectsLoaded = true;
        return PROJECTS;
      });
    return projectsLoading;
  }

  /* ---------- elements ---------- */
  var tabsWrap = document.getElementById('tabs');
  var glow = document.getElementById('tabGlow');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var licenseTab = document.getElementById('licenseTab');
  var views = Array.prototype.slice.call(document.querySelectorAll('.view'));
  var lang = document.getElementById('lang');
  var langBtn = document.getElementById('langBtn');
  var langMenu = document.getElementById('langMenu');
  var langFlag = document.getElementById('langFlag');
  var langName = document.getElementById('langName');
  var themeBtn = document.getElementById('themeToggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var wgrid = document.getElementById('wgrid');
  var wgridTrack = document.getElementById('wgridTrack');
  var currentLang = 'en';
  var hoveredTab = null;

  var pjName = document.getElementById('pjName');
  var pjMediaLabel = document.getElementById('pjMediaLabel');
  var pjSideTagline = document.getElementById('pjSideTagline');
  var pjDesc = document.getElementById('pjDesc');
  var pjFeatures = document.getElementById('pjFeatures');
  var pjReleased = document.getElementById('pjReleased');
  var pjUpdated = document.getElementById('pjUpdated');
  var pjVersion = document.getElementById('pjVersion');
  var pjSize = document.getElementById('pjSize');
  var pjLicense = document.getElementById('pjLicense');
  var pjPlatform = document.getElementById('pjPlatform');
  var pjShots = document.getElementById('pjShots');
  var pjCount = document.getElementById('pjCount');
  var pjMore = document.getElementById('pjMore');
  var pjDownload = document.getElementById('pjDownload');
  var pjLightbox = document.getElementById('pjLightbox');
  var pjLightboxCap = document.getElementById('pjLightboxCap');
  var pjLightboxCount = document.getElementById('pjLightboxCount');
  var pjLightboxClose = document.getElementById('pjLightboxClose');
  var toastEl = document.getElementById('toast');
  var toastText = document.getElementById('toastText');
  var currentProject = null;
  var toastTimer = null;

  /* ---------- W background grid ---------- */
  function seeded(i) {
    var x = Math.sin(i * 127.1 + 3.7) * 43758.5453;
    return x - Math.floor(x);
  }

  function buildGrid() {
    if (!wgrid || !wgridTrack) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var cols = Math.max(9, Math.round(w / 56));
    var rows = Math.max(7, Math.round(h / 68));
    var cellW = (w * 1.16) / cols;
    var cellH = (h * 1.16) / rows;
    var size = Math.min(cellW * 1.26, cellH * 1.6);
    wgridTrack.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    wgridTrack.style.gridTemplateRows = 'repeat(' + (rows * 2) + ', 1fr)';
    wgridTrack.style.fontSize = size.toFixed(1) + 'px';
    var tile = '';
    for (var i = 0; i < cols * rows; i++) {
      var r = seeded(i + 1);
      var o = r < 0.42 ? 0.045 : r < 0.66 ? 0.08 : r < 0.85 ? 0.13 : r < 0.95 ? 0.24 : 0.42;
      tile += '<span class="wcell" style="opacity:' + o + '">W</span>';
    }
    /* two identical tiles so the slow upward drift loops seamlessly */
    wgridTrack.innerHTML = tile + tile;
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      buildGrid();
      positionGlow(hoveredTab, !!hoveredTab);
    }, 160);
  });

  /* ---------- tabs ---------- */
  function activeTab() {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains('is-active')) return tabs[i];
    }
    return tabs[0];
  }

  function positionGlow(el, visible) {
    if (!el || !glow) return;
    glow.style.width = el.offsetWidth + 'px';
    glow.style.transform = 'translateX(' + el.offsetLeft + 'px)';
    glow.style.opacity = visible ? '1' : '0';
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('pointerenter', function () {
      hoveredTab = tab;
      positionGlow(tab, true);
    });
    tab.addEventListener('focus', function () {
      hoveredTab = tab;
      positionGlow(tab, true);
    });
    tab.addEventListener('click', function () {
      setView(tab.dataset.view);
    });
  });

  if (tabsWrap) {
    tabsWrap.addEventListener('pointerleave', function () {
      hoveredTab = null;
      positionGlow(activeTab(), false);
    });
  }

  function scrollTop() {
    try { window.scrollTo({ top: 0, behavior: 'instant' }); }
    catch (e) { window.scrollTo(0, 0); }
  }

  /* keep the active tab visible when the tab bar scrolls sideways on phones */
  function revealTab(tab) {
    if (!tabsWrap || !tab) return;
    if (tabsWrap.scrollWidth <= tabsWrap.clientWidth + 2) return;
    var left = tab.offsetLeft - (tabsWrap.clientWidth - tab.offsetWidth) / 2;
    left = Math.max(0, Math.min(left, tabsWrap.scrollWidth - tabsWrap.clientWidth));
    try { tabsWrap.scrollTo({ left: left, behavior: 'smooth' }); }
    catch (e) { tabsWrap.scrollLeft = left; }
  }

  function showView(name) {
    var found = false;
    views.forEach(function (v) {
      var on = v.id === 'view-' + name;
      if (on) found = true;
      v.classList.toggle('is-active', on);
    });
    if (!found) name = 'home';
    /* the detail page belongs to the Projects tab */
    var tabName = name === 'project' ? 'projects' : name;
    tabs.forEach(function (t) {
      var on = t.dataset.view === tabName;
      t.classList.toggle('is-active', on);
      if (on) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
    if (licenseTab) {
      var licOn = tabName === 'license';
      licenseTab.classList.toggle('is-active', licOn);
      if (licOn) licenseTab.setAttribute('aria-current', 'page');
      else licenseTab.removeAttribute('aria-current');
    }
    hoveredTab = null;
    positionGlow(activeTab(), false);
    revealTab(activeTab());
    return name;
  }

  function setView(name, opts) {
    opts = opts || {};
    if (name !== 'project') closeShot();
    name = showView(name);
    if (!opts.silent) {
      if (opts.push) {
        try { history.pushState(null, '', '#' + name); }
        catch (e) { location.hash = name; }
      } else if (history.replaceState) {
        history.replaceState(null, '', '#' + name);
      }
    }
    if (!opts.noScroll) scrollTop();
    if (eventBtn) {
      var evOn = name === 'event';
      eventBtn.classList.toggle('is-rainbow', evOn);
      eventBtn.classList.toggle('is-active', evOn);
      if (evOn) eventBtn.setAttribute('aria-current', 'page');
      else eventBtn.removeAttribute('aria-current');
    }
  }

  /* ---------- project detail ---------- */
  var ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function renderShots(project) {
    if (!project.labels || !project.labels.length) {
      pjShots.innerHTML = '';
      pjCount.textContent = '';
      return;
    }
    pjShots.innerHTML = project.labels.map(function (label, i) {
      return '<button class="pj-shot' + (i === 0 ? ' is-active' : '') + '" type="button" data-shot="' + i +
        '" aria-label="' + escapeHtml(project.name) + ' — ' + escapeHtml(label) + '">' +
        '<span class="pj-shot-index">' + pad2(i + 1) + '</span>' +
        '</button>';
    }).join('');
    pjCount.textContent = '01 / ' + pad2(project.labels.length);
  }

  function renderMore(currentId) {
    var ids = Object.keys(PROJECTS).filter(function (key) {
      return key !== currentId;
    }).slice(0, 3);
    pjMore.innerHTML = ids.map(function (id) {
      var p = PROJECTS[id];
      return '<a class="pj-more-item" href="#project-' + encodeURIComponent(id) + '" data-project="' + escapeHtml(id) + '">' +
        '<span class="pj-more-thumb" aria-hidden="true"></span>' +
        '<span class="pj-more-text">' +
          '<span class="pj-more-name">' + escapeHtml(p.name) + '</span>' +
          '<span class="pj-more-size">' + escapeHtml(p.size) + ' · ' + escapeHtml(p.version) + '</span>' +
        '</span>' +
        ARROW_SVG.replace('<svg ', '<svg class="pj-more-arrow" ') +
        '</a>';
    }).join('');
  }

  /* the placeholder shown on the project page until a real project is published */
  function soonProject() {
    var d = I18N[currentLang] || I18N.en;
    var dash = '—';
    return {
      id: 'soon',
      name: 'soon.',
      tagline: d['project.noInfo'] || 'No info yet',
      desc: d['project.noInfoSub'] || 'This project is not published yet. Details will appear here once it is ready.',
      version: dash,
      released: dash,
      updated: dash,
      size: dash,
      license: dash,
      platform: dash,
      labels: [],
      features: []
    };
  }

  function openProject(id, opts) {
    opts = opts || {};
    var isSoon = id === 'soon';
    var project = isSoon ? soonProject() : PROJECTS[id];
    if (!project) {
      /* a deep link can arrive before the project files have loaded */
      if (!projectsLoaded) {
        pendingProject = id;
        loadProjects();
        return;
      }
      setView('projects');
      return;
    }

    currentProject = id;
    pjName.textContent = project.name;
    pjMediaLabel.textContent = project.name;
    pjSideTagline.textContent = project.tagline;
    pjDesc.textContent = project.desc;
    pjReleased.textContent = project.released;
    pjUpdated.textContent = project.updated;
    pjVersion.textContent = project.version;
    pjSize.textContent = project.size;
    pjLicense.textContent = project.license;
    pjPlatform.textContent = project.platform;

    pjFeatures.innerHTML = project.features.map(function (f) {
      return '<li>' + escapeHtml(f) + '</li>';
    }).join('');

    renderShots(project);
    renderMore(id);

    showView('project');

    var pjView = document.getElementById('view-project');
    if (pjView) pjView.classList.toggle('is-soon', isSoon);
    if (pjDownload) {
      if (isSoon) pjDownload.setAttribute('aria-disabled', 'true');
      else pjDownload.removeAttribute('aria-disabled');
    }

    if (!opts.silent) {
      try { history.pushState({ project: id }, '', '#project-' + id); }
      catch (e) { location.hash = 'project-' + id; }
      scrollTop();
    }
    closeShot();
  }

  function openShot(index) {
    if (!currentProject) return;
    var project = PROJECTS[currentProject];
    if (!project || !project.labels[index]) return;
    pjLightboxCap.textContent = project.name + ' — ' + project.labels[index];
    pjLightboxCount.textContent = pad2(index + 1) + ' / ' + pad2(project.labels.length);
    pjLightbox.classList.add('is-open');
    pjLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeShot() {
    if (!pjLightbox) return;
    pjLightbox.classList.remove('is-open');
    pjLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (pjShots) {
    pjShots.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-shot]') : null;
      if (!btn) return;
      Array.prototype.forEach.call(pjShots.querySelectorAll('.pj-shot'), function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      var i = parseInt(btn.getAttribute('data-shot'), 10);
      if (!isNaN(i)) openShot(i);
    });
  }

  if (pjLightbox) {
    pjLightbox.addEventListener('click', function (e) {
      if (e.target === pjLightbox) closeShot();
    });
  }
  if (pjLightboxClose) pjLightboxClose.addEventListener('click', closeShot);

  function showToast(message) {
    if (!toastEl || !toastText) return;
    toastText.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-on');
    }, 4200);
  }

  if (pjDownload) {
    pjDownload.addEventListener('click', function () {
      var dict = I18N[currentLang] || I18N.en;
      showToast(dict['project.toast'] || I18N.en['project.toast']);
    });
  }

  /* project cards + "more projects" links */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-project]') : null;
    if (!el) return;
    e.preventDefault();
    openProject(el.getAttribute('data-project'));
  });

  function route(hashValue) {
    var h = (hashValue || '').replace('#', '');
    if (h.indexOf('project-') === 0) {
      openProject(h.slice(8), { silent: true });
      scrollTop();
      return;
    }
    setView({ projects: 1, members: 1, patch: 1, license: 1, help: 1, event: 1, home: 1 }[h] ? h : 'home', { silent: true });
    scrollTop();
  }

  window.addEventListener('popstate', function () {
    route(location.hash);
  });

  /* ---------- theme ---------- */
  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    if (themeBtn) themeBtn.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');
    if (persist) store.set('warp.theme', theme);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* ---------- language ---------- */
  function buildLangMenu() {
    LANGS.forEach(function (l) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'lang-item';
      item.dataset.code = l.code;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
      item.innerHTML =
        '<span class="lang-flag" aria-hidden="true">' + FLAGS[l.flag] + '</span>' +
        '<span>' + l.name + '</span>' +
        '<svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4.5 12.5 5 5 10-11"/></svg>';
      item.addEventListener('click', function () {
        applyLang(l.code, true);
        closeLang();
      });
      langMenu.appendChild(item);
    });
  }

  function applyLang(code, persist) {
    var dict = I18N[code] || I18N.en;
    currentLang = I18N[code] ? code : 'en';
    root.dataset.lang = currentLang;
    root.lang = currentLang;

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var value = dict[el.dataset.i18n];
      if (value) el.textContent = value;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria]'), function (el) {
      var value = dict[el.dataset.i18nAria];
      if (value) el.setAttribute('aria-label', value);
    });

    /* keep the placeholder project page in the selected language */
    if (currentProject === 'soon') {
      var soon = soonProject();
      pjName.textContent = soon.name;
      pjMediaLabel.textContent = soon.name;
      pjSideTagline.textContent = soon.tagline;
      pjDesc.textContent = soon.desc;
    }

    var meta = null;
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].code === currentLang) meta = LANGS[i];
    }
    if (meta) {
      langFlag.innerHTML = FLAGS[meta.flag];
      langName.textContent = meta.name;
      langBtn.setAttribute('aria-label', dict['lang.label']);
    }
    Array.prototype.forEach.call(langMenu.querySelectorAll('.lang-item'), function (item) {
      item.setAttribute('aria-selected', item.dataset.code === currentLang ? 'true' : 'false');
    });

    if (persist) store.set('warp.lang', currentLang);

    requestAnimationFrame(function () {
      positionGlow(hoveredTab, !!hoveredTab);
    });
  }

  function openLang() {
    lang.classList.add('is-open');
    langBtn.setAttribute('aria-expanded', 'true');
  }

  function closeLang() {
    lang.classList.remove('is-open');
    langBtn.setAttribute('aria-expanded', 'false');
  }

  if (langBtn) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (lang.classList.contains('is-open')) closeLang();
      else openLang();
    });
  }

  document.addEventListener('click', function (e) {
    if (lang && !lang.contains(e.target)) closeLang();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (pjLightbox && pjLightbox.classList.contains('is-open')) {
      closeShot();
      return;
    }
    if (lang.classList.contains('is-open')) {
      closeLang();
      langBtn.focus();
    }
  });

  /* ---------- navigation links (header brand, footer pages, CTA) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-goto]'), function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      setView(el.getAttribute('data-goto'));
    });
  });

  /* ---------- event tab ---------- */
  var eventBtn = document.getElementById('eventBtn');

  function playEventChime() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!playEventChime.ctx) playEventChime.ctx = new Ctx();
      var ctx = playEventChime.ctx;
      if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
      var now = ctx.currentTime;
      [659.25, 880, 1318.5].forEach(function (freq, i) {
        var at = now + i * 0.075;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, at);
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.exponentialRampToValueAtTime(0.055, at + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.26);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(at);
        osc.stop(at + 0.28);
      });
    } catch (e) { /* audio unavailable */ }
  }

  function openEvent() {
    setView('event');
  }

  if (eventBtn) {
    eventBtn.addEventListener('click', function () {
      playEventChime();
      openEvent();
    });
  }

  /* ---------- floating announcement ---------- */
  var annCard = document.getElementById('annCard');
  var annClose = document.getElementById('annClose');
  if (annCard && annClose) {
    var annFlat = function () {
      annCard.style.setProperty('--ann-rx', '0deg');
      annCard.style.setProperty('--ann-ry', '0deg');
    };
    annCard.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = annCard.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      annCard.style.setProperty('--ann-ry', (px * 11).toFixed(2) + 'deg');
      annCard.style.setProperty('--ann-rx', (-py * 9).toFixed(2) + 'deg');
    });
    annCard.addEventListener('pointerleave', annFlat);
    annCard.addEventListener('focusout', function (e) {
      if (!annCard.contains(e.relatedTarget)) annFlat();
    });
    annClose.addEventListener('click', function () {
      annCard.classList.add('is-closing');
      setTimeout(function () {
        if (annCard.parentNode) annCard.parentNode.removeChild(annCard);
      }, 620);
    });
  }

  /* ---------- video frames: light follows the pointer ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.video-frame'), function (frame) {
    frame.addEventListener('pointermove', function (e) {
      var r = frame.getBoundingClientRect();
      frame.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
      frame.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
    });
    frame.addEventListener('pointerleave', function () {
      frame.style.setProperty('--mx', '50%');
      frame.style.setProperty('--my', '50%');
    });
  });

  /* ---------- team filters ---------- */
  var teamFilters = Array.prototype.slice.call(document.querySelectorAll('.team-filter'));
  var memberCards = Array.prototype.slice.call(document.querySelectorAll('.member-card'));

  function memberRole(card) {
    var role = card.getAttribute('data-role');
    /* the owner is part of the admin side of the team */
    return role === 'owner' ? 'admin' : role;
  }

  function refreshTeamCounts() {
    var counts = { all: memberCards.length, developer: 0, admin: 0, editor: 0, artist: 0 };
    memberCards.forEach(function (card) {
      var key = memberRole(card);
      if (counts[key] !== undefined) counts[key]++;
    });
    teamFilters.forEach(function (btn) {
      var key = btn.getAttribute('data-filter');
      var out = btn.querySelector('.team-filter-count');
      if (out && counts[key] !== undefined) out.textContent = counts[key];
    });
  }

  function applyTeamFilter(filter) {
    teamFilters.forEach(function (btn) {
      var on = btn.getAttribute('data-filter') === filter;
      if (on && btn.classList.contains('is-active')) {
        /* restart the oval ring animation when the same pill is pressed again */
        btn.classList.remove('is-active');
        void btn.offsetWidth;
      }
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    memberCards.forEach(function (card) {
      var show = filter === 'all' || memberRole(card) === filter;
      card.classList.toggle('is-hidden', !show);
    });
  }

  teamFilters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTeamFilter(btn.getAttribute('data-filter'));
    });
  });

  refreshTeamCounts();

  /* ---------- team avatars ---------- */
  (function () {
    var holders = Array.prototype.slice.call(document.querySelectorAll('[data-av]'));
    if (!holders.length || !window.fetch) return;

    /* ids live scrambled in the markup so the profile links are not readable at a glance */
    var KEY = ['warp', '-te', 'am-', 'av2', '6'].join('');

    function decode(token) {
      try {
        var s = token.split('').reverse().join('').replace(/-/g, '+').replace(/_/g, '/');
        while (s.length % 4) s += '=';
        var raw = atob(s), out = '';
        for (var i = 0; i < raw.length; i++) out += String.fromCharCode(raw.charCodeAt(i) ^ KEY.charCodeAt(i % KEY.length));
        return out;
      } catch (e) { return ''; }
    }

    function readCache(key) {
      try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
    }

    function writeCache(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    }

    /* very dark profile colours read as black on a card, so lift them while keeping the hue */
    function accentColor(value, fallback) {
      if (typeof value !== 'number' || !isFinite(value) || value <= 0) return fallback;
      var r = (value >> 16) & 255, g = (value >> 8) & 255, b = value & 255;
      var max = Math.max(r, g, b);
      if (max < 40) {
        var k = 128 / max;
        r = Math.min(255, Math.round(r * k));
        g = Math.min(255, Math.round(g * k));
        b = Math.min(255, Math.round(b * k));
      }
      return '#' + ('000000' + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
    }

    function showImage(img, src, done) {
      if (!src) return;
      if (img.getAttribute('src') === src) { if (done) done(src); return; }
      /* only swap once the new picture is fully loaded */
      var probe = new Image();
      probe.onload = function () { img.src = src; if (done) done(src); };
      probe.onerror = function () {
        if (src.indexOf('images.weserv.nl') !== -1) return;
        /* some networks block the Discord CDN; go through a cached image proxy */
        var proxied = 'https://images.weserv.nl/?url=' + encodeURIComponent(src.replace(/^https?:\/\//, ''));
        var fallback = new Image();
        fallback.onload = function () { img.src = proxied; if (done) done(proxied); };
        fallback.src = proxied;
      };
      probe.src = src;
    }

    /* keep a tiny copy of the accepted picture so the next reload shows it instantly */
    function saveThumb(src, cacheKey, hash, accent) {
      if (!src) return;
      var proxySrc = src.indexOf('images.weserv.nl') !== -1
        ? src
        : 'https://images.weserv.nl/?url=' + encodeURIComponent(src.replace(/^https?:\/\//, ''));
      var image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = function () {
        try {
          var size = 160;
          var canvas = document.createElement('canvas');
          canvas.width = size; canvas.height = size;
          var ctx = canvas.getContext('2d');
          var scale = Math.max(size / image.width, size / image.height);
          var w = image.width * scale, h = image.height * scale;
          ctx.drawImage(image, (size - w) / 2, (size - h) / 2, w, h);
          var thumb = canvas.toDataURL('image/webp', 0.82);
          var current = readCache(cacheKey);
          if (current && current.hash && current.hash !== hash) return;
          writeCache(cacheKey, { hash: hash, src: src, accent: accent, thumb: thumb });
        } catch (e) { /* ignore */ }
      };
      image.src = proxySrc;
    }

    function prepare(holder) {
      var img = holder.querySelector('img');
      var card = holder.closest ? holder.closest('.member-card') : null;
      if (!img) return null;

      var token = holder.getAttribute('data-av') || '';
      var id = decode(token);
      if (!/^\d{17,20}$/.test(id)) return null;

      var cacheKey = 'warp.av.' + token;
      var fallbackAccent = card ? (card.getAttribute('data-accent') || card.style.getPropertyValue('--accent').trim()) : '';
      if (card && fallbackAccent && !card.getAttribute('data-accent')) card.setAttribute('data-accent', fallbackAccent);

      /* show the last accepted picture straight away, so a reload never falls back to an old one */
      var cached = readCache(cacheKey);
      if (cached) {
        if (cached.accent && card) card.style.setProperty('--accent', cached.accent);
        /* the thumbnail is a data URI, so it paints immediately without a network round-trip */
        if (cached.thumb) img.src = cached.thumb;
        if (cached.src) {
          showImage(img, cached.src, function (finalSrc) {
            if (finalSrc && finalSrc !== cached.src) {
              writeCache(cacheKey, { hash: cached.hash, src: finalSrc, accent: cached.accent, thumb: cached.thumb });
            }
          });
        }
      }

      return { img: img, card: card, id: id, cacheKey: cacheKey, fallbackAccent: fallbackAccent, cached: cached };
    }

    function refresh(state, force) {
      if (!state) return;
      var img = state.img, card = state.card, id = state.id;
      var cacheKey = state.cacheKey, fallbackAccent = state.fallbackAccent;
      /* always use the latest accepted picture, even after a later background refresh */
      var cached = readCache(cacheKey);
      state.cached = cached;

      /* a normal visit can use the 5 minute cache; a reload asks for a fresh copy */
      var navEntry = window.performance && performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null;
      var isReload = navEntry ? navEntry.type === 'reload' : !!(window.performance && performance.navigation && performance.navigation.type === 1);

      var opts = { cache: 'no-store', referrerPolicy: 'no-referrer' };

      function fromWorker(fresh) {
        var endpoint = 'https://discord-lookup.lookupbotdc.workers.dev/search/' + id + (fresh ? '?t=' + Date.now() : '');
        return fetch(endpoint, opts)
          .then(function (res) {
            if (res.ok) return res.json();
            /* if the fresh request is rate limited, settle for the cached copy */
            if (res.status === 429 && fresh) return fromWorker(false);
            return null;
          })
          .catch(function () { return null; });
      }

      function fromBackup() {
        return fetch('https://japi.rest/discord/v1/user/' + id, opts)
          .then(function (res) { return res.ok ? res.json() : null; })
          .then(function (json) {
            if (!json || !json.data || !json.data.avatarURL) return null;
            return {
              avatar_url: json.data.avatarURL,
              accent_color: json.data.accent_color,
              avatar: json.data.avatar
            };
          })
          .catch(function () { return null; });
      }

      fromWorker(force || isReload)
        .then(function (data) { return data || fromBackup(); })
        .then(function (data) {
          if (!data) return;

          var accentValue = data.user && typeof data.user.accent_color === 'number' ? data.user.accent_color : data.accent_color;
          var accent = accentColor(accentValue, fallbackAccent);
          if (card && accent) card.style.setProperty('--accent', accent);

          var hash = (data.user && data.user.avatar) || data.avatar || '';
          var src = data.avatar_url_gif || data.avatar_url;
          if (!src) return;
          src += (src.indexOf('?') === -1 ? '?' : '&') + 'size=256';

          var current = img.getAttribute('src') || '';
          if ((hash && cached && cached.hash === hash && current) || current === src) {
            writeCache(cacheKey, {
              hash: hash,
              src: (cached && cached.src) || current || src,
              accent: accent,
              thumb: cached && cached.thumb
            });
            return;
          }

          showImage(img, src, function (finalSrc) {
            var final = finalSrc || src;
            writeCache(cacheKey, { hash: hash, src: final, accent: accent });
            saveThumb(final, cacheKey, hash, accent);
          });
        })
        .catch(function () { /* keep the last accepted picture */ });
    }

    var states = [];
    var lastCheck = Date.now();

    function refreshAll(force) {
      states.forEach(function (state, i) {
        setTimeout(function () { refresh(state, force); }, i * 1200);
      });
    }

    function start() {
      states = holders.map(prepare);
      refreshAll(false);
    }

    start();

    /* when the tab comes back, pick up profile colour or avatar changes made meanwhile */
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastCheck < 5 * 60 * 1000) return;
      lastCheck = Date.now();
      refreshAll(true);
    });
  })();

  /* ---------- init ---------- */
  buildGrid();
  buildLangMenu();
  loadProjects();

  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark', false);
  applyLang(root.dataset.lang && I18N[root.dataset.lang] ? root.dataset.lang : (store.get('warp.lang') || 'en'), false);

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  var hash = (location.hash || '').replace('#', '');
  if (hash.indexOf('project-') === 0) {
    openProject(hash.slice(8), { silent: true });
    scrollTop();
  } else if ({ projects: 1, members: 1, patch: 1, license: 1, help: 1, event: 1, home: 1 }[hash]) {
    setView(hash, { silent: true });
  }

  requestAnimationFrame(function () {
    positionGlow(activeTab(), false);
  });

})();
