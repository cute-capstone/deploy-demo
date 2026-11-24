/* 玩竹一下｜示範資料（內容依第 01 組精稿文字；營業資訊請以官方公告為準） */
window.WZ = window.WZ || {};
WZ.CATS = [
  { id: 'forest',  name: '山林自然', sub: '01／給自己一點綠', color: 'g', img: 'cat-forest',   desc: '沿著步道走進山林，把城市的步調暫時留在身後。' },
  { id: 'coast',   name: '海線風景', sub: '02／追一場海風',   color: 'b', img: 'cat-coast',    desc: '看海、散步，收藏一段自在的海岸時光。' },
  { id: 'culture', name: '老街文化', sub: '03／轉進地方故事', color: 'r', img: 'cat-oldstreet', desc: '放慢腳步，讀讀老街留下的生活痕跡。' },
  { id: 'food',    name: '在地美食', sub: '04／吃一口新竹',   color: 'y', img: 'cat-food',     desc: '從米粉到糕點，用味蕾認識在地日常。' },
  { id: 'family',  name: '親子同遊', sub: '05／一起玩一下',   color: 'g', img: 'cat-family',   desc: '和小小旅伴，把好奇心帶出門。' }
];

/* x / y：在示意地圖上的百分比位置（不是真實座標） */
WZ.SPOTS = [
  { id: 'zoo', name: '新竹動物園', area: '新竹市・東區', cats: ['family'], img: 'spot-zoo', x: 55, y: 50,
    desc: '在綠意裡觀察動物日常，和旅伴一起找回單純的好奇心。', tags: ['親子', '城市', '散步'], tip: '適合上午入園，接著到公園散步。' },
  { id: 'nanliao', name: '南寮漁港', area: '新竹市・北區', cats: ['coast'], img: 'spot-nanliao', x: 30, y: 38,
    desc: '沿著港邊散步，讓海風替今天換個節奏。', tags: ['海線', '夕陽', '拍照'], tip: '傍晚來看夕陽，風大記得帶外套。' },
  { id: 'coastline', name: '17 公里海岸線', area: '新竹市・香山區', cats: ['coast', 'family'], img: 'cat-coast', x: 27, y: 62,
    desc: '沿著海岸騎車或散步，一路收集海景與風聲。', tags: ['海線', '自行車', '戶外'], tip: '路線長，可分段騎乘。' },
  { id: 'beipu', name: '北埔老街', area: '新竹縣・北埔鄉', cats: ['culture', 'food'], img: 'spot-beipu', x: 78, y: 74,
    desc: '穿梭街巷與老屋，感受客家聚落的生活風景。', tags: ['老街', '客家', '小吃'], tip: '假日人多，早點到比較好逛。' },
  { id: '18peaks', name: '十八尖山', area: '新竹市・東區', cats: ['forest'], img: 'spot-18peaks', x: 60, y: 57,
    desc: '走一段綠蔭步道，把呼吸留給山林，把時間留給自己。', tags: ['步道', '山林', '晨走'], tip: '步道平緩，一般人約 1–2 小時。' },
  { id: 'station', name: '新竹火車站', area: '新竹市・東區', cats: ['culture'], img: 'hero-station', x: 50, y: 46,
    desc: '第一站，交給好奇心。百年車站是認識新竹的起點。', tags: ['古蹟', '城市', '起點'], tip: '從這裡步行即可到城隍廟。' },
  { id: 'xinwawu', name: '新瓦屋客家文化保存區', area: '新竹縣・竹北市', cats: ['culture', 'family'], img: 'cat-oldstreet', x: 52, y: 26,
    desc: '在客家聚落改造的園區散步，看見地方文化的新樣貌。', tags: ['地方創生', '客家', '親子'], tip: '園區草地適合帶小孩放電。' },
  { id: 'hukou', name: '湖口老街', area: '新竹縣・湖口鄉', cats: ['culture'], img: 'trip-oldstreet', x: 62, y: 10,
    desc: '紅磚拱廊一路延伸，走進街巷、看看老屋，邊吃邊讀地方故事。', tags: ['老街', '紅磚', '拍照'], tip: '拱廊下很好拍，避開正午逆光。' },
  { id: 'emei', name: '峨眉湖', area: '新竹縣・峨眉鄉', cats: ['forest'], img: 'trip-slow', x: 84, y: 86,
    desc: '湖光山色加上慢慢走的步調，把一天放進不趕時間的風景裡。', tags: ['湖景', '慢旅行', '散步'], tip: '可和北埔老街排在同一天。' },
  { id: 'ricenoodle', name: '新竹米粉', area: '新竹市・各區', cats: ['food'], img: 'food-ricenoodle', x: 38, y: 50,
    desc: '乾炒或湯煮，各有自己的迷人滋味。從一碗米粉，開始認識新竹。', tags: ['01／一口地方風味', '在地經典'], tip: '先吃乾炒，再點一碗湯。' },
  { id: 'gongwan', name: '新竹貢丸', area: '新竹市・各區', cats: ['food'], img: 'food-gongwan', x: 45, y: 53,
    desc: '嚐嚐熟悉的彈牙口感，搭配一碗暖湯剛剛好。', tags: ['02／彈牙的日常', '伴手禮'], tip: '真空包裝適合當伴手禮。' },
  { id: 'temple', name: '城隍廟周邊小吃', area: '新竹市・北區', cats: ['food', 'culture'], img: 'food-templecake', x: 46, y: 43,
    desc: '在熱鬧的攤間尋味，邊走邊吃，感受城市的生活節奏。', tags: ['03／跟著香氣走', '夜晚也好逛'], tip: '先繞一圈再決定吃什麼。' },
  { id: 'coffee', name: '在地咖啡與特色店家', area: '新竹市・東區', cats: ['food'], img: 'food-coffee', x: 56, y: 40,
    desc: '轉進巷弄找個座位，讓咖啡香成為旅途的小休息。', tags: ['04／留一段發呆時間', '巷弄'], tip: '平日下午人少，最適合發呆。' },
  { id: 'persimmon', name: '新埔柿餅', area: '新竹縣・新埔鎮', cats: ['food'], img: 'story-persimmon', x: 72, y: 22,
    desc: '秋冬限定的橘色風景，曬柿餅的季節值得專程來一趟。', tags: ['季節限定', '秋冬'], tip: '約 9–12 月是曬柿餅的季節。' }
];

WZ.TYPES = {
  healing: { name: '山海療癒派', color: 'g', img: 'type-healing', img2: 'res-healing',
    line: '你的充電器，是森林和海風。', short: '你的充電方式，是一整片綠意和剛剛好的海風。',
    desc: '比起把行程填滿，你更喜歡把呼吸放慢。走進綠意、坐在海邊，什麼都不趕也很好。新竹的山海，正好接住想放鬆的你。',
    tags: ['自然充電', '慢步調', '自在放空'], recs: ['18peaks', 'nanliao'] },
  foodie: { name: '巷弄尋味派', color: 'y', img: 'type-foodie', img2: 'res-foodie',
    line: '鼻子是導航，轉個彎就有驚喜。', short: '鼻子是導航，老街小吃和咖啡香就是旅行線索。',
    desc: '你喜歡的旅行，是邊走邊吃、邊聽地方故事。老街的香氣、巷弄的咖啡和老屋的細節，都值得多停一下。把新竹的日常，慢慢嚐進回憶裡。',
    tags: ['老街文化', '在地滋味', '街角發現'], recs: ['beipu', 'temple', 'coffee'] },
  adventure: { name: '行動探險派', color: 'b', img: 'type-adventure', img2: 'res-adventure',
    line: '好奇心滿格，今天想多玩幾站！', short: '好奇心停不下來，想把山海與城市都玩進一天。',
    desc: '你的旅行雷達總是開著，山林、海線和城市街區都想探索。喜歡用腳步收集新發現，也喜歡一天結束時，帶著滿滿故事回家。新竹，夠你玩出更多可能。',
    tags: ['戶外行動', '多站探索', '好奇心滿格'], recs: ['18peaks', 'coastline', 'station'] }
};

WZ.QUIZ = [
  { tag: '旅行氛圍', q: '今天，你想把自己放在哪裡？',
    a: { t: '山裡森呼吸', d: '把步調放慢，讓綠意和鳥鳴陪你走一段。', s: { healing: 1, adventure: 1 } },
    b: { t: '海邊吹吹風', d: '看著海、吹著風，讓心情跟著浪花鬆開。', s: { healing: 2 } } },
  { tag: '旅行節奏', q: '假期到了，你的理想步調是？',
    a: { t: '睡到自然醒，慢慢逛', d: '不趕時間，遇到喜歡的角落就多待一下。', s: { healing: 1, foodie: 1 } },
    b: { t: '行程排滿，玩好玩滿', d: '好奇心滿格，多收集幾站才過癮！', s: { adventure: 2 } } },
  { tag: '吃貨選擇', q: '肚子和心情，都想被什麼餵飽？',
    a: { t: '鑽進老街找小吃', d: '跟著香氣走，邊吃邊探索在地滋味。', s: { foodie: 2 } },
    b: { t: '找間特色咖啡店放空', d: '選個喜歡的座位，把時間留給一杯咖啡。', s: { foodie: 1, healing: 1 } } },
  { tag: '文化偏好', q: '下一個轉彎，你想遇見什麼？',
    a: { t: '走進老街，聽地方故事', d: '從老屋到街角，看看時間留下的生活痕跡。', s: { foodie: 2 } },
    b: { t: '走進自然，探索秘境', d: '沿著綠意前進，讓風景帶來新的發現。', s: { adventure: 1, healing: 1 } } },
  { tag: '旅伴模式', q: '這一趟，你想和誰一起出發？',
    a: { t: '和朋友一起冒險', d: '分享沿途驚喜，一起把回憶玩得更熱鬧。', s: { adventure: 2 } },
    b: { t: '一個人享受自由', d: '想走就走、想停就停，今天只跟著自己。', s: { healing: 2 } } }
];

WZ.TRIPS = [
  { id: 'slow', name: '新竹一日慢旅行', kind: '一日示意', fit: '適合喜歡慢慢逛的你', color: 'r', img: 'trip-slow',
    desc: '把城市散步與在地風味，放進不趕時間的一天。',
    stops: [
      { t: '09:30', spot: 'station', note: '從百年車站出發，先拍一張旅行起點。' },
      { t: '10:30', spot: 'temple', note: '城隍廟周邊吃早午餐，邊走邊吃。' },
      { t: '13:30', spot: '18peaks', note: '飯後到十八尖山慢慢走，消化一下。' },
      { t: '15:30', spot: 'coffee', note: '轉進巷弄咖啡店，留一段發呆時間。' },
      { t: '17:30', spot: 'nanliao', note: '到南寮漁港看夕陽，結束這一天。' } ] },
  { id: 'culture', name: '老街文化散步', kind: '半日示意', fit: '適合文化與美食愛好者', color: 'y', img: 'trip-oldstreet',
    desc: '走進街巷、看看老屋，邊吃邊讀地方故事。',
    stops: [
      { t: '10:00', spot: 'beipu', note: '北埔老街逛老屋，順手買點客家小點。' },
      { t: '12:00', spot: 'emei', note: '到峨眉湖邊散步，看湖光山色。' },
      { t: '14:30', spot: 'persimmon', note: '秋冬季節順路去看曬柿餅（季節限定）。' } ] },
  { id: 'nature', name: '山海自然探索', kind: '一日示意', fit: '適合戶外與自然愛好者', color: 'b', img: 'trip-nature',
    desc: '從綠意走向海風，替日常換一種開闊的視野。',
    stops: [
      { t: '08:30', spot: '18peaks', note: '早起走十八尖山，空氣最清新。' },
      { t: '11:30', spot: 'ricenoodle', note: '補充體力，來一盤新竹炒米粉。' },
      { t: '13:30', spot: 'coastline', note: '租台腳踏車，沿 17 公里海岸線騎乘。' },
      { t: '17:00', spot: 'nanliao', note: '騎到南寮漁港，等一場夕陽。' } ] }
];

WZ.spot = id => WZ.SPOTS.find(s => s.id === id);
WZ.cat = id => WZ.CATS.find(c => c.id === id);
