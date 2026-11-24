/* 景點探索：分類篩選＋關鍵字搜尋＋列表／地圖切換（篩選條件同步到網址） */
(function () {
  const $ = s => document.querySelector(s), IMG = WZ.IMG;
  const params = new URLSearchParams(location.search);
  const st = { cat: params.get('cat') || 'all', kw: params.get('q') || '', view: params.get('view') || 'list', sel: null };
  if (st.cat === 'food') document.body.dataset.page = 'food';
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', st.cat === 'food' ? a.textContent === '在地美食' : a.textContent === '景點探索'));

  const chips = $('#chips');
  chips.innerHTML = [{ id: 'all', name: '全部' }, ...WZ.CATS].map(c => `<button class="chip ghost" type="button" data-cat="${c.id}" aria-pressed="false">${c.name}</button>`).join('');
  $('#kw').value = st.kw;

  const list = () => WZ.SPOTS.filter(s => (st.cat === 'all' || s.cats.includes(st.cat)) &&
    (!st.kw || (s.name + s.area + s.desc + s.tags.join('')).toLowerCase().includes(st.kw.toLowerCase())));

  function syncUrl() {
    const p = new URLSearchParams();
    if (st.cat !== 'all') p.set('cat', st.cat);
    if (st.kw) p.set('q', st.kw);
    if (st.view !== 'list') p.set('view', st.view);
    history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
  }

  function render() {
    const items = list();
    chips.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.cat === st.cat));
    const c = WZ.cat(st.cat);
    $('#pageTitle').textContent = c ? `${c.name}：${c.desc.replace('。', '')}` : '今天想去哪裡晃晃？';
    $('#count').textContent = `找到 ${items.length} 個地點${st.kw ? `（關鍵字「${st.kw}」）` : ''}`;
    document.querySelectorAll('.seg button').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === st.view));
    $('#listView').hidden = st.view !== 'list';
    $('#mapView').hidden = st.view !== 'map';

    $('#listView').innerHTML = items.length ? items.map(s => `
      <article class="card reveal"><a class="cover" href="#" data-open-spot="${s.id}" aria-label="看${s.name}介紹"></a>${WZ.favBtn(s.id)}
        <div class="ph"><img src="${IMG(s.img)}" alt="${s.name}" loading="lazy"></div>
        <p class="meta">${WZ.ICON.pin}${s.area}</p><h3>${s.name}${WZ.ICON.arrow}</h3>
        <div style="display:flex;gap:6px;flex-wrap:wrap">${s.cats.map(k => `<span class="pill ${WZ.cat(k).color}">${WZ.cat(k).name}</span>`).join('')}</div>
        <p>${s.desc}</p></article>`).join('')
      : `<div class="empty"><p><b>這個組合還沒有地點。</b></p><button class="btn sm" type="button" id="reset">清除篩選</button></div>`;

    const ids = items.map(s => s.id);
    $('#pins').innerHTML = WZ.SPOTS.map(s => `<button type="button" class="pin ${s.cats[0]} ${ids.includes(s.id) ? '' : 'off'} ${st.sel === s.id ? 'on' : ''}" style="left:${s.x}%;top:${s.y}%" data-pin="${s.id}" aria-label="${s.name}"><i></i><span>${s.name}</span></button>`).join('');
    $('#mapList').innerHTML = items.map(s => `<button type="button" class="map-item ${st.sel === s.id ? 'on' : ''}" data-pin="${s.id}"><img src="${IMG(s.img)}" alt=""><span><b>${s.name}</b><br><small class="note">${s.area}</small></span></button>`).join('');
    WZ.reveal();
  }

  chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; st.cat = b.dataset.cat; syncUrl(); render(); });
  let t; $('#kw').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { st.kw = e.target.value.trim(); syncUrl(); render(); }, 200); });
  document.querySelector('.seg').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.view = b.dataset.view; syncUrl(); render(); });
  document.addEventListener('click', e => {
    if (e.target.id === 'reset') { st.cat = 'all'; st.kw = ''; $('#kw').value = ''; syncUrl(); render(); return; }
    const p = e.target.closest('[data-pin]'); if (!p) return;
    if (st.sel === p.dataset.pin) { WZ.openSpot(p.dataset.pin); return; }   // 第二次點＝打開介紹
    st.sel = p.dataset.pin; render();
    const li = document.querySelector(`.map-item[data-pin="${st.sel}"]`); if (li) li.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    if (p.classList.contains('map-item')) WZ.openSpot(st.sel);
  });
  render();
})();
