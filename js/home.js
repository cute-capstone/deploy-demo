/* 首頁：人格預覽、分類篩選、精選景點、美食、行程、首頁第一題 */
(function () {
  const IMG = WZ.IMG, A = WZ.ICON.arrow;
  const $ = s => document.querySelector(s);

  /* 人格卡 */
  $('#typeGrid').innerHTML = Object.entries(WZ.TYPES).map(([k, t]) => `
    <article class="card reveal"><a class="cover" href="quiz.html" aria-label="測測看我是不是${t.name}"></a>
      <div class="ph"><img src="${IMG(t.img)}" alt="${t.name}插畫" loading="lazy"></div>
      <h3>${t.name}${A}</h3><span class="pill ${t.color}" style="align-self:flex-start">玩竹人格・預覽</span><p>${t.short}</p></article>`).join('');

  /* 分類：點晶片＝高亮該分類卡片；點卡片＝前往探索頁並套用篩選 */
  const chips = $('#catChips'), grid = $('#catGrid');
  chips.innerHTML = WZ.CATS.map(c => `<button class="chip" type="button" role="tab" aria-selected="false" data-cat="${c.id}">${c.name}</button>`).join('');
  grid.innerHTML = WZ.CATS.map((c, i) => `
    <article class="card reveal cat-card" data-cat="${c.id}" style="--ar:${i === 0 ? '4/4.2' : '16/9'}"><a class="cover" href="explore.html?cat=${c.id}" aria-label="探索${c.name}"></a>
      <div class="ph"><img src="${IMG(c.img)}" alt="" loading="lazy"></div>
      <h3>${c.name}${A}</h3><span class="pill ${c.color}" style="align-self:flex-start">${c.sub}</span><p>${c.desc}</p></article>`).join('');
  chips.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    const on = b.getAttribute('aria-selected') !== 'true';
    chips.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-selected', 'false'));
    b.setAttribute('aria-selected', on);
    grid.querySelectorAll('.cat-card').forEach(card => card.classList.toggle('dim', on && card.dataset.cat !== b.dataset.cat));
  });

  /* 精選景點 */
  const spotCard = s => `
    <article class="card reveal spot-card"><a class="cover" href="#" data-open-spot="${s.id}" aria-label="看${s.name}介紹"></a>${WZ.favBtn(s.id)}
      <div class="ph"><img src="${IMG(s.img)}" alt="${s.name}" loading="lazy"></div>
      <p class="meta">${WZ.ICON.pin}${s.area}</p><h3 style="font-size:18px">${s.name}</h3><p>${s.desc}</p><b class="more">探索推薦 →</b></article>`;
  $('#spotGrid').innerHTML = ['zoo', 'nanliao', 'beipu', '18peaks'].map(id => spotCard(WZ.spot(id))).join('');

  /* 美食 */
  const foods = ['ricenoodle', 'gongwan', 'temple', 'coffee'].map(WZ.spot);
  const foodCard = (s, ar) => `<article class="card reveal" style="--ar:${ar}"><a class="cover" href="#" data-open-spot="${s.id}" aria-label="看${s.name}介紹"></a>${WZ.favBtn(s.id)}
      <div class="ph"><img src="${IMG(s.img)}" alt="${s.name}" loading="lazy"></div>
      <h3>${s.name}${A}</h3><span class="pill r" style="align-self:flex-start">${s.tags[0]}</span><p>${s.desc}</p></article>`;
  $('#foodGrid').innerHTML = `<div class="fcol">${foodCard(foods[0], '9/8')}</div>
    <div class="fcol">${foodCard(foods[1], '3/2')}<p class="food-aside">肚子留點空位，<br>驚喜在下一口。 ↘</p></div>
    <div class="fcol">${foodCard(foods[2], '3/1.1')}${foodCard(foods[3], '3/1.1')}</div>`;

  /* 行程 */
  $('#tripGrid').innerHTML = WZ.TRIPS.map((t, i) => `<div class="reveal">
    <article class="card" style="--ar:${['16/10', '5/4', '9/8'][i]}"><a class="cover" href="trips.html#${t.id}" aria-label="看${t.name}完整路線"></a>
      <div class="ph"><img src="${IMG(t.img)}" alt="${t.name}" loading="lazy"></div>
      <h3>${t.name}${A}</h3><span class="pill ${t.color}" style="align-self:flex-start">${t.kind}｜${t.fit}</span><p>${t.desc}</p></article>
    <a class="btn sm" style="margin-top:16px" href="trips.html#${t.id}">看看完整路線 → ↗</a></div>`).join('');

  /* 首頁第一題：選了就帶到測驗頁接著玩 */
  const row = document.querySelector('.choice-row'), go = $('#teaserGo');
  row.addEventListener('click', e => {
    const c = e.target.closest('.choice'); if (!c) return;
    row.querySelectorAll('.choice').forEach(x => x.setAttribute('aria-checked', x === c));
    go.innerHTML = `已選「${c.querySelector('.ct').textContent}」！<a class="btn primary sm" href="quiz.html?q1=${c.dataset.v}">接著玩第 2 題 →</a>`;
  });

  WZ.reveal();
})();
