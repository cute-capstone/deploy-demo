/* 玩竹一下｜共用功能：頁首頁尾、收藏、搜尋、景點詳細視窗、捲動進場 */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const IMG = n => `img/${n}.jpg`;
  WZ.IMG = IMG;

  const ICON = {
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m16 8-2.5 6L8 16l2.5-6z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/></svg>'
  };
  WZ.ICON = ICON;

  /* ---------- 收藏、測驗結果、行程：存在瀏覽器 localStorage ---------- */
  const KEY = 'wanzhu-v1';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const state = Object.assign({ favs: [], result: null, trips: [], done: [] }, load());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} updateBadge(); };
  WZ.state = state; WZ.save = save;
  WZ.isFav = id => state.favs.includes(id);
  WZ.toggleFav = id => {
    const on = !WZ.isFav(id);
    state.favs = on ? [...state.favs, id] : state.favs.filter(x => x !== id);
    save();
    toast(on ? `已收藏「${WZ.spot(id).name}」，解鎖一張貼紙！` : '已從收藏移除');
    document.querySelectorAll(`.fav[data-id="${id}"]`).forEach(b => b.setAttribute('aria-pressed', on));
    document.dispatchEvent(new CustomEvent('wz:fav'));
    return on;
  };
  WZ.favBtn = id => `<button class="fav" type="button" data-id="${id}" aria-pressed="${WZ.isFav(id)}" aria-label="收藏 ${WZ.spot(id).name}">${ICON.heart}</button>`;

  /* ---------- 頁首／頁尾 ---------- */
  const page = document.body.dataset.page || '';
  const NAV = [['explore', 'explore.html', '景點探索'], ['food', 'explore.html?cat=food', '在地美食'], ['quiz', 'quiz.html', '旅遊測驗'], ['trips', 'trips.html', '主題行程'], ['mytrip', 'mytrip.html', '我的旅程']];
  const hd = document.createElement('header');
  hd.className = 'hd';
  hd.innerHTML = `<div class="wrap">
    <a class="logo" href="index.html">${ICON.compass}玩竹一下</a>
    <nav class="nav" id="nav" aria-label="主選單">${NAV.map(([k, h, t]) => `<a href="${h}" class="${k === page ? 'on' : ''}">${t}</a>`).join('')}</nav>
    <div class="hd-tools">
      <button class="icon-btn" type="button" data-open-search>${ICON.search}<span class="hide-sm">搜尋新竹</span></button>
      <a class="icon-btn" href="mytrip.html" aria-label="我的收藏">${ICON.heart.replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="2"')}<span class="badge" id="favBadge"></span></a>
      <button class="icon-btn burger" type="button" aria-label="開啟選單" aria-expanded="false" aria-controls="nav">${ICON.menu}</button>
    </div></div>`;
  document.body.prepend(hd);
  const burger = $('.burger', hd), nav = $('#nav', hd);
  burger.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });

  const ft = document.createElement('footer');
  ft.className = 'ft';
  ft.innerHTML = `<div class="wrap">
    <div class="ft-top">
      <div><p class="ft-logo">${ICON.compass}玩竹一下</p><p>玩竹一下，發現新竹不一樣的玩法。</p></div>
      <div><p class="tag">把好奇心帶上</p><nav aria-label="頁尾選單"><a href="explore.html">景點探索</a><a href="explore.html?cat=food">美食推薦</a><a href="quiz.html">旅遊測驗</a><a href="trips.html">主題行程</a></nav></div>
    </div>
    <div class="ft-bottom"><span>© 玩竹一下｜新竹旅遊探索・第 01 組期中提案「玩竹一下」以 Claude 實作的教學示範（內容與資訊僅供示意）</span><a href="../../web20.html">← 回到講義：精稿變成真網站</a></div>
  </div>`;
  document.body.append(ft);

  function updateBadge() { const b = $('#favBadge'); if (b) { b.textContent = state.favs.length; b.dataset.n = state.favs.length; } }
  updateBadge();

  /* ---------- toast ---------- */
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t);
  let tm; function toast(msg) { t.textContent = msg; t.classList.add('show'); clearTimeout(tm); tm = setTimeout(() => t.classList.remove('show'), 2200); }
  WZ.toast = toast;

  /* ---------- 共用視窗 ---------- */
  const modal = document.createElement('div');
  modal.className = 'modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = '<div class="modal-box"><button class="modal-close" type="button" aria-label="關閉">×</button><div class="modal-body"></div></div>';
  document.body.append(modal);
  let lastFocus;
  function openModal(html) { lastFocus = document.activeElement; $('.modal-body', modal).innerHTML = html; modal.classList.add('open'); document.body.style.overflow = 'hidden'; $('.modal-close', modal).focus(); }
  function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal-close')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  WZ.openModal = openModal; WZ.closeModal = closeModal;

  /* 景點詳細頁（視窗） */
  WZ.openSpot = id => {
    const s = WZ.spot(id); if (!s) return;
    const near = WZ.SPOTS.filter(x => x.id !== id && x.cats.some(c => s.cats.includes(c))).slice(0, 3);
    openModal(`<div class="detail">
      <div class="detail-ph"><img src="${IMG(s.img)}" alt="${s.name}"></div>
      <div class="detail-txt">
        <p class="meta">${ICON.pin} ${s.area}</p>
        <h2 class="h2" style="font-size:32px">${s.name}</h2>
        <div class="detail-tags">${s.cats.map(c => `<span class="pill ${WZ.cat(c).color}">${WZ.cat(c).name}</span>`).join('')}${s.tags.map(x => `<span class="pill">${x}</span>`).join('')}</div>
        <p>${s.desc}</p>
        <p class="detail-tip"><b>玩竹小提醒</b>${s.tip}</p>
        <p class="note">營業時間、交通與票價請以官方公告為準。</p>
        <div class="detail-act">
          <button class="btn primary sm" type="button" data-fav-detail="${id}">${WZ.isFav(id) ? '已收藏 ✓' : '♡ 加入收藏'}</button>
          <a class="btn sm" href="https://www.google.com/maps/search/${encodeURIComponent(s.name + ' 新竹')}" target="_blank" rel="noopener">在地圖上打開 ↗</a>
        </div>
        ${near.length ? `<p class="detail-near-t">順路還可以去</p><div class="detail-near">${near.map(n => `<button type="button" data-open-spot="${n.id}"><img src="${IMG(n.img)}" alt="">${n.name}</button>`).join('')}</div>` : ''}
      </div></div>`);
  };

  /* ---------- 搜尋 ---------- */
  function openSearch() {
    openModal(`<div class="search-box"><label for="q" class="h2" style="font-size:24px;display:block;margin-bottom:12px">搜尋新竹</label>
      <input id="q" type="search" placeholder="輸入景點、美食或關鍵字，例如：海、老街、米粉" autocomplete="off">
      <ul class="search-res" id="qres"></ul></div>`);
    const q = $('#q'), res = $('#qres');
    const run = () => {
      const k = q.value.trim();
      const list = k ? WZ.SPOTS.filter(s => (s.name + s.area + s.desc + s.tags.join('') + s.cats.map(c => WZ.cat(c).name).join('')).includes(k)) : WZ.SPOTS.slice(0, 5);
      res.innerHTML = list.length ? list.map(s => `<li><a href="#" data-open-spot="${s.id}"><img src="${IMG(s.img)}" alt=""><span><b>${s.name}</b><br><small class="note">${s.area}</small></span></a></li>`).join('') : '<li class="note">找不到符合的地點，換個關鍵字試試？</li>';
    };
    q.addEventListener('input', run); q.focus(); run();
  }

  document.addEventListener('click', e => {
    const f = e.target.closest('.fav'); if (f) { e.preventDefault(); WZ.toggleFav(f.dataset.id); return; }
    const fd = e.target.closest('[data-fav-detail]'); if (fd) { const on = WZ.toggleFav(fd.dataset.favDetail); fd.textContent = on ? '已收藏 ✓' : '♡ 加入收藏'; return; }
    const o = e.target.closest('[data-open-spot]'); if (o) { e.preventDefault(); WZ.openSpot(o.dataset.openSpot); return; }
    if (e.target.closest('[data-open-search]')) openSearch();
  });

  /* ---------- 捲動進場 ---------- */
  WZ.reveal = () => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
    els.forEach(el => io.observe(el));
  };
  document.addEventListener('DOMContentLoaded', WZ.reveal);
})();
