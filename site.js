(function () {
  "use strict";
  var D = JSON.parse(document.getElementById("site-data").textContent);
  var app = document.getElementById("app");
  var JENIS = ["Artikel", "Kertas kajian", "Kertas persidangan", "E-buku", "Risalah", "Terjemahan"];
  var STATUS = ["Terbit", "Pembentangan", "Akan terbit", "Dalam penulisan", "Dalam perancangan"];
  var BULAN = ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"];
  var PUB_TABS = [["E-buku", "e-Buku"], ["Risalah", "Risalah"], ["Kertas kajian", "Kertas Kajian"]];
  var MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var LANG = "ms";
  try { LANG = localStorage.getItem("ki-lang") === "en" ? "en" : "ms"; } catch (e) {}
  var EN = {
    "Utama": "Home", "Penulisan": "Writings", "e-Penerbitan": "e-Publications", "Arkib": "Archive", "Profil": "Profile",
    "Cari tulisan": "Search writings", "Cari penulisan": "Search writings", "Cari": "Search", "Menu utama": "Main menu",
    "Laman": "Site", "Siri": "Series", "Hubungi": "Contact", "Butiran hubungan di halaman Profil.": "Contact details are on the Profile page.",
    "Profil penulis": "Author profile", "Hak cipta setiap tulisan milik penulisnya.": "Copyright of each work belongs to its author.",
    "Hebahan": "Announcement", "Siri aktif": "Active series", "Baca penulisan": "Read", "Penulisan akan disiarkan di sini.": "Writings will be published here.",
    "Terkini": "Latest", "Semua penulisan": "All writings", "Fihris Siri": "Series Index", "Lihat arkib": "View archive", "penulisan": "writings",
    "Rak penuh": "Full shelf", "Tentang penulis": "About the author", "Profil penuh": "Full profile", "Kerjaya": "Career", "Pengajian": "Education",
    "min bacaan": "min read", "Tiada penulisan yang sepadan. Cuba kata kunci lain atau kosongkan penapis.": "No matching writings. Try another search or clear the filters.",
    "Tanpa tarikh": "Undated", "e-Buku": "E-books", "Kertas Kajian": "Research Papers", "Belum ada terbitan dalam kategori ini.": "No publications in this category yet.",
    "Kulit": "Cover", "Semua": "All", "Jenis": "Type", "Tahun": "Year", "Cari tajuk atau pengarang": "Search by title or author", "daripada": "of",
    "Artikel, kertas kajian, e-buku, risalah dan terjemahan.": "Articles, research papers, e-books, booklets and translations.",
    "E-buku, risalah dan kertas kajian.": "E-books, booklets and research papers.", "Semua penulisan mengikut tahun.": "All writings by year.",
    "Belum ada penulisan.": "No writings yet.", "Penulisan tidak ditemui": "Writing not found", "Kembali ke senarai penulisan": "Back to all writings",
    "Muat turun PDF": "Download PDF", "Pautan penuh": "Full link", "Teks penuh akan dikongsikan di sini.": "The full text will be shared here.",
    "Kandungan": "Contents", "Maklumat": "Details", "Status": "Status", "Tarikh": "Date", "Terbitan / Persidangan": "Publication / Conference",
    "Bacaan berkaitan": "Related reading", "Sebelumnya": "Previous", "Seterusnya": "Next", "Jejak": "Breadcrumb", "Tulisan lain": "Other writings",
    "Infografik": "Infographic", "Muat turun": "Download", "Buka saiz penuh": "Open full size", "Pengalaman": "Experience", "Pendidikan": "Education",
    "Senarai penuh": "Full list", "E-mel": "Email", "Butiran hubungan akan dikemas kini.": "Contact details will be updated.",
    "Artikel": "Article", "Kertas kajian": "Research paper", "Kertas persidangan": "Conference paper", "E-buku": "E-book", "Risalah": "Booklet", "Terjemahan": "Translation",
    "Terbit": "Published", "Pembentangan": "Presented", "Akan terbit": "Forthcoming", "Dalam penulisan": "In progress", "Dalam perancangan": "Planned",
    "Baca secara flip": "Flip-through reader", "Halaman sebelumnya": "Previous page", "Halaman seterusnya": "Next page", "Sebelum": "Previous",
    "Skrin penuh": "Full screen", "Tutup skrin penuh": "Exit full screen", "Halaman": "Page",
    "Klik atau leret halaman untuk menyelak. Kekunci anak panah juga boleh digunakan.": "Click or swipe a page to turn it. The arrow keys work too.",
    "Muat turun PDF gagal. Cuba lagi sebentar.": "PDF download failed. Please try again shortly.", "Tunggu sebentar dan cuba lagi.": "Please wait a moment and try again.",
    "Muat turun tidak tersedia di paparan ini. Gunakan Buka saiz penuh, kemudian simpan gambar.": "Download isn't available in this view. Use Open full size, then save the image.",
    "Muat turun gagal. Gunakan Buka saiz penuh, kemudian simpan gambar.": "Download failed. Use Open full size, then save the image.",
    "Dan katakanlah: Wahai Tuhanku, tambahkanlah ilmuku.": "And say: My Lord, increase me in knowledge.", "Bahasa": "Language",
    "Untuk jualan": "For sale", "Beli e-buku": "Buy e-book", "Beli": "Buy", "Harga": "Price", "Harga dan pautan pembelian akan diumumkan.": "Price and purchase link will be announced soon.",
    "Pembayaran melalui toyyibPay. E-buku dihantar selepas pembayaran disahkan.": "Payment via toyyibPay. The e-book is sent once payment is confirmed.",
    "Pratonton": "Preview", "Pelawat hari ini": "Visitors today", "Jumlah pelawat": "Total visitors", "Kongsi": "Share", "Salin pautan": "Copy link", "Pautan disalin": "Link copied",
    "Pautan disalin. Tampal dalam Instagram (Story, bio atau mesej).": "Link copied. Paste it into Instagram (Story, bio or message).",
    "Pautan dipilih. Tekan Ctrl+C atau Salin untuk menyalin.": "Link selected. Press Ctrl+C or Copy to copy it.", "Kongsi ke": "Share to", "halaman pertama": "first pages", "Dapatkan naskhah penuh": "Get the full copy"
  };
  var ICON = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V14h2.7v8h3.3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M7.5 2.9h9a4.6 4.6 0 0 1 4.6 4.6v9a4.6 4.6 0 0 1-4.6 4.6h-9a4.6 4.6 0 0 1-4.6-4.6v-9a4.6 4.6 0 0 1 4.6-4.6z"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>',
    ln: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/></svg>'
  };
  function shareUrl(t) { var base = D.site.urlLaman || ""; return base ? base.replace(/#.*$/, "") + "#baca-" + t.id : location.href.replace(/#.*$/, "") + "#baca-" + t.id; }
  function shareHtml(t, cls) {
    var u = shareUrl(t), title = F(t, "tajuk"), txt = encodeURIComponent(title + " \u2014 " + u);
    return '<div class="share ' + (cls || "") + '"><h3>' + T("Kongsi") + '</h3><div class="share-row">' +
      '<a class="sh sh-wa" href="https://wa.me/?text=' + txt + '" target="_blank" rel="noopener" aria-label="' + T("Kongsi ke") + ' WhatsApp">' + ICON.wa + "<span>WhatsApp</span></a>" +
      '<a class="sh sh-fb" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(u) + '" target="_blank" rel="noopener" aria-label="' + T("Kongsi ke") + ' Facebook">' + ICON.fb + "<span>Facebook</span></a>" +
      '<button type="button" class="sh sh-ig" data-act="share-ig" data-v="' + esc(u) + '" data-t="' + esc(title) + '" aria-label="' + T("Kongsi ke") + ' Instagram">' + ICON.ig + "<span>Instagram</span></button>" +
      '<button type="button" class="sh sh-ln" data-act="share-copy" data-v="' + esc(u) + '">' + ICON.ln + "<span>" + T("Salin pautan") + "</span></button>" +
      "</div></div>";
  }
  function copyText(text) {
    return new Promise(function (ok, no) {
      var fallback = function () {
        var ta = document.createElement("textarea");
        ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        var done = false; try { done = document.execCommand("copy"); } catch (e) {}
        ta.remove(); done ? ok() : no();
      };
      try { navigator.clipboard.writeText(text).then(ok, fallback); } catch (e) { fallback(); }
    });
  }
  /* Daily visitor counter (GoatCounter). Runs only on the public site, never inside claude.ai. */
  var VS = null;
  function counterOn() { return !!D.site.goatcounter && !/claude(usercontent)?\.(ai|com)$/.test(location.hostname) && location.protocol.indexOf("http") === 0; }
  function statsHtml() {
    if (!counterOn()) return "";
    return '<span class="visit-stats" id="visit-stats"' + (VS ? "" : " hidden") + ">" + (VS ? statsText() : "") + "</span>";
  }
  function statsText() {
    return T("Pelawat hari ini") + ": <b>" + esc(VS.today) + "</b>" + (VS.total ? " · " + T("Jumlah pelawat") + ": <b>" + esc(VS.total) + "</b>" : "");
  }
  function counterInit() {
    if (!counterOn()) return;
    var code = String(D.site.goatcounter).replace(/[^a-z0-9-]/gi, "");
    var sc = document.createElement("script");
    sc.async = true; sc.src = "https://gc.zgo.at/count.js";
    sc.setAttribute("data-goatcounter", "https://" + code + ".goatcounter.com/count");
    document.head.appendChild(sc);
    var day = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kuala_Lumpur", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    var base = "https://" + code + ".goatcounter.com/counter/TOTAL.json";
    var get = function (u) { return fetch(u).then(function (r) { if (!r.ok) throw r.status; return r.json(); }).then(function (j) { return String(j.count || "0").replace(/\u202f|\u00a0/g, " "); }); };
    Promise.all([get(base + "?start=" + day), get(base).catch(function () { return ""; })]).then(function (v) {
      VS = { today: v[0], total: v[1] };
      var el = document.getElementById("visit-stats");
      if (el) { el.innerHTML = statsText(); el.hidden = false; }
    }).catch(function () {});
  }
  function priceTag(t) { return t.jualan ? T("Untuk jualan") + (t.harga ? " · RM" + t.harga : "") : ""; }
  function buyBox(t, cls) {
    if (!t.jualan) return "";
    var url = safeUrl(t.pautanBeli);
    return '<div class="buy ' + (cls || "") + '"><span class="buy-k">' + T("Untuk jualan") + "</span>" + (t.harga ? '<span class="buy-p">RM' + esc(t.harga) + "</span>" : "") +
      (url ? '<a class="buy-btn" href="' + esc(url) + '" target="_blank" rel="noopener">' + T("Beli e-buku") + '</a><small>' + T("Pembayaran melalui toyyibPay. E-buku dihantar selepas pembayaran disahkan.") + "</small>" : "<small>" + T("Harga dan pautan pembelian akan diumumkan.") + "</small>") + "</div>";
  }
  function T(x) { return LANG === "en" && EN[x] ? EN[x] : x; }
  function F(o, k) { return o ? (LANG === "en" && o[k + "En"] && (!Array.isArray(o[k + "En"]) || o[k + "En"].length) ? o[k + "En"] : o[k]) : ""; }
  function setLang(l) {
    LANG = l === "en" ? "en" : "ms";
    try { localStorage.setItem("ki-lang", LANG); } catch (e) {}
    document.documentElement.lang = LANG;
  }
  document.documentElement.lang = LANG;

  var owner = false, artifact = null, assets = null;
  var query = "", jenisFilter = "", siriFilter = "", yearFilter = "", pubTab = "E-buku", saving = false, delArmed = "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function B(id) { return (D.blobs && D.blobs[id]) || "/_blob/" + id; }
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }
  function sorted() {
    return D.tulisan.slice().sort(function (a, b) { return String(b.tarikh).localeCompare(String(a.tarikh)); });
  }
  function find(id) { return D.tulisan.filter(function (t) { return t.id === id; })[0]; }
  function siriOf(id) { return D.siri.filter(function (s) { return s.id === id; })[0]; }
  function dateParts(t) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t || "");
    var MB = LANG === "en" ? MONTHS_EN : BULAN;
    if (m) return { top: m[3] + " " + MB[+m[2] - 1], sub: m[1], full: +m[3] + " " + MB[+m[2] - 1] + " " + m[1] };
    return { top: t || "", sub: "", full: t || "" };
  }

  /* Render */
  var AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
  function arNum(n) { return String(n).replace(/\d/g, function (d) { return AR_DIGITS[d]; }); }
  function yearOf(t) { return (/^\d{4}/.exec(t.tarikh || "") || [T("Tanpa tarikh")])[0]; }
  function words(t) { return String((F(t, "kandungan") || "") + " " + (F(t, "ringkasan") || "")).split(/\s+/).filter(Boolean).length; }
  function minutes(t) { return F(t, "kandungan") ? Math.max(1, Math.round(words(t) / 200)) : 0; }
  function byline(t) {
    return [T(t.jenis), T(t.status), dateParts(t.tarikh).full].filter(Boolean).join(" · ");
  }
  function today() {
    var d = new Date(), out = { m: "", h: "" };
    try { out.m = new Intl.DateTimeFormat(LANG === "en" ? "en-GB" : "ms-MY", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d); } catch (e) { out.m = d.toDateString(); }
    try { out.h = new Intl.DateTimeFormat((LANG === "en" ? "en-GB" : "ms-MY") + "-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric" }).format(d).replace(/\s*(H|AH|SH)\.?$/, "") + (LANG === "en" ? " AH" : " H"); } catch (e) { out.h = ""; }
    return out;
  }
  function countBy(list, fn) {
    var m = {};
    list.forEach(function (t) { var k = fn(t); if (k) m[k] = (m[k] || 0) + 1; });
    return m;
  }
  function link(t, cls) { return '<a' + (cls ? ' class="' + cls + '"' : "") + ' href="#baca-' + esc(t.id) + '">' + esc(F(t, "tajuk")) + "</a>"; }

  function shell(route, inner) {
    var links = [["utama", "Utama"], ["penulisan", "Penulisan"], ["epenerbitan", "e-Penerbitan"], ["arkib", "Arkib"], ["profil", "Profil"]];
    var nav = links.map(function (l) {
      return '<li><a href="#' + l[0] + '"' + (route === l[0] ? ' aria-current="page"' : "") + ">" + T(l[1]) + "</a></li>";
    }).join("");
    var d = today();
    var siriFoot = D.siri.slice(0, 8).map(function (s) { return '<li><a href="#siri-' + esc(s.id) + '">' + esc(s.nama) + "</a></li>"; }).join("");
    var langSw = '<span class="lang-sw" role="group" aria-label="' + T("Bahasa") + '"><button type="button" data-act="lang" data-v="ms" aria-pressed="' + (LANG === "ms") + '" lang="ms">BM</button><button type="button" data-act="lang" data-v="en" aria-pressed="' + (LANG === "en") + '" lang="en">EN</button></span>';
    return '<div class="util"><div class="wrap"><span>' + esc(d.m) + '</span><span class="util-r">' + (d.h ? '<span class="hijri">' + esc(d.h) + "</span>" : "") + langSw + "</span></div></div>" +
      '<header class="mast"><div class="wrap mast-top"><a class="mast-name" href="#utama"><strong>' + esc(D.site.namaLaman || D.site.nama) + "</strong><span>" + esc(F(D.site, "gelaran")) + '</span></a></div>' +
      '<nav class="mast-nav" aria-label="' + T("Menu utama") + '"><div class="wrap"><ul>' + nav + '</ul><form class="search" data-form="search" role="search"><input id="cari-atas" type="search" placeholder="' + T("Cari tulisan") + '" aria-label="' + T("Cari penulisan") + '"><button type="submit">' + T("Cari") + '</button></form></div></nav></header>' +
      (owner ? '<div class="owner"><div class="wrap"><span>Pemilik laman:</span><a href="#tulis">Tulisan baharu</a><a href="#sunting-profil">Sunting profil</a></div></div>' : "") +
      "<main>" + inner + "</main>" +
      '<footer><div class="wrap foot-grid">' +
      '<div><h4>' + T("Laman") + '</h4><ul>' + links.map(function (l) { return '<li><a href="#' + l[0] + '">' + T(l[1]) + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>" + T("Siri") + "</h4><ul>" + siriFoot + "</ul></div>" +
      "<div><h4>" + T("Hubungi") + "</h4>" + (D.site.emel ? '<p class="sel">' + esc(D.site.emel) + "</p>" : "<p>" + T("Butiran hubungan di halaman Profil.") + "</p>") + '<p><a href="#profil">' + T("Profil penulis") + "</a></p></div></div>" +
      '<div class="wrap foot-base"><span>© ' + new Date().getFullYear() + " " + esc(D.site.namaLaman || D.site.nama) + "</span>" + statsHtml() + "<span>" + T("Hak cipta setiap tulisan milik penulisnya.") + "</span></div></footer>";
  }

  function viewHome() {
    var all = sorted(), lead = all[0], rest = all.slice(1, 4);
    var heb = all[1];
    var notice = heb ? '<div class="notice"><div class="wrap"><b>' + T("Hebahan") + "</b>" + link(heb) + '<span class="notice-st">' + esc(T(heb.status)) + "</span></div></div>" : "";
    var jen = countBy(D.tulisan, function (t) { return t.jenis; });
    var activeSiri = D.siri.filter(function (s) { return D.tulisan.some(function (t) { return t.siri === s.id; }); }).length;
    var stats = [[D.tulisan.length, T("Penulisan")], [jen["E-buku"] || 0, T("E-buku")], [jen["Risalah"] || 0, T("Risalah")], [activeSiri, T("Siri aktif")]];

    var front = lead
      ? '<article class="front-lead"><span class="kicker-dark">' + esc((siriOf(lead.siri) || {}).nama || T(lead.jenis)) + "</span><h1>" + link(lead) + '</h1><p class="front-sum">' + esc(F(lead, "ringkasan")) + '</p><p class="meta">' + esc(lead.pengarang) + " · " + esc(byline(lead)) + '</p><a class="read-more" href="#baca-' + esc(lead.id) + '">' + T("Baca penulisan") + "</a></article>"
      : '<article class="front-lead"><h1>' + esc(F(D.site, "gelaran")) + '</h1><p class="front-sum">' + T("Penulisan akan disiarkan di sini.") + "</p></article>";
    var ayah = '<figure class="ayah"><blockquote class="ar" lang="ar">وَقُل رَّبِّ زِدْنِي عِلْمًا</blockquote><figcaption>“' + T("Dan katakanlah: Wahai Tuhanku, tambahkanlah ilmuku.") + '”<cite>Surah Taha, 20:114</cite></figcaption></figure>';
    var statBox = '<dl class="stats">' + stats.map(function (x) { return "<div><dt>" + x[1] + "</dt><dd>" + x[0] + "</dd></div>"; }).join("") + "</dl>";

    var latest = rest.length ? '<section class="block"><div class="wrap"><div class="block-head"><h2>' + T("Terkini") + '</h2><a href="#penulisan">' + T("Semua penulisan") + '</a></div><div class="latest">' +
      rest.map(function (t) {
        return '<article class="col-entry"><span class="col-kind">' + esc(T(t.jenis)) + "</span><h3>" + link(t) + "</h3>" + (t.ringkasan ? "<p>" + esc(F(t, "ringkasan")) + "</p>" : "") + '<span class="meta">' + esc(T(t.status)) + " · " + esc(dateParts(t.tarikh).full) + "</span></article>";
      }).join("") + "</div></div></section>" : "";

    var fihris = '<ol class="fihris-list">' + D.siri.map(function (s, i) {
      var n = D.tulisan.filter(function (t) { return t.siri === s.id; }).length;
      return '<li class="' + (n ? "" : "none") + '"><span class="fnum" lang="ar">' + arNum(i + 1) + '</span><div><a href="#siri-' + esc(s.id) + '">' + esc(s.nama) + "</a><small>" + esc(F(s, "kata")) + "</small></div><i></i><b>" + (n ? n : "—") + "</b></li>";
    }).join("") + "</ol>";
    var years = countBy(D.tulisan, yearOf), yk = Object.keys(years).sort().reverse();
    var arkib = '<ul class="arkib-mini">' + yk.map(function (y) {
      var items = sorted().filter(function (t) { return yearOf(t) === y; });
      return '<li><a class="yr" href="#arkib">' + esc(y) + '</a><span class="meta">' + years[y] + " " + T("penulisan") + "</span><ul>" + items.slice(0, 4).map(function (t) { return "<li>" + link(t) + "</li>"; }).join("") + "</ul></li>";
    }).join("") + "</ul>";

    var books = sorted().filter(function (t) { return t.jenis === "E-buku" || t.jenis === "Risalah"; });
    var shelf = books.length ? '<section class="block"><div class="wrap"><div class="block-head"><h2>' + T("e-Penerbitan") + '</h2><a href="#epenerbitan">' + T("Rak penuh") + "</a></div>" + shelfHtml(books) + "</div></section>" : "";

    var timeline = F(D.site, "kerjaya").map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var edu = F(D.site, "pendidikan").map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var author = '<section class="author"><div class="wrap author-grid">' +
      (D.site.foto ? '<img class="author-photo" src="' + esc(B(D.site.foto)) + '" alt="' + esc(D.site.nama) + '">' : "") +
      '<div class="author-bio"><span class="kicker">' + T("Tentang penulis") + '</span><h2>' + esc(D.site.nama) + "</h2><p>" + esc(F(D.site, "bio")) + '</p><a class="read-more on-dom" href="#profil">' + T("Profil penuh") + "</a></div>" +
      '<div class="author-tl"><h3>' + T("Kerjaya") + '</h3><ol class="tl">' + timeline + "</ol><h3>" + T("Pengajian") + "</h3><ol class=\"tl\">" + edu + "</ol></div></div></section>";

    return notice +
      '<section class="front"><div class="wrap front-grid">' + front + '<aside class="front-side">' + ayah + statBox + "</aside></div></section>" +
      latest +
      '<section class="block alt"><div class="wrap two-col"><div><div class="block-head"><h2>' + T("Fihris Siri") + '</h2></div>' + fihris + '</div><div><div class="block-head"><h2>' + T("Arkib") + '</h2><a href="#arkib">' + T("Lihat arkib") + '</a></div>' + arkib + "</div></div></section>" +
      shelf + author;
  }

  function shelfHtml(books) {
    return '<div class="shelf-wrap"><div class="shelf">' + books.map(function (t, i) {
      var h = Math.max(230, Math.min(330, F(t, "tajuk").length * 9 + 40)), w = 46 + (i % 3) * 6;
      return '<a class="spine s' + (i % 3) + '" style="height:' + h + "px;width:" + w + 'px" href="#baca-' + esc(t.id) + '" title="' + esc(F(t, "tajuk")) + '"><span class="sp-t">' + esc(F(t, "tajuk")) + '</span></a>';
    }).join("") + '</div><div class="ledge"></div></div>' +
      '<ul class="shelf-notes">' + books.map(function (t) {
        return "<li>" + link(t) + '<span class="meta">' + esc(T(t.jenis)) + " · " + esc(T(t.status)) + "</span></li>";
      }).join("") + "</ul>";
  }

  function entries(list) {
    return list.map(function (t) {
      var m = minutes(t);
      return '<article class="entry"><h3>' + link(t) + '</h3><span class="meta">' + esc(byline(t)) + (m ? " · " + m + " " + T("min bacaan") : "") + "</span>" + (t.jualan ? '<span class="sale-tag">' + esc(priceTag(t)) + "</span>" : "") + (t.ringkasan ? "<p>" + esc(F(t, "ringkasan")) + "</p>" : "") + "</article>";
    }).join("");
  }
  function rows(list) {
    if (!list.length) return '<p class="empty">' + T("Tiada penulisan yang sepadan. Cuba kata kunci lain atau kosongkan penapis.") + "</p>";
    var groups = {}, order = [];
    list.forEach(function (t) { var y = yearOf(t); if (!groups[y]) { groups[y] = []; order.push(y); } groups[y].push(t); });
    return order.map(function (y) { return '<section class="yr-group"><h2 class="yr-h">' + esc(y) + "<span>" + groups[y].length + "</span></h2>" + entries(groups[y]) + "</section>"; }).join("");
  }

  function pubBlock() {
    var tabs = PUB_TABS.map(function (p) {
      var n = D.tulisan.filter(function (t) { return t.jenis === p[0]; }).length;
      return '<button type="button" role="tab" data-act="pubtab" data-v="' + esc(p[0]) + '" aria-selected="' + (pubTab === p[0]) + '">' + T(p[1]) + " <span>" + n + "</span></button>";
    }).join("");
    var items = sorted().filter(function (t) { return t.jenis === pubTab; });
    var body = items.length ? (pubTab !== "Kertas kajian" ? shelfHtml(items).replace(/<ul class="shelf-notes">[\s\S]*<\/ul>$/, "") : "") + items.map(function (t) {
      return '<div class="pub' + (t.kulit ? "" : " plain") + '">' + (t.kulit ? '<a href="#baca-' + esc(t.id) + '"><img src="' + esc(B(t.kulit)) + '" alt="' + T("Kulit") + " " + esc(F(t, "tajuk")) + '"></a>' : "") +
        '<div class="entry" style="padding:0;border:0"><h3>' + link(t) + '</h3><span class="meta">' + esc(t.pengarang) + " · " + esc(byline(t)) + "</span>" + (t.jualan ? '<span class="sale-tag">' + esc(priceTag(t)) + "</span>" : "") + (t.ringkasan ? "<p>" + esc(F(t, "ringkasan")) + "</p>" : "") + "</div></div>";
    }).join("") : '<p class="empty">' + T("Belum ada terbitan dalam kategori ini.") + "</p>";
    return '<div class="tabs" role="tablist">' + tabs + "</div>" + body;
  }

  function filtered() {
    var q = query.toLowerCase();
    return sorted().filter(function (t) {
      if (jenisFilter && t.jenis !== jenisFilter) return false;
      if (siriFilter && t.siri !== siriFilter) return false;
      if (yearFilter && yearOf(t) !== yearFilter) return false;
      if (!q) return true;
      return [t.tajuk, t.ringkasan, t.tajukEn || "", t.ringkasanEn || "", t.pengarang].join(" ").toLowerCase().indexOf(q) > -1;
    });
  }
  function facet(title, key, cur, pairs) {
    return '<div class="facet"><h3>' + title + '</h3><ul><li><button type="button" data-act="facet" data-k="' + key + '" data-v="" aria-pressed="' + !cur + '">' + T("Semua") + "</button></li>" +
      pairs.map(function (p) { return '<li><button type="button" data-act="facet" data-k="' + key + '" data-v="' + esc(p[0]) + '" aria-pressed="' + (cur === p[0]) + '">' + esc(p[1]) + "<span>" + p[2] + "</span></button></li>"; }).join("") + "</ul></div>";
  }
  function viewList(title, lead) {
    var list = filtered();
    var jc = countBy(D.tulisan, function (t) { return t.jenis; }), sc = countBy(D.tulisan, function (t) { return t.siri; }), yc = countBy(D.tulisan, yearOf);
    var side = facet(T("Jenis"), "jenis", jenisFilter, JENIS.filter(function (j) { return jc[j]; }).map(function (j) { return [j, T(j), jc[j]]; })) +
      facet(T("Siri"), "siri", siriFilter, D.siri.filter(function (s) { return sc[s.id]; }).map(function (s) { return [s.id, s.nama, sc[s.id]]; })) +
      facet(T("Tahun"), "tahun", yearFilter, Object.keys(yc).sort().reverse().map(function (y) { return [y, y, yc[y]]; }));
    return '<section class="page-head"><div class="wrap"><h1>' + esc(title) + "</h1><p>" + esc(lead) + "</p></div></section>" +
      '<section class="section"><div class="wrap list-grid"><aside class="facets">' + side + '</aside><div class="list-main"><div class="filters"><input id="cari" type="search" placeholder="' + T("Cari tajuk atau pengarang") + '" aria-label="' + T("Cari") + '" value="' + esc(query) + '"></div><p class="meta" id="kiraan">' + list.length + " " + T("daripada") + " " + D.tulisan.length + " " + T("penulisan") + '</p><div id="senarai">' + rows(list) + "</div></div></div></section>";
  }

  function viewArkib() {
    var years = countBy(D.tulisan, yearOf), yk = Object.keys(years).sort().reverse();
    var body = yk.length ? yk.map(function (y) {
      var items = sorted().filter(function (t) { return yearOf(t) === y; });
      var bym = countBy(items, function (t) { return t.jenis; });
      return '<section class="ark-year"><div class="ark-y"><span>' + esc(y) + '</span><small>' + Object.keys(bym).map(function (k) { return bym[k] + " " + T(k).toLowerCase() + (LANG === "en" && bym[k] > 1 ? "s" : ""); }).join(", ") + '</small></div><ol class="ark-list">' +
        items.map(function (t) { return '<li><span class="meta">' + esc(dateParts(t.tarikh).top) + "</span><div>" + link(t) + '<span class="meta">' + esc(T(t.jenis)) + " · " + esc(T(t.status)) + "</span></div></li>"; }).join("") + "</ol></section>";
    }).join("") : '<p class="empty">' + T("Belum ada penulisan.") + "</p>";
    return '<section class="page-head"><div class="wrap"><h1>' + T("Arkib") + "</h1><p>" + T("Semua penulisan mengikut tahun.") + '</p></div></section><section class="section"><div class="wrap">' + body + "</div></section>";
  }

  var headCount = 0;
  function renderProse(src) {
    var out = [];
    headCount = 0;
    String(src || "").split(/\n\s*\n/).forEach(function (blk) {
      blk = blk.trim();
      if (!blk) return;
      var rtl = /[؀-ۿ]/.test(blk) && (blk.match(/[؀-ۿ]/g).length > blk.replace(/\s/g, "").length * 0.5);
      var dir = rtl ? ' dir="rtl" lang="ar"' : "";
      if (/^##\s+/.test(blk)) { headCount++; out.push('<h2 id="bah-' + headCount + '"' + dir + ">" + inline(blk.replace(/^##\s+/, "")) + "</h2>"); return; }
      if (/^>\s?/.test(blk)) { out.push("<blockquote" + dir + ">" + inline(blk.replace(/^>\s?/gm, "")) + "</blockquote>"); return; }
      if (/^-\s+/.test(blk)) { out.push("<ul>" + blk.split("\n").map(function (l) { return "<li>" + inline(l.replace(/^-\s+/, "")) + "</li>"; }).join("") + "</ul>"); return; }
      out.push("<p" + dir + ">" + inline(blk).replace(/\n/g, "<br>") + "</p>");
    });
    return out.join("");
  }
  function headings(src) {
    return String(src || "").split(/\n\s*\n/).map(function (b) { return b.trim(); }).filter(function (b) { return /^##\s+/.test(b); }).map(function (b) { return b.replace(/^##\s+/, "").replace(/\*/g, ""); });
  }
  function inline(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  }
  function citation(t) {
    var year = (/^\d{4}/.exec(t.tarikh) || ["t.t."])[0];
    return t.pengarang + ". (" + year + "). " + t.tajuk + "." + (t.penerbit ? " " + t.penerbit + "." : "");
  }

  /* Flipbook: page images (t.halaman) read as a book. Spread view on wide screens, single page on narrow ones. */
  var FL = null;
  function flipPages(t) { var h = (t.halaman || []).slice(); return t.jualan ? h.slice(0, Math.max(1, +t.pratonton || 4)) : h; }
  function flipHtml(t) {
    if (!t || !(t.halaman || []).length) return "";
    return '<section class="flip-sec" aria-label="' + T("Baca secara flip") + '"><div class="wrap">' +
      '<div class="flip" id="flip" tabindex="-1"><div class="flip-stage" id="flip-stage"><div class="flip-book" id="flip-book"></div></div>' +
      '<div class="flip-bar"><button type="button" class="flip-btn" data-act="fprev" id="flip-prev" aria-label="' + T("Halaman sebelumnya") + '">&larr; ' + T("Sebelum") + "</button>" +
      '<span class="flip-num" id="flip-num" aria-live="polite"></span>' +
      '<button type="button" class="flip-btn" data-act="fnext" id="flip-next" aria-label="' + T("Halaman seterusnya") + '">' + T("Seterusnya") + " &rarr;</button>" +
      '<button type="button" class="flip-btn flip-full" data-act="ffull" id="flip-fullbtn">' + T("Skrin penuh") + "</button>" +
      (t.jualan ? (safeUrl(t.pautanBeli) ? '<a class="flip-btn flip-dl" href="' + esc(safeUrl(t.pautanBeli)) + '" target="_blank" rel="noopener">' + T("Dapatkan naskhah penuh") + "</a>" : "") : t.pdf ? '<button type="button" class="flip-btn flip-dl" data-act="dl" data-v="' + esc(t.pdf) + '" data-f="' + esc((t.id || "dokumen") + ".pdf") + '" data-fail="' + T("Muat turun PDF gagal. Cuba lagi sebentar.") + '">' + T("Muat turun PDF") + "</button>" : "") + "</div>" +
      (t.jualan ? '<p class="flip-hint"><b>' + T("Pratonton") + "</b> · " + flipPages(t).length + " " + T("halaman pertama") + "</p>" : "") +
      '<p class="flip-hint">' + T("Klik atau leret halaman untuk menyelak. Kekunci anak panah juga boleh digunakan.") + "</p></div></div></section>";
  }
  function flipInit(t) {
    FL = null;
    document.documentElement.classList.remove("flip-lock");
    var root = document.getElementById("flip");
    if (!root || !t || !(t.halaman || []).length) return;
    FL = { pages: flipPages(t), pos: 0, mode: "", busy: false, max: false, title: t.tajuk };
    flipLayout();
    var stage = document.getElementById("flip-stage"), sx = null, sy = null;
    stage.addEventListener("click", function (e) {
      if (FL.mode === "single") { flipGo(e.clientX - stage.getBoundingClientRect().left < stage.clientWidth / 3 ? -1 : 1); return; }
      var bk = document.getElementById("flip-book").getBoundingClientRect();
      flipGo(e.clientX < bk.left + bk.width / 2 ? -1 : 1);
    });
    stage.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { e.preventDefault(); flipGo(dx < 0 ? 1 : -1); }
    });
  }
  function flipSize() {
    var root = document.getElementById("flip"), ratio = 595 / 420;
    var cw = root.clientWidth, maxH = Math.max(320, (FL.max ? innerHeight - 110 : innerHeight * 0.8));
    var spread = cw >= 680;
    var pw = spread ? Math.min(cw / 2, maxH / ratio) : Math.min(cw, maxH / ratio);
    return { spread: spread, pw: Math.floor(pw), ph: Math.floor(pw * ratio) };
  }
  function flipLayout() {
    if (!FL) return;
    var sz = flipSize(), mode = sz.spread ? "spread" : "single", book = document.getElementById("flip-book"), stage = document.getElementById("flip-stage");
    if (mode !== FL.mode) {
      if (FL.mode === "spread" && mode === "single") FL.pos = Math.max(0, Math.min(FL.pages.length - 1, FL.pos * 2 - 1));
      else if (FL.mode === "single" && mode === "spread") FL.pos = Math.ceil(FL.pos / 2);
      FL.mode = mode;
      var src = function (i) { return i < FL.pages.length ? esc(B(FL.pages[i])) : ""; };
      var img = function (i) { return src(i) ? '<img src="' + src(i) + '" alt="' + T("Halaman") + " " + (i + 1) + '" draggable="false"' + (i > 3 ? ' loading="lazy"' : "") + ">" : '<div class="flip-blank"></div>'; };
      if (mode === "spread") {
        var L = Math.ceil(FL.pages.length / 2), h = "";
        for (var j = 0; j < L; j++) h += '<div class="leaf" data-j="' + j + '"><div class="face front">' + img(2 * j) + '</div><div class="face back">' + img(2 * j + 1) + "</div></div>";
        book.innerHTML = h;
      } else {
        book.innerHTML = '<div class="single-page" id="flip-single">' + img(FL.pos) + "</div>";
      }
      book.className = "flip-book " + mode;
    }
    book.style.width = (mode === "spread" ? sz.pw * 2 : sz.pw) + "px";
    book.style.height = sz.ph + "px";
    stage.style.height = sz.ph + "px";
    flipPaint(false);
  }
  function flipPaint(animJ) {
    var book = document.getElementById("flip-book"), n = FL.pages.length;
    if (FL.mode === "spread") {
      var L = Math.ceil(n / 2), leaves = book.querySelectorAll(".leaf");
      Array.prototype.forEach.call(leaves, function (lf, j) {
        var flipped = j < FL.pos;
        lf.classList.toggle("flipped", flipped);
        lf.style.zIndex = j === animJ ? 2 * L + 2 : (flipped ? j + 1 : L - j);
      });
      var shift = FL.pos === 0 ? -25 : (FL.pos === L && n % 2 === 0 ? 25 : 0);
      book.style.transform = "translateX(" + shift + "%)";
      var label = FL.pos === 0 ? T("Kulit") + " · 1 / " + n : (FL.pos === L && n % 2 === 0 ? n + " / " + n : (2 * FL.pos) + "–" + Math.min(n, 2 * FL.pos + 1) + " / " + n);
      document.getElementById("flip-num").textContent = label;
      document.getElementById("flip-prev").disabled = FL.pos === 0;
      document.getElementById("flip-next").disabled = FL.pos >= L;
    } else {
      document.getElementById("flip-num").textContent = (FL.pos + 1) + " / " + n;
      document.getElementById("flip-prev").disabled = FL.pos === 0;
      document.getElementById("flip-next").disabled = FL.pos >= n - 1;
    }
  }
  function flipGo(d) {
    if (!FL || FL.busy) return;
    var n = FL.pages.length, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (FL.mode === "spread") {
      var L = Math.ceil(n / 2), np = FL.pos + d;
      if (np < 0 || np > L) return;
      var j = d > 0 ? FL.pos : FL.pos - 1;
      FL.pos = np; FL.busy = true;
      flipPaint(j);
      setTimeout(function () { if (!FL) return; FL.busy = false; flipPaint(-1); }, reduce ? 0 : 720);
    } else {
      var np2 = FL.pos + d;
      if (np2 < 0 || np2 >= n) return;
      FL.pos = np2;
      var box = document.getElementById("flip-single");
      box.innerHTML = '<img src="' + esc(B(FL.pages[np2])) + '" alt="' + T("Halaman") + " " + (np2 + 1) + '" draggable="false" class="' + (reduce ? "" : (d > 0 ? "in-next" : "in-prev")) + '">';
      flipPaint(-1);
    }
  }
  function flipFull() {
    if (!FL) return;
    FL.max = !FL.max;
    var root = document.getElementById("flip");
    root.classList.toggle("max", FL.max);
    document.documentElement.classList.toggle("flip-lock", FL.max);
    document.getElementById("flip-fullbtn").textContent = FL.max ? T("Tutup skrin penuh") : T("Skrin penuh");
    flipLayout();
    root.focus();
  }
  var flipRT = null;
  window.addEventListener("resize", function () { clearTimeout(flipRT); flipRT = setTimeout(flipLayout, 120); });
  document.addEventListener("keydown", function (e) {
    if (!FL) return;
    var tg = e.target && e.target.tagName;
    if (tg === "INPUT" || tg === "TEXTAREA" || tg === "SELECT") return;
    if (e.key === "ArrowRight") { flipGo(1); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { flipGo(-1); e.preventDefault(); }
    else if (e.key === "Escape" && FL.max) flipFull();
  });

  function viewRead(t) {
    if (!t) return '<section class="section"><div class="wrap"><h1>' + T("Penulisan tidak ditemui") + '</h1><a href="#penulisan">' + T("Kembali ke senarai penulisan") + "</a></div></section>";
    var s = siriOf(t.siri), d = dateParts(t.tarikh), url = safeUrl(t.pautan), m = minutes(t);
    var acts = (t.pdf && !t.jualan ? '<button type="button" class="linkish" data-act="dl" data-v="' + esc(t.pdf) + '" data-f="' + esc((t.id || "dokumen") + ".pdf") + '" data-fail="' + T("Muat turun PDF gagal. Cuba lagi sebentar.") + '">' + T("Muat turun PDF") + "</button>" : "") +
      (url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + T("Pautan penuh") + "</a>" : "");
    var body = F(t, "kandungan") ? renderProse(F(t, "kandungan")) : ((t.halaman || []).length || t.jualan ? "" : '<p class="later">' + T("Teks penuh akan dikongsikan di sini.") + "</p>");
    var hs = headings(F(t, "kandungan"));
    var toc = hs.length ? '<div class="toc-box"><h3>' + T("Kandungan") + "</h3><ol>" + hs.map(function (h, i) { return '<li><button type="button" class="linkish plain" data-act="jump" data-v="bah-' + (i + 1) + '">' + esc(h) + "</button></li>"; }).join("") + "</ol></div>" : "";
    var ownerActs = owner ? '<div><h3>Pemilik</h3><div class="side-acts"><a href="#sunting-' + esc(t.id) + '">Sunting</a><button type="button" class="linkish danger" data-act="del" data-v="' + esc(t.id) + '">' + (delArmed === t.id ? "Sahkan padam" : "Padam") + "</button></div></div>" : "";
    var all = sorted(), i = all.indexOf(t), prev = all[i + 1], next = all[i - 1];
    var related = D.tulisan.filter(function (x) { return x !== t && x.siri === t.siri; }).slice(0, 3);
    if (!related.length) related = all.filter(function (x) { return x !== t && x.jenis === t.jenis; }).slice(0, 3);
    return '<div class="progress" aria-hidden="true"><span id="prog"></span></div>' +
      '<section class="page-head art-head"><div class="wrap"><nav class="crumbs" aria-label="' + T("Jejak") + '"><a href="#utama">' + T("Utama") + "</a> / " + (s ? '<a href="#siri-' + esc(s.id) + '">' + esc(s.nama) + "</a>" : '<a href="#penulisan">' + T("Penulisan") + "</a>") + "</nav><h1>" + esc(F(t, "tajuk")) + '</h1><p class="head-meta">' + esc(t.pengarang) + " · " + esc(d.full) + (m ? " · " + m + " " + T("min bacaan") : "") + "</p></div></section>" +
      flipHtml(t) + '<section class="section"><div class="wrap read"><article class="prose">' + (t.ringkasan ? '<p class="lede">' + esc(F(t, "ringkasan")) + "</p>" : "") + buyBox(t, "in-prose") + body + infoHtml(t) + shareHtml(t, "in-prose") + "</article>" +
      '<aside class="side">' + (t.kulit ? '<img src="' + esc(B(t.kulit)) + '" alt="' + T("Kulit") + " " + esc(F(t, "tajuk")) + '">' : "") + buyBox(t, "in-side") + '<div><h3>' + T("Maklumat") + "</h3><dl><div><dt>" + T("Jenis") + "</dt><dd>" + esc(T(t.jenis)) + "</dd></div><div><dt>" + T("Status") + "</dt><dd>" + esc(T(t.status)) + "</dd></div><div><dt>" + T("Tarikh") + "</dt><dd>" + esc(d.full) + "</dd></div>" +
      (t.penerbit ? "<div><dt>" + T("Terbitan / Persidangan") + "</dt><dd>" + esc(t.penerbit) + "</dd></div>" : "") +
      "</dl>" + (acts ? '<div class="side-acts">' + acts + "</div>" : "") + "</div>" +
      shareHtml(t, "in-side") + ownerActs + "</aside></div></section>" +
      '<section class="block alt"><div class="wrap">' +
      (related.length ? '<div class="block-head"><h2>' + T("Bacaan berkaitan") + '</h2></div><div class="latest">' + related.map(function (x) { return '<article class="col-entry"><span class="col-kind">' + esc(T(x.jenis)) + "</span><h3>" + link(x) + "</h3>" + (x.ringkasan ? "<p>" + esc(F(x, "ringkasan")) + "</p>" : "") + "</article>"; }).join("") + "</div>" : "") +
      '<nav class="pn" aria-label="' + T("Tulisan lain") + '">' + (prev ? '<a href="#baca-' + esc(prev.id) + '"><small>' + T("Sebelumnya") + "</small>" + esc(F(prev, "tajuk")) + "</a>" : "<span></span>") + (next ? '<a class="nx" href="#baca-' + esc(next.id) + '"><small>' + T("Seterusnya") + "</small>" + esc(F(next, "tajuk")) + "</a>" : "") + "</nav></div></section>";
  }

  function infoHtml(t) {
    if (!t.infografik) return "";
    var src = esc(B(t.infografik)), fn = esc((t.id || "infografik") + "-infografik.png");
    return '<figure class="info"><a href="' + src + '" target="_blank" rel="noopener"><img src="' + src + '" alt="' + T("Infografik") + ": " + esc(F(t, "tajuk")) + '" loading="lazy"></a>' +
      '<figcaption><span>' + T("Infografik") + '</span><div class="info-acts"><button type="button" class="read-more" data-act="dl" data-v="' + esc(t.infografik) + '" data-f="' + fn + '">' + T("Muat turun") + '</button><a class="info-open" href="' + src + '" target="_blank" rel="noopener">' + T("Buka saiz penuh") + '</a></div></figcaption></figure>';
  }

  function viewProfile() {
    var list = function (a) { return '<ol class="tl dark">' + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>"; };
    var jc = countBy(D.tulisan, function (t) { return t.jenis; });
    return '<section class="page-head"><div class="wrap"><h1>' + esc(D.site.nama) + '</h1><p>' + esc(F(D.site, "jawatan")) + "</p></div></section>" +
      '<section class="section"><div class="wrap prof"><div class="wide">' + (D.site.foto ? '<img src="' + esc(B(D.site.foto)) + '" alt="' + esc(D.site.nama) + '">' : "") + "<p>" + esc(F(D.site, "bio")) + "</p></div><div><h2>" + T("Pengalaman") + "</h2>" + list(F(D.site, "kerjaya")) + "</div><div><h2>" + T("Pendidikan") + "</h2>" + list(F(D.site, "pendidikan")) + "</div>" +
      '<div><h2>' + T("Penulisan") + '</h2><ul class="plist">' + Object.keys(jc).map(function (k) { return "<li><span>" + esc(T(k)) + "</span><b>" + jc[k] + "</b></li>"; }).join("") + '</ul><p style="margin-top:10px"><a href="#penulisan">' + T("Senarai penuh") + "</a></p></div>" +
      '<div><h2>' + T("Hubungi") + "</h2>" + (D.site.emel ? "<p>" + T("E-mel") + ': <span class="sel">' + esc(D.site.emel) + "</span></p>" : '<p class="meta">' + T("Butiran hubungan akan dikemas kini.") + "</p>") + "</div></div></section>";
  }

  function viewEditor(t) {
    if (!owner) return '<section class="section"><div class="wrap"><h1>Halaman ini untuk pemilik laman</h1><a href="#utama">Kembali ke utama</a></div></section>';
    var v = t || { tajuk: "", jenis: "Artikel", siri: D.siri[0] ? D.siri[0].id : "", tarikh: new Date().toISOString().slice(0, 10), status: "Terbit", pengarang: D.site.nama, penerbit: "", ringkasan: "", kandungan: "", kataKunci: [], pautan: "", pdf: "", kulit: "", infografik: "" };
    var opt = function (a, cur) { return a.map(function (x) { return "<option" + (x === cur ? " selected" : "") + ">" + esc(x) + "</option>"; }).join(""); };
    var siri = D.siri.map(function (s) { return '<option value="' + esc(s.id) + '"' + (s.id === v.siri ? " selected" : "") + ">" + esc(s.nama) + "</option>"; }).join("");
    return '<section class="page-head"><div class="wrap"><h1>' + (t ? "Sunting penulisan" : "Tulisan baharu") + "</h1></div></section>" +
      '<section class="section"><div class="wrap"><form class="ed" data-form="tulisan" data-id="' + esc(t ? t.id : "") + '">' +
      fld("e-tajuk", "Tajuk", '<input id="e-tajuk" required value="' + esc(v.tajuk) + '">') +
      '<div class="two">' + fld("e-jenis", "Jenis", '<select id="e-jenis">' + opt(JENIS, v.jenis) + "</select>") + fld("e-siri", "Siri", '<select id="e-siri">' + siri + "</select>") + "</div>" +
      '<div class="two">' + fld("e-status", "Status", '<select id="e-status">' + opt(STATUS, v.status) + "</select>") + fld("e-tarikh", "Tarikh", '<input id="e-tarikh" value="' + esc(v.tarikh) + '">', "Contoh: 2026-11-05 atau 2026") + "</div>" +
      fld("e-pengarang", "Pengarang", '<input id="e-pengarang" value="' + esc(v.pengarang) + '">') +
      fld("e-penerbit", "Terbitan atau persidangan", '<input id="e-penerbit" value="' + esc(v.penerbit) + '">') +
      fld("e-ringkasan", "Ringkasan", '<textarea id="e-ringkasan" rows="3">' + esc(v.ringkasan) + "</textarea>") +
      '<fieldset class="en-set"><legend>Versi English (pilihan)</legend><p class="meta">Dipaparkan apabila pembaca memilih EN. Jika kosong, versi Bahasa Melayu dipaparkan.</p>' +
      fld("e-tajuk-en", "Title (English)", '<input id="e-tajuk-en" value="' + esc(v.tajukEn || "") + '">') +
      fld("e-ringkasan-en", "Summary (English)", '<textarea id="e-ringkasan-en" rows="3">' + esc(v.ringkasanEn || "") + "</textarea>") +
      fld("e-kandungan-en", "Full text (English)", '<textarea id="e-kandungan-en" rows="10">' + esc(v.kandunganEn || "") + "</textarea>", "Format sama seperti teks penuh.") + "</fieldset>" +
      fld("e-kandungan", "Teks penuh", '<textarea id="e-kandungan" rows="14">' + esc(v.kandungan) + "</textarea>", "Pisahkan perenggan dengan baris kosong. ## untuk subtajuk, > untuk petikan, - untuk senarai, **tebal**, *condong*. Perenggan Arab dikesan automatik.") +
      '<fieldset class="en-set"><legend>Jualan</legend>' +
      '<div class="f"><label><input id="e-jualan" type="checkbox"' + (v.jualan ? " checked" : "") + '> Untuk jualan</label><small>Butang beli dipaparkan dan PDF tidak boleh dimuat turun secara percuma. Bacaan flip dihadkan kepada halaman pratonton.</small></div>' +
      '<div class="two">' + fld("e-harga", "Harga (RM)", '<input id="e-harga" inputmode="decimal" value="' + esc(v.harga || "") + '">', "Contoh: 25 atau 19.90") + fld("e-pratonton", "Halaman pratonton", '<input id="e-pratonton" type="number" min="1" value="' + esc(v.pratonton || 4) + '">', "Bilangan halaman awal yang boleh diselak") + "</div>" +
      fld("e-beli", "Pautan pembelian (toyyibPay)", '<input id="e-beli" type="url" placeholder="https://toyyibpay.com/..." value="' + esc(v.pautanBeli || "") + '">', "Biarkan kosong jika belum ada; pembaca akan lihat notis harga akan diumumkan.") + "</fieldset>" +
      fld("e-pautan", "Pautan luar", '<input id="e-pautan" type="url" placeholder="https://" value="' + esc(v.pautan) + '">', "Contoh: Google Drive, jurnal atau kedai e-buku") +
      (assets ? fld("e-pdf", "Fail PDF", '<input id="e-pdf" type="file" accept="application/pdf">', v.pdf ? "PDF sudah dilampirkan. Pilih fail baharu untuk menggantikannya." : "Maksimum 20 MB") + fld("e-kulit", "Gambar kulit", '<input id="e-kulit" type="file" accept="image/png,image/jpeg,image/webp">', v.kulit ? "Gambar sudah dilampirkan. Pilih fail baharu untuk menggantikannya." : "Pilihan, untuk e-buku dan risalah") + fld("e-info", "Infografik", '<input id="e-info" type="file" accept="image/png,image/jpeg,image/webp">', v.infografik ? "Infografik sudah dilampirkan. Pilih fail baharu untuk menggantikannya." : "Pilihan. Pembaca boleh memuat turunnya.") + fld("e-halaman", "Halaman untuk bacaan flip", '<input id="e-halaman" type="file" accept="image/png,image/jpeg,image/webp" multiple>', (v.halaman || []).length ? v.halaman.length + " halaman sudah dilampirkan. Pilih semua gambar halaman sekali lagi untuk menggantikannya." : "Pilihan. Pilih gambar setiap halaman sekali gus; susunan ikut nama fail.") : "") +
      '<div class="acts"><button class="save" type="submit" id="simpan">Simpan dan terbitkan</button><a href="' + (t ? "#baca-" + esc(t.id) : "#utama") + '">Batal</a></div></form></div></section>';
  }

  function viewProfileEditor() {
    if (!owner) return viewEditor();
    var s = D.site;
    return '<section class="page-head"><div class="wrap"><h1>Sunting profil</h1></div></section><section class="section"><div class="wrap"><form class="ed" data-form="profil">' +
      (assets ? fld("p-foto", "Gambar penulis", '<input id="p-foto" type="file" accept="image/png,image/jpeg,image/webp">', s.foto ? "Gambar sudah dilampirkan. Pilih fail baharu untuk menggantikannya." : "Pilihan") : "") +
      fld("p-gelaran", "Bidang penulisan (di bawah nama)", '<input id="p-gelaran" value="' + esc(s.gelaran) + '">') +
      fld("p-jawatan", "Jawatan", '<input id="p-jawatan" value="' + esc(s.jawatan) + '">') +
      fld("p-bio", "Biodata", '<textarea id="p-bio" rows="4">' + esc(s.bio) + "</textarea>") +
      '<fieldset class="en-set"><legend>Versi English (pilihan)</legend>' +
      fld("p-gelaran-en", "Tagline (English)", '<input id="p-gelaran-en" value="' + esc(s.gelaranEn || "") + '">') +
      fld("p-jawatan-en", "Position (English)", '<input id="p-jawatan-en" value="' + esc(s.jawatanEn || "") + '">') +
      fld("p-bio-en", "Bio (English)", '<textarea id="p-bio-en" rows="4">' + esc(s.bioEn || "") + "</textarea>") +
      fld("p-pendidikan-en", "Education (English)", '<textarea id="p-pendidikan-en" rows="3">' + esc((s.pendidikanEn || []).join("\n")) + "</textarea>", "Satu baris untuk setiap kelayakan") +
      fld("p-kerjaya-en", "Experience (English)", '<textarea id="p-kerjaya-en" rows="4">' + esc((s.kerjayaEn || []).join("\n")) + "</textarea>", "Satu baris untuk setiap jawatan") + "</fieldset>" +
      fld("p-pendidikan", "Pendidikan", '<textarea id="p-pendidikan" rows="3">' + esc(s.pendidikan.join("\n")) + "</textarea>", "Satu baris untuk setiap kelayakan") +
      fld("p-kerjaya", "Pengalaman", '<textarea id="p-kerjaya" rows="4">' + esc(s.kerjaya.join("\n")) + "</textarea>", "Satu baris untuk setiap jawatan") +
      fld("p-siri", "Siri penulisan", '<textarea id="p-siri" rows="9">' + esc(D.siri.map(function (x) { return x.nama + " | " + x.kata + (x.kataEn ? " | " + x.kataEn : ""); }).join("\n")) + "</textarea>", "Satu baris untuk setiap siri, dalam bentuk: Nama siri | Penerangan ringkas | English description (pilihan). Tulisan dalam siri yang dibuang masih kekal dalam senarai Penulisan.") +
      fld("p-url", "Pautan laman (untuk butang kongsi)", '<input id="p-url" type="url" value="' + esc(s.urlLaman || "") + '">', "Pautan awam laman ini, contohnya https://claude.ai/artifact/…") +
      fld("p-emel", "E-mel untuk dipaparkan", '<input id="p-emel" type="email" value="' + esc(s.emel) + '">', "Biarkan kosong jika tidak mahu dipaparkan") +
      '<div class="acts"><button class="save" type="submit" id="simpan">Simpan dan terbitkan</button><a href="#profil">Batal</a></div></form></div></section>';
  }
  function fld(id, label, control, hint) {
    return '<div class="f"><label for="' + id + '">' + label + "</label>" + control + (hint ? "<small>" + hint + "</small>" : "") + "</div>";
  }

  function route() { return (location.hash || "#utama").slice(1); }
  function render() {
    var r = route(), view, cur = "";
    if (/^siri-/.test(r)) siriFilter = r.slice(5);
    else if (r !== "penulisan") siriFilter = "";
    if (r === "penulisan") { cur = "penulisan"; view = viewList(T("Penulisan"), T("Artikel, kertas kajian, e-buku, risalah dan terjemahan.")); }
    else if (/^siri-/.test(r)) { var s = siriOf(siriFilter); cur = "penulisan"; view = viewList(s ? s.nama : T("Siri"), s ? F(s, "kata") : ""); }
    else if (r === "epenerbitan") { cur = r; view = '<section class="page-head"><div class="wrap"><h1>' + T("e-Penerbitan") + "</h1><p>" + T("E-buku, risalah dan kertas kajian.") + '</p></div></section><section class="section"><div class="wrap">' + pubBlock() + "</div></section>"; }
    else if (r === "arkib") { cur = r; view = viewArkib(); }
    else if (r === "profil") { cur = r; view = viewProfile(); }
    else if (r === "tulis") { view = viewEditor(); }
    else if (r === "sunting-profil") { view = viewProfileEditor(); }
    else if (/^sunting-/.test(r)) { view = viewEditor(find(r.slice(8))); }
    else if (/^baca-/.test(r)) { view = viewRead(find(r.slice(5))); }
    else { cur = "utama"; view = viewHome(); }
    app.innerHTML = shell(cur, view);
    flipInit(/^baca-/.test(r) ? find(r.slice(5)) : null);
    onScroll();
  }
  function onScroll() {
    var bar = document.getElementById("prog"), art = document.querySelector(".prose");
    if (!bar || !art) return;
    var r = art.getBoundingClientRect(), total = r.height - innerHeight * 0.6;
    var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : (r.top < innerHeight ? 1 : 0);
    bar.style.width = (p * 100).toFixed(1) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Saving: the page rebuilds itself from a template plus its data, then publishes. */
  function buildDoc() {
    var json = JSON.stringify(D).replace(/</g, "\\u003c");
    return "<!doctype html><html><head><meta charset=utf8>" +
      '<meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">' +
      "<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>" +
      "<title>Kunnasyah Ilmu</title>\n" +
      '<meta name="claude:viewport-fit-sides" content="cover">\n' +
      '<link rel="preconnect" href="https://fonts.gstatic.com">\n' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap">\n' +
      '<link rel="stylesheet" href="site.css">\n<div id="app"></div>\n' +
      '<script type="application/json" id="site-data">' + json + "<\/script>\n" +
      '<script src="site.js"><\/script>\n</body></html>';
  }
  function toast(msg) {
    var el = document.createElement("div");
    el.className = "toast"; el.setAttribute("role", "status"); el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 5000);
  }
  async function publish(afterHash) {
    if (!artifact || saving) return;
    saving = true;
    var btn = document.getElementById("simpan");
    if (btn) { btn.disabled = true; btn.textContent = "Menyimpan…"; }
    try { if (afterHash) history.replaceState(null, "", afterHash); } catch (e) { location.hash = afterHash; }
    try {
      await artifact.publish(buildDoc());
    } catch (e) {
      saving = false;
      if (btn) { btn.disabled = false; btn.textContent = "Simpan dan terbitkan"; }
      var c = e && e.code;
      if (c === "conflict") toast("Ada versi lebih baharu. Laman dimuat semula; sila buat perubahan sekali lagi.");
      else if (c === "not_writer" || c === "not_granted") toast("Akaun ini tidak boleh menyunting laman.");
      else if (c === "too_large") toast("Laman terlalu besar. Pindahkan teks panjang ke fail PDF.");
      else if (c === "rate_limited") toast("Terlalu banyak simpanan. Tunggu sebentar dan cuba lagi.");
      else toast("Simpanan gagal. Cuba sekali lagi sebentar nanti.");
    }
  }
  function slug(t) {
    var base = t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "tulisan";
    var id = base, n = 2;
    while (find(id)) id = base + "-" + n++;
    return id;
  }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function lines(id) { return val(id).split("\n").map(function (x) { return x.trim(); }).filter(Boolean); }

  async function saveTulisan(form) {
    var id = form.getAttribute("data-id"), t = id ? find(id) : null;
    var rec = { id: id || slug(val("e-tajuk")), tajuk: val("e-tajuk"), jenis: val("e-jenis"), siri: val("e-siri"), tarikh: val("e-tarikh"), status: val("e-status"), pengarang: val("e-pengarang"), penerbit: val("e-penerbit"), ringkasan: val("e-ringkasan"), kandungan: document.getElementById("e-kandungan").value.trim(), pautan: val("e-pautan"), jualan: !!(document.getElementById("e-jualan") || {}).checked, harga: val("e-harga").replace(/^RM\s*/i, ""), pautanBeli: val("e-beli"), pratonton: +val("e-pratonton") || 4, tajukEn: val("e-tajuk-en"), ringkasanEn: val("e-ringkasan-en"), kandunganEn: document.getElementById("e-kandungan-en").value.trim(), pdf: t ? t.pdf : "", kulit: t ? (t.kulit || "") : "", infografik: t ? (t.infografik || "") : "", halaman: t ? (t.halaman || []) : [] };
    var file = document.getElementById("e-pdf");
    if (file && file.files[0]) {
      try {
        var up = await assets.upload(file.files[0], { type: "application/pdf" });
        rec.pdf = up.id;
      } catch (e) {
        toast(e && e.code === "too_large" ? "PDF melebihi 20 MB. Gunakan pautan luar." : "PDF gagal dimuat naik. Tulisan belum disimpan.");
        return;
      }
    }
    var cover = document.getElementById("e-kulit");
    if (cover && cover.files[0]) {
      try { rec.kulit = (await assets.upload(cover.files[0])).id; }
      catch (e) { toast("Gambar gagal dimuat naik. Tulisan belum disimpan."); return; }
    }
    var info = document.getElementById("e-info");
    if (info && info.files[0]) {
      try { rec.infografik = (await assets.upload(info.files[0])).id; }
      catch (e) { toast("Infografik gagal dimuat naik. Tulisan belum disimpan."); return; }
    }
    var hal = document.getElementById("e-halaman");
    if (hal && hal.files.length) {
      var fs = Array.prototype.slice.call(hal.files).sort(function (a, b) { return a.name.localeCompare(b.name, undefined, { numeric: true }); });
      try { var ids = []; for (var k = 0; k < fs.length; k++) ids.push((await assets.upload(fs[k])).id); rec.halaman = ids; }
      catch (e) { toast("Halaman flip gagal dimuat naik. Tulisan belum disimpan."); return; }
    }
    if (t) D.tulisan[D.tulisan.indexOf(t)] = rec; else D.tulisan.push(rec);
    publish("#baca-" + rec.id);
  }

  /* Events */
  function refreshList() {
    var box = document.getElementById("senarai");
    if (!box) return;
    var list = filtered();
    box.innerHTML = rows(list);
    document.getElementById("kiraan").textContent = list.length + " " + T("daripada") + " " + D.tulisan.length + " " + T("penulisan");
  }
  app.addEventListener("input", function (e) {
    if (e.target.id === "cari") { query = e.target.value; refreshList(); }
  });
  app.addEventListener("change", function (e) {
  });
  app.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, kind = f.getAttribute("data-form");
    if (kind === "search") {
      query = val("cari-atas"); jenisFilter = ""; siriFilter = ""; yearFilter = "";
      if (route() === "penulisan") { render(); } else { location.hash = "penulisan"; }
    } else if (kind === "tulisan") { saveTulisan(f); }
    else if (kind === "profil") {
      var s = D.site;
      s.gelaran = val("p-gelaran"); s.jawatan = val("p-jawatan"); s.bio = val("p-bio");
      s.pendidikan = lines("p-pendidikan"); s.kerjaya = lines("p-kerjaya"); s.emel = val("p-emel"); s.urlLaman = val("p-url");
      s.gelaranEn = val("p-gelaran-en"); s.jawatanEn = val("p-jawatan-en"); s.bioEn = val("p-bio-en"); s.pendidikanEn = lines("p-pendidikan-en"); s.kerjayaEn = lines("p-kerjaya-en");
      var old = D.siri, used = {};
      var parsed = lines("p-siri").map(function (l) {
        var parts = l.split("|").map(function (x) { return x.trim(); });
        return { nama: parts[0], kata: parts[1] || "", kataEn: parts.slice(2).join(" | ") };
      }).filter(function (x) { return x.nama; });
      parsed.forEach(function (x) {
        var hit = old.filter(function (o) { return o.nama === x.nama && !used[o.id]; })[0];
        if (hit) { x.id = hit.id; used[hit.id] = 1; }
      });
      parsed.forEach(function (x, n) {
        if (x.id) return;
        if (old[n] && !used[old[n].id]) { x.id = old[n].id; used[x.id] = 1; return; }
        var base = x.nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32) || "siri", id = base, k = 2;
        while (used[id] || old.some(function (o) { return o.id === id; })) id = base + "-" + k++;
        x.id = id; used[id] = 1;
      });
      D.siri = parsed;
      var foto = document.getElementById("p-foto");
      if (foto && foto.files[0]) {
        assets.upload(foto.files[0]).then(function (u) { s.foto = u.id; publish("#profil"); }, function () { toast("Gambar gagal dimuat naik. Profil belum disimpan."); });
      } else { publish("#profil"); }
    }
  });
  app.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var act = b.getAttribute("data-act"), v = b.getAttribute("data-v");
    if (act === "lang") { if (v !== LANG) { setLang(v); render(); } }
    else if (act === "pubtab") { pubTab = v; render(); }
    else if (act === "facet") {
      var k = b.getAttribute("data-k");
      if (k === "jenis") jenisFilter = v; else if (k === "tahun") yearFilter = v;
      else { siriFilter = v; if (/^siri-/.test(route())) { location.hash = "penulisan"; return; } }
      render();
    }
    else if (act === "dl") {
      (async function () {
        var dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null;
        if (!dl) { if (b.getAttribute("data-fail") || D.blobs) { var a = document.createElement("a"); a.href = B(v); a.download = b.getAttribute("data-f") || ""; a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); return; } toast(T("Muat turun tidak tersedia di paparan ini. Gunakan Buka saiz penuh, kemudian simpan gambar.")); return; }
        try {
          var blob = await (await fetch(B(v))).blob();
          await dl.save({ filename: b.getAttribute("data-f"), data: blob });
        } catch (e) {
          var c = e && e.code;
          if (c === "declined") return;
          toast(c === "rate_limited" ? T("Tunggu sebentar dan cuba lagi.") : (b.getAttribute("data-fail") || T("Muat turun gagal. Gunakan Buka saiz penuh, kemudian simpan gambar.")));
        }
      })();
    }
    else if (act === "share-copy" || act === "share-ig") {
      var isIg = act === "share-ig";
      var showLink = function () { toast(v); };
      var copyIt = function () { copyText(v).then(function () { toast(isIg ? T("Pautan disalin. Tampal dalam Instagram (Story, bio atau mesej).") : T("Pautan disalin")); }, showLink); };
      if (isIg && navigator.share && matchMedia("(pointer: coarse)").matches) {
        navigator.share({ title: b.getAttribute("data-t"), url: v }).catch(function (e) { if (!e || e.name !== "AbortError") copyIt(); });
      } else copyIt();
    }
    else if (act === "fprev") flipGo(-1);
    else if (act === "fnext") flipGo(1);
    else if (act === "ffull") flipFull();
    else if (act === "jump") { var h = document.getElementById(v); if (h) h.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
    else if (act === "copy") {
      var text = document.getElementById("petikan").textContent;
      var done = function () { b.textContent = "Disalin"; };
      var fail = function () {
        var r = document.createRange(); r.selectNodeContents(document.getElementById("petikan"));
        var s = getSelection(); s.removeAllRanges(); s.addRange(r);
        b.textContent = "Teks dipilih, tekan salin";
      };
      try { navigator.clipboard.writeText(text).then(done, fail); } catch (err) { fail(); }
    } else if (act === "del") {
      if (delArmed !== v) { delArmed = v; render(); return; }
      D.tulisan = D.tulisan.filter(function (t) { return t.id !== v; });
      delArmed = "";
      publish("#penulisan");
    }
  });
  window.addEventListener("hashchange", function () { delArmed = ""; render(); window.scrollTo(0, 0); });

  render();
  counterInit();

  (async function () {
    try {
      if (!window.claude || !window.claude.use) return;
      var user = await window.claude.use("user");
      owner = user ? await user.canEdit() : false;
      if (!owner) return;
      artifact = await window.claude.use("artifact");
      assets = await window.claude.use("assets");
      if (!artifact) { owner = false; return; }
      render();
    } catch (e) { owner = false; }
  })();
})();
