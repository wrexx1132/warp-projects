# Duyurular / Announcements

Duyuru içeriği bu klasördeki `current.json` dosyasından okunur. Her güncellemede
yalnızca bu dosyayı düzenlemen yeterli; site yeniden yüklenince kart, üstteki
duyuru ikonu ve duyuru sayfası otomatik olarak güncellenir.

`current.json` alanları:

- `active` — `true` ise duyuru ikonu, sol alttaki kart ve duyuru sayfası görünür.
  `false` yaparsan ikon ve kart gizlenir.
- `image` — duyuru görselinin yolu (ör. `assets/img/soon.jpg`).
- `alt` — görselin alternatif metni (boş bırakılabilir).
- `description` — görselin altındaki açıklama (tüm diller için varsayılan).
- `descriptionByLang` — dile özel açıklamalar. Örnek:

```json
{
  "active": true,
  "image": "assets/img/soon.jpg",
  "alt": "",
  "description": "Yeni projemiz çok yakında.",
  "descriptionByLang": {
    "tr": "Yeni projemiz çok yakında.",
    "en": "Our new project is coming soon."
  }
}
```

Sayfa başlığı (`DUYURU!`) her dilde ayrı olarak `assets/js/app.js` içindeki
`ann.label` çevirilerinden gelir. Açıklamayı boş bırakırsan açıklama alanı
görünmez.
