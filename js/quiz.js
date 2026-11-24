/* 旅行人格測驗：五題二選一 → 計分 → 三種結果（存到我的旅程） */
(function () {
  const $ = s => document.querySelector(s), Q = WZ.QUIZ, IMG = WZ.IMG;
  const ans = Array(Q.length).fill(null);
  let i = 0;

  const show = id => { document.querySelectorAll('.qv').forEach(v => v.classList.toggle('on', v.id === id)); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  function renderQ() {
    const q = Q[i];
    $('#qNo').textContent = `${String(i + 1).padStart(2, '0')} / 0${Q.length}`;
    $('#steps').innerHTML = Q.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}">0${k + 1}${k === i ? '・這一站' : ''}</span>`).join('');
    $('#qTag').textContent = q.tag;
    $('#qTitle').textContent = q.q;
    $('#choices').setAttribute('aria-label', q.q);
    $('#choices').innerHTML = ['a', 'b'].map(k => `<button class="choice" type="button" role="radio" aria-checked="${ans[i] === k}" data-v="${k}">
      <b class="ab">${k.toUpperCase()}</b><img src="${IMG('q' + (i + 1) + k)}" alt=""><span class="ct">${q[k].t}</span><span class="cd">${q[k].d}</span><small class="note">憑直覺選，沒有標準答案</small></button>`).join('');
    const left = Q.length - 1 - i;
    $('#left').textContent = left ? `再玩 ${left} 題，找到你的玩竹人格。` : '最後一題，準備揭曉！';
    $('#next').textContent = left ? '下一題 →' : '看看我的玩竹人格';
    $('#next').disabled = !ans[i];
    $('#prev').textContent = i ? '← 上一步' : '← 回到開始';
    $('#qHint').textContent = ans[i] ? '✓ 已選取一張旅行提案・可改選另一張' : '○ 點選一張圖片卡，留下你的旅行直覺　・　鍵盤可按 A／B 選擇';
  }

  function pick(v) {
    ans[i] = v;
    document.querySelectorAll('#choices .choice').forEach(c => c.setAttribute('aria-checked', c.dataset.v === v));
    $('#next').disabled = false;
    $('#qHint').textContent = '✓ 已選取一張旅行提案・可改選另一張';
  }

  function result() {
    const sc = { healing: 0, foodie: 0, adventure: 0 };
    ans.forEach((a, k) => Object.entries(Q[k][a].s).forEach(([t, n]) => sc[t] += n));
    const key = Object.keys(sc).sort((a, b) => sc[b] - sc[a])[0];
    const T = WZ.TYPES[key];
    WZ.state.result = { key, sc, at: Date.now() }; WZ.save();

    $('#rName').textContent = T.name; $('#rLine').textContent = T.line; $('#rDesc').textContent = T.desc;
    $('#rTags').innerHTML = T.tags.map((t, k) => `<span class="pill ${['soft-b', 'soft-g', 'soft-y'][k]}">${t}</span>`).join('');
    $('#rImg').src = IMG(T.img); $('#rImg2').src = IMG(T.img2); $('#rCap').textContent = `◎ ${T.name}的理想日常`;
    const max = Math.max(...Object.values(sc));
    $('#score').innerHTML = Object.entries(sc).map(([k, n]) => `<div><span>${WZ.TYPES[k].name}</span><i><b style="width:0" data-w="${n / max * 100}"></b></i><span>${n}</span></div>`).join('');
    requestAnimationFrame(() => setTimeout(() => document.querySelectorAll('#score b').forEach(b => b.style.width = b.dataset.w + '%'), 60));
    $('#recs').innerHTML = T.recs.map((id, k) => { const s = WZ.spot(id); return `<div class="rec">${WZ.favBtn(id).replace('class="fav"', 'class="fav" style="top:14px;right:0;width:36px;height:36px"')}
      <small><b>0${k + 1} ／ 推薦給你</b></small><h3>${s.name}</h3><p class="note" style="font-size:15px">${s.desc}</p><button class="open" type="button" data-open-spot="${id}">看介紹 →</button></div>`; }).join('');
    $('#goTrip').href = 'trips.html#' + ({ healing: 'nature', foodie: 'culture', adventure: 'slow' })[key];
    show('vRes'); $('#resTop').focus({ preventScroll: true });
  }

  $('#go').addEventListener('click', () => { i = 0; renderQ(); show('vQ'); $('#qTitle').focus({ preventScroll: true }); });
  $('#choices').addEventListener('click', e => { const c = e.target.closest('.choice'); if (c) pick(c.dataset.v); });
  $('#next').addEventListener('click', () => { if (!ans[i]) return; if (i < Q.length - 1) { i++; renderQ(); $('#qTitle').focus({ preventScroll: true }); } else result(); });
  $('#prev').addEventListener('click', () => { if (i) { i--; renderQ(); } else show('vStart'); });
  $('#again').addEventListener('click', () => { ans.fill(null); i = 0; renderQ(); show('vQ'); });
  $('#share').addEventListener('click', async () => {
    const T = WZ.TYPES[WZ.state.result.key], text = `我的玩竹人格是「${T.name}」：${T.line} 你也來玩一下！`;
    const url = location.href.split('?')[0] + '?ans=' + ans.join('');
    try { if (navigator.share) { await navigator.share({ title: '玩竹一下', text, url }); return; }
      await navigator.clipboard.writeText(text + ' ' + url); WZ.toast('已複製分享連結！'); }
    catch (e) { WZ.toast('分享取消'); }
  });
  document.addEventListener('keydown', e => {
    if (!$('#vQ').classList.contains('on') || e.target.matches('input,textarea')) return;
    const k = e.key.toLowerCase();
    if (k === 'a' || k === 'b') pick(k);
    if (k === 'enter' && ans[i] && document.activeElement.tagName !== 'BUTTON') $('#next').click();
  });

  /* 從首頁第一題帶過來：?q1=a；分享連結直接看結果：?ans=abbab */
  const P = new URLSearchParams(location.search), q1 = P.get('q1'), all = P.get('ans');
  if (all && /^[ab]{5}$/.test(all)) { all.split('').forEach((v, k) => ans[k] = v); result(); }
  else if (q1 === 'a' || q1 === 'b') { ans[0] = q1; i = 1; renderQ(); show('vQ'); WZ.toast('已帶入首頁的第 1 題答案'); }
})();
