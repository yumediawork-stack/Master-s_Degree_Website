/* ЕНЕРГОРЕСУРС ІНВЕСТ — app.js (багатосторінковий: кожен модуль з guard)
   годинник, рендер-%, бургер, 25 менеджерів, маска +380, форма, фільтри,
   Three.js: труба / коліно 90°, виноски, Ø і L.
*/
(function(){
  'use strict';
  function $(id){ return document.getElementById(id); }

  /* ---------- 0. Рік + годинник ---------- */
  var yearEl = $('year'), clock = $('clock');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  if(clock){
    (function tickClock(){
      var d = new Date();
      function p(n){ return (n < 10 ? '0' : '') + n; }
      clock.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
    })();
    setInterval(function(){
      var d = new Date();
      function p(n){ return (n < 10 ? '0' : '') + n; }
      clock.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
    }, 1000);
  }

  /* ---------- 0.1. RENDERING % (тільки головна) ---------- */
  var pct = $('renderPct'), pv = 83;
  if(pct) setInterval(function(){ pv = pv >= 99 ? 83 : pv + 1; pct.textContent = pv + '%'; }, 900);

  /* ---------- 1. Бургер ---------- */
  var burger = $('burger'), mobileMenu = $('mobileMenu');
  if(burger && mobileMenu){
    burger.addEventListener('click', function(){
      var open = mobileMenu.hasAttribute('hidden');
      if(open){ mobileMenu.removeAttribute('hidden'); burger.setAttribute('aria-expanded','true'); }
      else{ mobileMenu.setAttribute('hidden',''); burger.setAttribute('aria-expanded','false'); }
    });
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mobileMenu.setAttribute('hidden',''); burger.setAttribute('aria-expanded','false'); });
    });
  }

  /* ---------- 2. 25 областей + менеджери ---------- */
  var MANAGERS = [
    ['Вінницька','Олександр Ковальчук','+380 (97) 111-51-21'],
    ['Волинська','Ірина Савчук','+380 (97) 111-51-22'],
    ['Дніпропетровська','Дмитро Бондаренко','+380 (97) 111-51-23'],
    ['Донецька','Сергій Ткаченко','+380 (97) 111-51-24'],
    ['Житомирська','Ольга Мельник','+380 (97) 111-51-25'],
    ['Закарпатська','Василь Глеба','+380 (97) 111-51-26'],
    ['Запорізька','Марина Шевченко','+380 (97) 111-51-27'],
    ['Івано-Франківська','Тарас Дутка','+380 (97) 111-51-28'],
    ['Київська','Андрій Поліщук','+380 (97) 111-51-29'],
    ['Кіровоградська','Наталія Литвин','+380 (97) 111-51-30'],
    ['Луганська','Павло Руденко','+380 (97) 111-51-31'],
    ['Львівська','Остап Хомик','+380 (97) 111-51-32'],
    ['Миколаївська','Катерина Гроза','+380 (97) 111-51-33'],
    ['Одеська','Ігор Марченко','+380 (97) 111-51-34'],
    ['Полтавська','Світлана Олешко','+380 (97) 111-51-35'],
    ['Рівненська','Богдан Кравець','+380 (97) 111-51-36'],
    ['Сумська','Юлія Ксьонз','+380 (97) 111-51-37'],
    ['Тернопільська','Михайло Баран','+380 (97) 111-51-38'],
    ['Харківська','Олег Сидоренко','+380 (97) 111-51-39'],
    ['Херсонська','Дарина Нестерова','+380 (97) 111-51-40'],
    ['Хмельницька','Роман Гуменюк','+380 (97) 111-51-41'],
    ['Черкаська','Вікторія Задорожна','+380 (97) 111-51-42'],
    ['Чернівецька','Степан Воронюк','+380 (97) 111-51-43'],
    ['Чернігівська','Людмила Дейнека','+380 (97) 111-51-44'],
    ['м. Київ','Євген Кравченко','+380 (97) 111-51-45']
  ];
  var regionSelect = $('regionSelect'), formRegion = $('formRegion');
  var mName = $('managerName'), mRegion = $('managerRegion'),
      mPhone = $('managerPhone'), mAvatar = $('managerAvatar');
  function telHref(t){ return 'tel:+38' + t.replace(/\D/g,'').slice(-10); }
  if(regionSelect && formRegion){
    MANAGERS.forEach(function(m){
      var o1 = document.createElement('option'); o1.value = m[0]; o1.textContent = m[0]; regionSelect.appendChild(o1);
      var o2 = document.createElement('option'); o2.value = m[0]; o2.textContent = m[0]; formRegion.appendChild(o2);
    });
    regionSelect.addEventListener('change', function(){
      var f = MANAGERS.find(function(m){ return m[0] === regionSelect.value; });
      if(!f || !mName) return;
    mName.textContent = f[1].toUpperCase();
    mRegion.textContent = regionName(f[0]).toUpperCase() + ' • ' + t('ІНЖЕНЕР З ПРОДАЖУ');
      mPhone.textContent = f[2];
      mPhone.href = telHref(f[2]);
      mAvatar.textContent = '■';
      formRegion.value = f[0];
    });
  }

  /* ---------- 3. Маска +380 ---------- */
  var phoneInput = document.querySelector('input[name="phone"]');
  if(phoneInput) phoneInput.addEventListener('input', function(){
    var d = phoneInput.value.replace(/\D/g,'');
    if(d.indexOf('380') !== 0){
      if(d.charAt(0) === '0') d = '38' + d;
      else if(d.indexOf('80') === 0) d = '3' + d;
      else d = '380' + d.replace(/^380/,'');
    }
    d = d.slice(0,12);
    var rest = d.slice(3), out = '+380';
    if(rest.length > 0) out += ' (' + rest.slice(0,2);
    if(rest.length >= 2) out += ')';
    if(rest.length > 2) out += ' ' + rest.slice(2,5);
    if(rest.length > 5) out += '-' + rest.slice(5,7);
    if(rest.length > 7) out += '-' + rest.slice(7,9);
    phoneInput.value = out;
  });

  /* ---------- 4. Форма ---------- */
  var form = $('requestForm'), err = $('formError'), fstatus = $('formStatus');
  if(form && err && fstatus){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      err.hidden = true; err.textContent = '';
      var name = form.name.value.trim(),
          phone = form.phone.value.trim(),
          region = form.region.value;
      if(name.length < 2){ return fail(t('> ПОМИЛКА: ВКАЖІТЬ ІМʼЯ.')); }
      if(phone.replace(/\D/g,'').length !== 12){ return fail(t('> ПОМИЛКА: ТЕЛЕФОН +380 (__) ___-__-__.')); }
      if(!region){ return fail(t('> ПОМИЛКА: ОБЕРІТЬ ОБЛАСТЬ.')); }
      var n = Math.floor(1000 + Math.random()*9000);
      var queue = JSON.parse(localStorage.getItem('eri_requests') || '[]');
      queue.push({n:name, phone:phone, region:region, msg:form.message.value.trim(), at:new Date().toISOString()});
      localStorage.setItem('eri_requests', JSON.stringify(queue));
      fstatus.textContent = t('> ДОСТУП ДОЗВОЛЕНО. ЗАЯВКУ №{n} ПРИЙНЯТО ({r}).', {n:n, r:regionName(region).toUpperCase()});
      form.reset(); if(phoneInput) phoneInput.value = '+380 ';
    });
    function fail(m){ err.textContent = m; err.hidden = false; }
  }

  /* ---------- 5. Фільтри (тільки головна) ---------- */
  var cf = $('catalogFilters');
  if(cf) cf.addEventListener('submit', function(e){
    var f = e.target;
    var d = parseInt(f.d.value || '0', 10), t = parseInt(f.t.value || '0', 10);
    var msg = t('> ПІДБІР: ');
    if(d){ msg += (d <= 1020 ? t('ПЕ МОЖЛИВА; ') : t('ТІЛЬКИ МЕТАЛ (ДО 1200); ')); }
    if(f.t.value){ msg += (t >= -150 && t <= 650 ? t('ТЕМП. ОК; ') : t('ТЕМП. ПОЗА −150…+650 — ДО ІНЖЕНЕРА; ')); }
    msg += t(f.shell.value || 'БУДЬ-ЯКА ОБОЛОНКА') + ' • ' + t(f.use.value || 'БУДЬ-ЯКЕ ПРИЗНАЧЕННЯ') + '.';
    $('filterResult').textContent = msg.toUpperCase();
  });

  /* ---------- 6. Three.js (тільки головна) ---------- */
  var container = $('model3d');
  if(container){
    var status3d = $('model3dStatus'),
        fallback = $('model3dFallback'),
        annotLayer = $('annotLayer'),
        leaderSvg = $('leaderSvg');
    var autoRotate = true, cutaway = false, metalShell = false, showAnnot = false;
    var view = 'pipe';
    var dnMM = 273, lenM = 12;
    var BASE_DN = 273, UNIT_PER_M = 0.4;
    var isMobile = window.matchMedia('(max-width: 620px)').matches;

    (function useFallback(reason){
      container.classList.add('is-fallback');
      fallback.classList.add('force');
      status3d.textContent = reason;
    });

    if(isMobile){ container.classList.add('is-fallback'); fallback.classList.add('force'); status3d.textContent = t('// МОБІЛЬНИЙ РЕЖИМ: 2D-FALLBACK.'); }
    else if(typeof THREE === 'undefined'){ container.classList.add('is-fallback'); fallback.classList.add('force'); status3d.textContent = t('// THREE.JS НЕДОСТУПНИЙ: 2D-FALLBACK.'); }
    else{
      try{
        var scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a141f);
        var cam = new THREE.PerspectiveCamera(42, container.clientWidth/380, 0.1, 100);
        cam.position.set(5.8, 3.4, 6.6);
        cam.lookAt(0, 0.5, 0);
        var ren = new THREE.WebGLRenderer({antialias:true});
        ren.setSize(container.clientWidth, 380);
        container.appendChild(ren.domElement);
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        var key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(5,6,4); scene.add(key);

        var group = new THREE.Group(); scene.add(group);
        group.rotation.x = 0.3;

        var matShell = new THREE.MeshStandardMaterial({color:0x006eb6, roughness:.45, metalness:.2, side:THREE.DoubleSide});
        var matPPU = new THREE.MeshStandardMaterial({color:0x3d9bd6, roughness:.5, metalness:.15, side:THREE.DoubleSide});
        var matSteel = new THREE.MeshStandardMaterial({color:0xd7e6f2, roughness:.35, metalness:.35, side:THREE.DoubleSide});
        var matWire = new THREE.MeshStandardMaterial({color:0xe53312, roughness:.5, metalness:.1});

        var anchors = [];

        function radii(){
          var s = dnMM / BASE_DN;
          return {steel:0.72*s, ppu:1.18*s, shell:1.5*s};
        }
        function clearAll(){
          while(group.children.length) group.remove(group.children[0]);
          anchors.forEach(function(a){ a.el.remove(); a.line.remove(); });
          anchors = [];
        }
        function addAnchor(x, y, z, dx, dy, cls, textFn){
          var o = new THREE.Object3D(); o.position.set(x, y, z); group.add(o);
          var el = document.createElement('div');
          el.className = 'alabel' + (cls ? ' ' + cls : '');
          annotLayer.appendChild(el);
          var line = document.createElementNS('http://www.w3.org/2000/svg','line');
          line.setAttribute('stroke', '#E53312'); line.setAttribute('stroke-width', '1.5');
          leaderSvg.appendChild(line);
          anchors.push({obj:o, el:el, line:line, dx:dx, dy:dy, text:textFn});
        }
        function cylX(r, len, mat, theta){
          var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 40, 1, false, 0, theta || Math.PI*2), mat);
          m.rotation.z = Math.PI/2; return m;
        }

        function buildPipe(){
          clearAll();
          var r = radii(), L = lenM * UNIT_PER_M;
          matShell.color.set(metalShell ? 0x8a9aa8 : 0x006eb6);
          matShell.transparent = false; matShell.opacity = 1;
          var th = cutaway ? Math.PI*1.25 : Math.PI*2;
          group.add(cylX(r.shell, L, matShell, th));
          group.add(cylX(r.ppu, L + 0.06, matPPU, th));
          group.add(cylX(r.steel, L + 0.12, matSteel, th));
          var wy = r.ppu*0.82, wz = r.ppu*0.32;
          var wg = new THREE.CylinderGeometry(0.05,0.05,L,8);
          var w1 = new THREE.Mesh(wg, matWire); w1.rotation.z = Math.PI/2; w1.position.set(0, wy, wz); group.add(w1);
          var w2 = w1.clone(); w2.position.z = -wz; group.add(w2);
        addAnchor(L*0.28, r.shell*0.95, 0, 110, -70, '', function(){ return t('ПЕ-ОБОЛОНКА') + ' · Ø ' + dnMM; });
        addAnchor(-L*0.05, r.ppu*0.92, 0, 120, 8, '', function(){ return t('ППУ-ІЗОЛЯЦІЯ'); });
        addAnchor(-L*0.3, r.steel*0.9, 0, 100, 72, '', function(){ return t('СТАЛЬ') + ' · Ø ' + dnMM; });
        addAnchor(L*0.12, wy, wz, -140, -50, 'alabel--red', function(){ return t('ДКМ') + ' · 2×Cu'; });
        }

        function buildElbow(){
          clearAll();
          var r = radii(), R = 2.0, leg = 0.8 + lenM*0.12;
          matShell.color.set(metalShell ? 0x8a9aa8 : 0x006eb6);
          if(cutaway){ matShell.transparent = true; matShell.opacity = 0.32; }
          else{ matShell.transparent = false; matShell.opacity = 1; }
          function elbowCurve(zOff){
            var pts = [], i, a;
            for(i = 0; i <= 4; i++) pts.push(new THREE.Vector3(R, -leg + (leg/4)*i, zOff));
            for(i = 1; i <= 20; i++){ a = (i/20)*Math.PI/2; pts.push(new THREE.Vector3(R*Math.cos(a), R*Math.sin(a), zOff)); }
            for(i = 1; i <= 4; i++) pts.push(new THREE.Vector3(-(leg/4)*i, R, zOff));
            return new THREE.CatmullRomCurve3(pts);
          }
          var curve = elbowCurve(0);
          group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 90, r.shell, 28, false), matShell));
          group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 90, r.ppu, 28, false), matPPU));
          group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 90, r.steel, 24, false), matSteel));
          var wz = (r.steel + r.ppu)/2;
          [wz, -wz].forEach(function(z){
            group.add(new THREE.Mesh(new THREE.TubeGeometry(elbowCurve(z), 70, 0.05, 8, false), matWire));
          });
          function pol(rr, deg){ var a2 = deg*Math.PI/180; return [rr*Math.cos(a2), rr*Math.sin(a2)]; }
          var p1 = pol(R + r.shell, 45);
          var p2 = pol(R + r.ppu*0.95, 62);
          var p3 = pol(R + r.steel*0.9, 28);
          var Rw = R + (r.steel + r.ppu)/2, p4 = pol(Rw, 45);
        addAnchor(p1[0], p1[1], 0, 110, -80, '', function(){ return t('ПЕ-ОБОЛОНКА') + ' · Ø ' + dnMM; });
        addAnchor(p2[0], p2[1], 0, 120, 0, '', function(){ return t('ППУ-ІЗОЛЯЦІЯ'); });
        addAnchor(p3[0], p3[1], 0, 100, 80, '', function(){ return t('СТАЛЬ') + ' · R=' + Math.round(R*300) + '·Ø' + dnMM; });
        addAnchor(p4[0], p4[1], wz, -140, -60, 'alabel--red', function(){ return t('ДКМ') + ' · 2×Cu'; });
        }

        function build(){ (view === 'elbow' ? buildElbow : buildPipe)(); refreshTexts(); updateStatus(); }
        function refreshTexts(){ anchors.forEach(function(a){ a.el.innerHTML = a.text(); }); }
        function updateStatus(){
          status3d.textContent = '// ' + (view === 'elbow' ? t('КОЛІНО 90°') : t('ТРУБА')) +
            ' · Ø ' + dnMM + ' · L ' + lenM + ' М.';
        }
        window.__eri3dRefresh = function(){
          refreshTexts(); updateStatus();
          var bs = $('btnSettings'), sp = $('settingsPanel');
          if(bs && sp) bs.innerHTML = '⚙ ' + t('НАЛАШТУВАННЯ') + (sp.hasAttribute('hidden') ? ' ▾' : ' ▴');
        };

        var projV = new THREE.Vector3();
        function layoutAnnot(){
          var w = container.clientWidth, h = 380;
          var show = showAnnot && anchors.length;
          annotLayer.style.display = show ? 'block' : 'none';
          leaderSvg.style.display = show ? 'block' : 'none';
          if(!show) return;
          anchors.forEach(function(a){
            a.obj.getWorldPosition(projV); projV.project(cam);
            var sx = (projV.x*0.5 + 0.5)*w, sy = (-projV.y*0.5 + 0.5)*h;
            var lx = Math.min(w - 70, Math.max(70, sx + a.dx));
            var ly = Math.min(h - 16, Math.max(16, sy + a.dy));
            a.el.style.left = lx + 'px'; a.el.style.top = ly + 'px';
            a.line.setAttribute('x1', sx); a.line.setAttribute('y1', sy);
            a.line.setAttribute('x2', lx); a.line.setAttribute('y2', ly);
          });
        }

        build();

        var drag = false, px = 0, py = 0;
        ren.domElement.addEventListener('pointerdown', function(e){ drag = true; px = e.clientX; py = e.clientY; });
        window.addEventListener('pointerup', function(){ drag = false; });
        window.addEventListener('pointermove', function(e){
          if(!drag) return;
          group.rotation.y += (e.clientX - px)*0.01;
          group.rotation.x = Math.min(1.1, Math.max(-1.1, group.rotation.x + (e.clientY - py)*0.01));
          px = e.clientX; py = e.clientY;
        });
        (function loop(){
          requestAnimationFrame(loop);
          if(autoRotate && !drag) group.rotation.y += 0.008;
          ren.render(scene, cam);
          layoutAnnot();
        })();
        window.addEventListener('resize', function(){
          ren.setSize(container.clientWidth, 380);
          cam.aspect = container.clientWidth/380; cam.updateProjectionMatrix();
        });

        var btnSettings = $('btnSettings'), settingsPanel = $('settingsPanel');
        if(btnSettings && settingsPanel) btnSettings.addEventListener('click', function(){
          var open = settingsPanel.hasAttribute('hidden');
      if(open){ settingsPanel.removeAttribute('hidden'); btnSettings.setAttribute('aria-expanded','true'); btnSettings.innerHTML = '⚙ ' + t('НАЛАШТУВАННЯ') + ' ▴'; }
        else{ settingsPanel.setAttribute('hidden',''); btnSettings.setAttribute('aria-expanded','false'); btnSettings.innerHTML = '⚙ ' + t('НАЛАШТУВАННЯ') + ' ▾'; }
        });
        function segWire(name, fn){
          var seg = document.querySelector('.seg[data-seg="' + name + '"]');
          if(!seg) return;
          var btns = Array.prototype.slice.call(seg.querySelectorAll('.seg__btn'));
          var pill = seg.querySelector('.seg__pill');
          function paint(){
            var idx = 0;
            btns.forEach(function(x, i){ if(x.classList.contains('on')) idx = i; });
            pill.style.transform = 'translateX(' + (idx*100) + '%)';
          }
          btns.forEach(function(b){
            b.addEventListener('click', function(){
              btns.forEach(function(x){ x.classList.remove('on'); });
              b.classList.add('on'); paint();
              fn(b.getAttribute('data-val'));
            });
          });
          paint();
        }
        segWire('view', function(v){ view = v; build(); });
        segWire('shell', function(v){
        metalShell = (v === 'metal'); build();
        status3d.textContent = metalShell ? t('// ОБОЛОНКА: МЕТАЛ, ДО Ø 1200.') : t('// ОБОЛОНКА: ПЕ, ДО Ø 1020.');
      });

        var btnRotate = $('btnRotate');
        function setRotate(v){ autoRotate = v; btnRotate.setAttribute('aria-pressed', String(v)); }
        if(btnRotate) btnRotate.addEventListener('click', function(){ setRotate(!autoRotate); updateStatus();
        status3d.textContent = autoRotate ? t('// ОБЕРТАННЯ: ON.') : t('// ОБЕРТАННЯ: ПАУЗА. ТЯГНІТЬ МИШЕЮ.'); });
        var btnCut = $('btnCut');
        if(btnCut) btnCut.addEventListener('click', function(e){
          cutaway = !cutaway; build();
          e.currentTarget.setAttribute('aria-pressed', String(cutaway));
          status3d.textContent = cutaway ? t('// РОЗРІЗ: СТАЛЬ/ППУ/ОБОЛОНКА/ДКМ.') : t('// ЦІЛІСНА ТРУБА.');
        });
        var btnAnnot = $('btnAnnot');
        if(btnAnnot) btnAnnot.addEventListener('click', function(){
          showAnnot = !showAnnot;
          btnAnnot.setAttribute('aria-pressed', String(showAnnot));
          if(showAnnot) setRotate(false);
          status3d.textContent = showAnnot ? t('// ПАУЗА. ВИНОСКИ: ОБОЛОНКА • ППУ • СТАЛЬ • ДКМ.') : t('// АНОТАЦІЇ: OFF.');
        });

        var dnRange = $('dnRange'), dnOut = $('dnOut');
        if(dnRange) dnRange.addEventListener('input', function(){
          dnMM = parseInt(dnRange.value, 10); dnOut.textContent = dnRange.value;
          build();
        });
        var lenRange = $('lenRange'), lenOut = $('lenOut');
        if(lenRange) lenRange.addEventListener('input', function(){
          lenM = parseFloat(lenRange.value); lenOut.textContent = lenRange.value;
          build();
        });
      }catch(err){
        container.classList.add('is-fallback');
        fallback.classList.add('force');
        status3d.textContent = t('// WEBGL ПОМИЛКА: 2D-FALLBACK.');
      }
    }
  }

  /* ---------- 7. Reveal-on-scroll + stagger сіток ---------- */
  (function(){
    var grids = document.querySelectorAll('.pgrid,.wgrid,.status-grid,.dgrid');
    grids.forEach(function(g){
      Array.prototype.forEach.call(g.children, function(c, i){
        c.style.transitionDelay = Math.min(i*80, 320) + 'ms';
      });
    });
    var revEls = document.querySelectorAll('.pgrid > *, .wgrid > *, .status-grid > *, .dgrid > *, .lst__row, .term, .form, .player, .stage, .spec');
    revEls.forEach(function(el){ el.classList.add('reveal'); });
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(es){
        es.forEach(function(en){
          if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, {threshold:.1});
      revEls.forEach(function(el){ io.observe(el); });
    }else{
      revEls.forEach(function(el){ el.classList.add('in'); });
    }
  })();

  /* ---------- 8. Мова UA/EN + тема Light/Dark ---------- */
  var LANG_KEY = 'eri_lang', THEME_KEY = 'eri_theme';
  var lang = 'ua';
  try{ lang = localStorage.getItem(LANG_KEY) || 'ua'; }catch(e0){}
  var REGION_EN = {
    'Вінницька':'Vinnytsia','Волинська':'Volyn','Дніпропетровська':'Dnipropetrovsk','Донецька':'Donetsk',
    'Житомирська':'Zhytomyr','Закарпатська':'Zakarpattia','Запорізька':'Zaporizhzhia','Івано-Франківська':'Ivano-Frankivsk',
    'Київська':'Kyiv region','Кіровоградська':'Kirovohrad','Луганська':'Luhansk','Львівська':'Lviv','Миколаївська':'Mykolaiv',
    'Одеська':'Odesa','Полтавська':'Poltava','Рівненська':'Rivne','Сумська':'Sumy','Тернопільська':'Ternopil',
    'Харківська':'Kharkiv','Херсонська':'Kherson','Хмельницька':'Khmelnytskyi','Черкаська':'Cherkasy',
    'Чернівецька':'Chernivtsi','Чернігівська':'Chernihiv','м. Київ':'Kyiv city'
  };
  var I18N = {
    /* chrome */
    'До контенту':'Skip to content','ЛЬВІВ, ЗЕЛЕНА 131':'LVIV, ZELENA ST. 131',
    'ПН–ПТ 9:00–18:00':'MON–FRI 9:00 AM–6:00 PM','Головна':'Home','Продукція':'Products','Послуги':'Services',
    'Портфоліо':'Portfolio','Документація':'Docs','Про нас':'About','Контакти':'Contacts','3D-каталог':'3D catalog',
    'Залишити заявку ↗':'Request a quote ↗','Головна навігація':'Main navigation','Меню':'Menu','Мобільна навігація':'Mobile navigation',
    'Енергоресурс Інвест — на головну':'Energoresurs Invest — home','Енергоресурс Інвест':'Energoresurs Invest',
    'НАВІГАЦІЯ':'NAVIGATION','РЕСУРСИ':'RESOURCES','Про компанію':'About','Прес-центр':'Press',
    'GLOBAL NODE // 9 КРАЇН':'GLOBAL NODE // 9 COUNTRIES','● ЗВʼЯЗОК ЗАХИЩЕНИЙ':'● SECURE CONNECTION',
    '> ДОСТУП ДОЗВОЛЕНО_':'> ACCESS GRANTED_','ТЕМА':'THEME','Перемкнути тему':'Toggle theme','НАЛАШТУВАННЯ':'SETTINGS',
    'ІНЖЕНЕР З ПРОДАЖУ':'SALES ENGINEER',
    /* hero */
    'ТЕПЛО':'HEAT','І ВОДА':'AND WATER','ДЛЯ МІСТ_':'FOR CITIES_',
    'ПРОЄКТУЄМО. ВИРОБЛЯЄМО. МОНТУЄМО.':'WE DESIGN. WE MANUFACTURE. WE INSTALL.',
    'Предизольовані ППУ-труби, фасонні вироби та ДКМ. Львів, з 1996 року. 400+ фахівців. Проєкти UNOPS у Миколаєві.':'Pre-insulated PU-foam pipes, fittings and heat-loss monitoring. Lviv, since 1996. 400+ specialists. UNOPS projects in Mykolaiv.',
    'Знайти менеджера ↗':'Find your manager ↗','[ Перейти в каталог ]':'[ Browse catalog ]',
    '+380 (97) 111-51-15 — ВІДДІЛ ПРОДАЖУ':'+380 (97) 111-51-15 — SALES DEPARTMENT',
    '✓ 30+ ПРОЄКТІВ/РІК':'✓ 30+ PROJECTS/YEAR','✓ 9 КРАЇН ЕКСПОРТУ':'✓ EXPORT TO 9 COUNTRIES',
    'ППУ-ТРУБА // РОЗРІЗ':'PU-FOAM PIPE // SECTION','Торець 273/400 — сталь / ППУ / ПЕ — 2×Cu ДКМ':'273/400 pipe end — steel / foam / PE — 2×Cu monitoring',
    'Z_ДKM.6682':'Z_DKM.6682',
    'ТРУБИ ППУ Ø 32–1020':'PU-FOAM PIPES Ø 32–1020','ДКМ-МОНІТОРИНГ':'HEAT-LOSS MONITORING','КНС':'PUMP STATIONS',
    'ОЧИСНІ СПОРУДИ':'TREATMENT PLANTS','ІТП/ЦТП':'HEAT SUBSTATIONS','ШЕФ-МОНТАЖ':'SUPERVISION',
    /* статуси, напрями */
    '/01 — Хто ми':'/01 — Who we are','/02 — Системний статус':'/02 — System status',
    'РОКІВ ВИРОБНИЦТВА':'YEARS IN PRODUCTION','ФАХІВЦІВ':'SPECIALISTS','МОНТАЖІВ / РІК':'INSTALLATIONS / YEAR',
    'МАКС. ДІАМЕТР':'MAX DIAMETER','1200 ММ':'1200 MM',
    'ВСІ СИСТЕМИ ПРАЦЮЮТЬ — ЦЕХ, ЛЬВІВ, ЗЕЛЕНА 131':'ALL SYSTEMS OPERATIONAL — PLANT, LVIV, ZELENA 131',
    '/03 — Напрями':'/03 — Divisions','ТРИ НАПРЯМИ.':'THREE DIVISIONS.','ОДИН ПІДРЯДНИК.':'ONE CONTRACTOR.',
    'ТЕПЛО / ГВП':'HEATING / DHW','Труби ППУ в ПЕ Ø 32–1020':'PU-foam pipes in PE, Ø 32–1020',
    'Труби ППУ в металі до Ø 1200':'PU-foam pipes in steel casing up to Ø 1200','Коліна, трійники, компенсатори':'Elbows, tees, expansion joints',
    'Теплові пункти ІТП/ЦТП':'Heat substations','→ В КАТАЛОГ: ТЕПЛО':'→ CATALOG: HEATING',
    'ВОДА / КАНАЛІЗАЦІЯ':'WATER / SEWAGE','Напірні трубопроводи, резервуари':'Pressure pipelines, tanks',
    'КНС насосні станції':'Sewage pump stations','Фасонка для водоканалів':'Fittings for water utilities','→ В КАТАЛОГ: ВОДА':'→ CATALOG: WATER',
    'ІНЖИНІРИНГ':'ENGINEERING','Проєктування — 30+/рік':'Design — 30+/year','Монтаж під ключ — 50+/рік':'Turnkey installation — 50+/year',
    'Аудит мереж, ДКМ':'Network audit, monitoring','Сервіс і шеф-монтаж':'Service and supervision','→ ЗАМОВИТИ ІНЖИНІРИНГ':'→ ORDER ENGINEERING',
    /* фільтри */
    '/03.1 — Фасетний підбір':'/03.1 — Parametric search','ДІАМЕТР, ММ':'DIAMETER, MM','ОБОЛОНКА':'CASING',
    'Будь-яка':'Any','ПЕ':'PE','Металева':'Steel','ТЕМП., °C':'TEMP., °C','ПРИЗНАЧЕННЯ':'APPLICATION',
    'Будь-яке':'Any','Тепло / ГВП':'Heating / DHW','Вода':'Water','Каналізація':'Sewage','Підібрати':'Find',
    'ВКАЖІТЬ ПАРАМЕТРИ → ПОКАЖЕМО ПОЗИЦІЇ ТА МЕНЕДЖЕРА.':'SET PARAMETERS → WE WILL MATCH PRODUCTS AND YOUR MANAGER.',
    '> ПІДБІР: ':'> MATCH: ','ПЕ МОЖЛИВА; ':'PE CASING FITS; ','ТІЛЬКИ МЕТАЛ (ДО 1200); ':'STEEL CASING ONLY (UP TO 1200); ',
    'ТЕМП. ОК; ':'TEMP OK; ','ТЕМП. ПОЗА −150…+650 — ДО ІНЖЕНЕРА; ':'TEMP OUTSIDE −150…+650 — ASK AN ENGINEER; ',
    'БУДЬ-ЯКА ОБОЛОНКА':'ANY CASING','БУДЬ-ЯКЕ ПРИЗНАЧЕННЯ':'ANY APPLICATION',
    /* 3D */
    '/04 — Флагман // 3D':'/04 — Flagship // 3D','ТРУБА ППУ':'PU-FOAM PIPE','З СИСТЕМОЮ ДКМ_':'WITH MONITORING_',
    'СТАЛЬ • ППУ • ПЕ АБО МЕТАЛ • 2 СИГНАЛЬНІ КАБЕЛІ ДКМ.':'STEEL • PU FOAM • PE OR STEEL CASING • 2 MONITORING WIRES.',
    'ПАРАМЕТР':'PARAMETER','ЗНАЧЕННЯ':'VALUE','ДІАМЕТР':'DIAMETER','32–1020 (ПЕ) / ДО 1200 (МЕТАЛ)':'32–1020 (PE) / UP TO 1200 (STEEL)',
    'ТЕМПЕРАТУРА':'TEMPERATURE','ДО +150 °C / ПІК +160 °C':'UP TO +150 °C / PEAK +160 °C','ДКМ':'MONITORING',
    'ІМПУЛЬСНА, 2×Cu, ТЕРМІНАЛ':'PULSE TYPE, 2×Cu, TERMINAL','НОРМАТИВ':'STANDARDS','ДБН В.2.5-39, ДСТУ EN 253':'DBN V.2.5-39, DSTU EN 253',
    'ДКМ-СХЕМА':'WIRING DIAGRAM','До менеджера ↗':'Contact manager ↗','Керування 3D':'3D controls',
    '⟳ ОБЕРТАТИ':'⟳ ROTATE','◐ РОЗРІЗ':'◐ SECTION','ПЕ VS МЕТАЛ':'PE VS STEEL','АНОТАЦІЇ':'LABELS',
    '01 / ТИП ПРОДУКТУ':'01 / PRODUCT TYPE','ТРУБА':'PIPE','КОЛІНО 90°':'ELBOW 90°',
    '02 / СПЕЦИФІКАЦІЯ ПРОДУКТУ':'02 / PRODUCT SPECS','МЕТАЛ':'STEEL','РОЗРІЗ':'SECTION',
    'Ø, ММ':'Ø, MM','L, М':'L, M','Діаметр труби':'Pipe diameter','Довжина труби':'Pipe length',
    'Тип продукту':'Product type','Оболонка':'Casing',
    'Креслення труби ППУ':'PU-foam pipe drawing','2D-FALLBACK ДЛЯ СМАРТФОНІВ. ПОВНА 3D — НА ДЕСКТОПІ.':'2D FALLBACK FOR SMARTPHONES. FULL 3D ON DESKTOP.',
    'ПЕ-ОБОЛОНКА':'PE CASING','ППУ-ІЗОЛЯЦІЯ':'PU-FOAM INSULATION','СТАЛЬ':'STEEL',
    '// ТРУБА':'// PIPE','// КОЛІНО 90°':'// ELBOW 90°','// ОБЕРТАННЯ: ON.':'// ROTATION: ON.',
    '// ОБЕРТАННЯ: ПАУЗА. ТЯГНІТЬ МИШЕЮ.':'// ROTATION PAUSED. DRAG WITH THE MOUSE.',
    '// РОЗРІЗ: СТАЛЬ/ППУ/ОБОЛОНКА/ДКМ.':'// SECTION: STEEL/FOAM/CASING/MONITORING.','// ЦІЛІСНА ТРУБА.':'// SOLID PIPE.',
    '// ОБОЛОНКА: МЕТАЛ, ДО Ø 1200.':'// CASING: STEEL, UP TO Ø 1200.','// ОБОЛОНКА: ПЕ, ДО Ø 1020.':'// CASING: PE, UP TO Ø 1020.',
    '// АНОТАЦІЇ: OFF.':'// LABELS: OFF.','// ПАУЗА. ВИНОСКИ: ОБОЛОНКА • ППУ • СТАЛЬ • ДКМ.':'// PAUSED. CALLOUTS: CASING • FOAM • STEEL • MONITORING.',
    '// МОБІЛЬНИЙ РЕЖИМ: 2D-FALLBACK.':'// MOBILE MODE: 2D FALLBACK.',
    '// THREE.JS НЕДОСТУПНИЙ: 2D-FALLBACK.':'// THREE.JS UNAVAILABLE: 2D FALLBACK.',
    '// WEBGL ПОМИЛКА: 2D-FALLBACK.':'// WEBGL ERROR: 2D FALLBACK.',
    /* відео, роботи */
    '/05 — Відео виробництва':'/05 — Factory video','ЯК НАРОДЖУЄТЬСЯ':'HOW A PIPE','ТРУБА_':'IS BORN_',
    '⏱ 90 С • ЦЕХ, ЛЬВІВ • СУБТИТРИ UA • WEBM/MP4':'⏱ 90S • PLANT, LVIV • SUBTITLES: EN • WEBM/MP4',
    '/05.1 — Транскрипт':'/05.1 — Transcript',
    'ЗАЛИВАЄМО ППУ МІЖ СТАЛЕВОЮ ТРУБОЮ ТА ОБОЛОНКОЮ, ОДРАЗУ МОНТУЄМО КАБЕЛІ ДКМ. КОЖНА ПАРТІЯ — ГІДРОВИПРОБУВАННЯ.':'WE POUR PU FOAM BETWEEN THE STEEL PIPE AND THE CASING AND FIT THE MONITORING WIRES AT ONCE. EVERY BATCH IS PRESSURE-TESTED.',
    'Всі відео ↗':'All videos ↗','Немає відео.':'No video support.','Завантажити MP4':'Download MP4',
    '/06 — Вибрані роботи':'/06 — Selected works','ОБʼЄКТИ, ЩО ВЖЕ':'PROJECTS ALREADY','ПРАЦЮЮТЬ_':'RUNNING_',
    'ВІННИЦЯ // ТЕПЛОМЕРЕЖІ':'VINNYTSIA // HEATING NETWORKS','РЕКОНСТРУКЦІЯ • −18% ВТРАТ':'RETROFIT • −18% LOSSES',
    '4,2 КМ':'4.2 KM','ЛУЦЬК // ГВП + ІТП':'LUTSK // DHW + SUBSTATIONS','ПУСК ЗА 21 ДЕНЬ':'STARTUP IN 21 DAYS','1,8 КМ':'1.8 KM',
    'МИКОЛАЇВ × UNOPS':'MYKOLAIV × UNOPS','ВОДА • 100% ПАСПОРТИ ДКМ':'WATER • 100% MONITORING RECORDS','6,5 КМ':'6.5 KM',
    'ЖИТОМИРЩИНА // МАГІСТРАЛЬ':'ZHYTOMYR REGION // MAIN LINE','ППУ В МЕТАЛІ':'FOAM IN STEEL CASING','Ø 1200':'Ø 1200',
    /* менеджер, faq, заявка */
    '/07 — Менеджер області':'/07 — Regional manager','ОБЕРИ ОБЛАСТЬ.':'PICK A REGION.','ОТРИМАЙ ІНЖЕНЕРА_':'GET YOUR ENGINEER_',
    'ПРЯМИЙ ТЕЛЕФОН БЕЗ КОЛ-ЦЕНТРУ. 25 ОБЛАСТЕЙ.':'DIRECT LINE, NO CALL CENTER. 25 REGIONS.',
    'ОБЛАСТЬ':'REGION','— ОБЕРІТЬ —':'— SELECT —','МЕНЕДЖЕР НЕ ОБРАНИЙ':'NO MANAGER SELECTED','ОБЕРІТЬ ОБЛАСТЬ ЛІВОРУЧ':'SELECT A REGION ON THE LEFT',
    '/08 — FAQ інженерів':'/08 — Engineersʼ FAQ','ПИТАННЯ // ВІДПОВІДІ_':'QUESTIONS // ANSWERS_',
    'ЯКІ ДІАМЕТРИ ВИРОБЛЯЄТЕ?':'WHAT DIAMETERS DO YOU MAKE?',
    'ПЕ: Ø 32–1020. МЕТАЛ (НАДЗЕМНО): ДО Ø 1200. ФАСОНКА — КОЛІНА, ТРІЙНИКИ, КОМПЕНСАТОРИ.':'PE: Ø 32–1020. STEEL (ABOVE GROUND): UP TO Ø 1200. FITTINGS — ELBOWS, TEES, EXPANSION JOINTS.',
    'ЯК ПРАЦЮЄ ДКМ?':'HOW DOES MONITORING WORK?',
    '2 МІДНІ ПРОВІДНИКИ В ППУ ФІКСУЮТЬ ЗВОЛОЖЕННЯ. СТАЦІОНАРНИЙ ДЕТЕКТОР АБО ПЕРЕНОСНИЙ ПРИЛАД + ПАСПОРТИ.':'TWO COPPER CONDUCTORS IN THE FOAM DETECT MOISTURE. FIXED DETECTOR OR HANDHELD METER, PLUS TEST RECORDS.',
    'СТРОКИ ВИГОТОВЛЕННЯ?':'WHAT ARE LEAD TIMES?','Які строки виготовлення і поставки?':'What are production and delivery times?',
    'СТАНДАРТ — ВІД 7 ДНІВ. НЕСТАНДАРТ/≥630 — 2–4 ТИЖНІ. УКРАЇНА — СВІЙ АВТОПАРК, ЕКСПОРТ — EXW/DAP.':'STANDARD — FROM 7 DAYS. CUSTOM/≥630 — 2–4 WEEKS. UKRAINE — OWN FLEET, EXPORT — EXW/DAP.',
    'ШЕФ-МОНТАЖ Є?':'DO YOU OFFER SUPERVISION?','Чи робите шеф-монтаж?':'Do you supervise installation?',
    'ТАК. ІНЖЕНЕР НА ОБʼЄКТІ: СТИКИ, ДКМ, ВИПРОБУВАННЯ. АБО ПОВНИЙ МОНТАЖ ПІД КЛЮЧ (50+/РІК).':'YES. AN ENGINEER ON SITE: JOINTS, MONITORING, TESTING. OR FULL TURNKEY INSTALLATION (50+/YEAR).',
    '/09 — Заявка':'/09 — Request','ЗАЛИШ ЗАЯВКУ.':'SEND A REQUEST.','ВІДПОВІМО ЗА 40 ХВ_':'WE REPLY IN 40 MIN_',
    'ПН–ПТ 9–18. КРЕСЛЕННЯ — ІНЖЕНЕРУ. РЕФЕРЕНСИ — ДИРЕКТОРУ. PDF/ДБН — ТЕНДЕРУ.':'MON–FRI 9–18. DRAWINGS FOR ENGINEERS. REFERENCES FOR DIRECTORS. PDF/STANDARDS FOR TENDERS.',
    'СЕРЕДНІЙ ЧАС ВІДПОВІДІ — 40 ХВ':'AVERAGE RESPONSE — 40 MIN','ІМʼЯ *':'NAME *','ТЕЛЕФОН *':'PHONE *',
    'ОБЛАСТЬ *':'REGION *','ПОВІДОМЛЕННЯ':'MESSAGE','Олександр, інженер ТКЕ':'Oleksandr, DHE engineer',
    'Ø 273, ПЕ, 800 м, шеф-монтаж':'Ø 273, PE, 800 m, supervision','Надіслати заявку ↗':'Send request ↗','✈ Telegram-бот':'✈ Telegram bot',
    '> ПОМИЛКА: ВКАЖІТЬ ІМʼЯ.':'> ERROR: ENTER YOUR NAME.','> ПОМИЛКА: ТЕЛЕФОН +380 (__) ___-__-__.':'> ERROR: PHONE MUST BE +380 (__) ___-__-__.',
    '> ПОМИЛКА: ОБЕРІТЬ ОБЛАСТЬ.':'> ERROR: SELECT A REGION.',
    '> ДОСТУП ДОЗВОЛЕНО. ЗАЯВКУ №{n} ПРИЙНЯТО ({r}).':'> ACCESS GRANTED. REQUEST №{n} ACCEPTED ({r}).',
    /* доки, uikit */
    '/10 — Техдокументація':'/10 — Docs','ІНЖЕНЕРУ.':'FOR ENGINEERS.','МОНТАЖНИКУ.':'FOR INSTALLERS.','ЗАМОВНИКУ_':'FOR CLIENTS_',
    'ІНЖЕНЕРУ':'ENGINEERS','МОНТАЖНИКУ':'INSTALLERS','ЗАМОВНИКУ':'CLIENTS',
    'КРЕСЛЕННЯ, 3D-STEP, ДКМ-СХЕМИ, ДБН В.2.5-39.':'DRAWINGS, 3D-STEP, MONITORING DIAGRAMS, DBN V.2.5-39.',
    'СТИКИ, МУФТИ, КОНТРОЛЬ ДКМ, ШЕФ-МОНТАЖ.':'JOINTS, SLEEVES, MONITORING CHECKS, SUPERVISION.',
    'СПЕЦИФІКАЦІЇ, ISO 9001, РЕФЕРЕНС UNOPS.':'SPECS, ISO 9001, UNOPS REFERENCES.',
    '→ ЗАПРОСИТИ DWG':'→ REQUEST DWG','→ ДО ІНСТРУКЦІЙ':'→ TO GUIDES','→ ЗАПРОСИТИ PDF':'→ REQUEST PDF',
    '/11 — UI-kit // Фірмові кольори з лого':'/11 — UI kit // Brand colors from the logo',
    'RED #E53312 — CTA / АКЦЕНТ':'RED #E53312 — CTA / ACCENT','INK #0C1B2A — ТЕКСТ / ТЕРМІНАЛ':'INK #0C1B2A — TEXT / TERMINAL',
    'BG #F3F4F6 — ФОН':'BG #F3F4F6 — BACKGROUND','Синя':'Blue','Червона':'Red',
    'ДИСПЛЕЙ — OSWALD (КИРИЛИЦЯ). ФАКТИ — JETBRAINS MONO 10.5–12PX. ТЕКСТ — INTER 15–17PX. КНОПКИ КВАДРАТНІ. СІТКА + ХРЕСТИКИ + СТАТУС-БАРИ.':'DISPLAY — OSWALD (CYRILLIC). FACTS — JETBRAINS MONO 10.5–12PX. BODY — INTER 15–17PX. SQUARE BUTTONS. GRID + CROSSES + STATUS BARS.',
    /* products */
    '/ ГОЛОВНА / ПРОДУКЦІЯ':'/ HOME / PRODUCTS','НАША':'OUR','ПРОДУКЦІЯ_':'PRODUCTS_',
    'ДВА НАПРЯМИ: ТЕПЛОПОСТАЧАННЯ ТА ГВП // ВОДОПОСТАЧАННЯ ТА ВОДОВІДВЕДЕННЯ.':'TWO DIVISIONS: HEATING AND DHW // WATER AND SEWAGE.',
    '/01 — Теплопостачання та ГВП':'/01 — Heating and DHW','ТЕПЛО_':'HEAT_',
    'ДІАМЕТР 32/90–1220/1400 ММ. ТИСК PN≤2,5 МПА. ТЕМПЕРАТУРА T≤140 °C. ДСТУ Б В.2.5-31:2007.':'DIAMETER 32/90–1220/1400 MM. PRESSURE PN≤2.5 MPA. TEMP T≤140 °C. DSTU B V.2.5-31:2007.',
    'Труби і елементи із сталевою трубою в ПЕ-оболонці':'Pipes and fittings with steel carrier in PE casing','ПІДЗЕМНІ МЕРЕЖІ':'BURIED NETWORKS',
    'Труби і елементи із сталевою трубою в металевій оболонці':'Pipes and fittings with steel carrier in steel casing','НАДЗЕМНІ МЕРЕЖІ':'ABOVE-GROUND NETWORKS',
    'ФАСОНКА':'FITTINGS','Сальникові компенсатори':'Gland expansion joints','КОМПЕНСАЦІЯ':'EXPANSION',
    'ДУО':'TWIN','Двотрубні теплоізольовані системи':'Twin-pipe insulated systems','2×ТРУБА':'2×PIPE',
    'PE-RT':'PE-RT','Системи труб для ГВП (PE-RT)':'DHW pipe systems (PE-RT)','ГАРЯЧА ВОДА':'HOT WATER',
    'СДКМ':'SDCM','Система ДКМ':'Monitoring system (SDCM)','2×Cu':'2×Cu',
    'ЗʼЄМНА':'REMOVABLE','Системи зʼємної ізоляції з мінеральної вати':'Removable mineral-wool insulation','БАЗАЛЬТ':'BASALT',
    'ПО МІСЦЮ':'ON-SITE','Система ізоляції по місцю':'On-site insulation system','ІСНУЮЧІ МЕРЕЖІ':'EXISTING NETWORKS',
    'СЕНДВІЧ':'SANDWICH','Високотемпературна «сендвіч»':'High-temp “sandwich” insulation','ЕР-1К':'ER-1K',
    'ГНУЧКІ':'FLEXIBLE','Гнучкі ППУ CALPEX PUR-KING':'Flexible CALPEX PUR-KING PU pipes','BRUGG':'BRUGG',
    'АРМАТУРА':'VALVES','Арматура Vexve':'Vexve valves','КУЛЬОВІ КРАНИ':'BALL VALVES',
    '/02 — Водопостачання та водовідведення':'/02 — Water supply and sewage','ВОДА_':'WATER_',
    'ПЕ Ø20–315':'PE Ø20–315','Труби напірні та елементи поліетиленові':'PE pressure pipes and fittings','НАПІРНІ МЕРЕЖІ':'PRESSURE NETWORKS',
    'HYDROMAN':'HYDROMAN','Резервуари полімерні стільникові для води':'Structured-wall polymer water tanks','ЗБЕРІГАННЯ':'STORAGE',
    'Ø600–3000':'Ø600–3000','Труби Hydroman Pipe® стільникові':'Hydroman Pipe® structured-wall pipes','КОЛЕКТОРИ':'COLLECTORS',
    'ККП':'SEWER PITS','Колодязі каналізаційні стільникові':'Structured-wall sewer manholes','КАНАЛІЗАЦІЯ':'SEWAGE',
    'КВП':'WATER PITS','Колодязі водопровідні + протипожежні':'Water and fire-service pits','ВОДОПРОВІД':'WATER MAINS',
    'LIGHT':'LIGHT','Труби Hydroman Pipe® Light':'Hydroman Pipe® Light pipes','ЛЕГКІ':'LIGHTWEIGHT',
    'Каналізаційні насосні станції':'Sewage pump stations','ПЕРЕКАЧКА':'PUMPING',
    '75–12000':'75–12000','Очисні споруди блочно-модульні, м³/добу':'Containerised treatment plants, m³/day','БМ КОС':'CONTAINERISED',
    'BIO':'BIO','Локальні очисні HYDROMAN Bio®':'HYDROMAN Bio® package plants','АВТОНОМНІ':'OFF-GRID',
    'ЖИР':'GREASE','Сепаратори жирів у ПЕ-корпусах':'Grease separators in PE housings','ХОРЕКА':'HORECA',
    'НАФТА':'OIL','Сепаратори нафтопродуктів, дощові стоки':'Oil separators, stormwater','АЗС/ПАРКІНГИ':'FUEL STATIONS / PARKING',
    'РЕКОНСТР.':'RETROFIT','Реконструкція каналізаційних очисних споруд':'Wastewater plant retrofit','МОДЕРНІЗАЦІЯ':'UPGRADE',
    'ФЛОТАТОР':'FLOTATION','Флотатори напірні з сатуратором':'Dissolved-air flotation units','ПРОМСТОКИ':'INDUSTRIAL EFFLUENT',
    'КІЛЬЦЯ':'RINGS','Кільця ковзні центрувальні':'Centring spacer rings','ФУТЛЯРИ':'CASINGS',
    'ПП ≤80':'PP ≤80','Резервуари поліпропіленові зварні, м³':'Welded polypropylene tanks, m³','ЄМНОСТІ':'TANKS',
    'ГОФРА':'CORRUGATED','Труби Hydroman Goffer Pipe® гофровані':'Hydroman Goffer Pipe® corrugated pipes','БЕЗНАПІРНІ':'GRAVITY',
    'Каталоги PDF ↗':'PDF catalogs ↗','Запитати менеджера ↗':'Ask a manager ↗',
    /* services */
    '/ ГОЛОВНА / ПОСЛУГИ':'/ HOME / SERVICES','НАШІ':'OUR','ПОСЛУГИ_':'SERVICES_',
    'ПРОЄКТУЄМО. МОНТУЄМО. ПІД КЛЮЧ. ВІД ТЕО ДО ПУСКУ.':'WE DESIGN. WE BUILD. TURNKEY. FROM FEASIBILITY TO STARTUP.',
    '/01 — Проєктування':'/01 — Design','ПРОЄКТ_':'DESIGN_','30+ НА РІК':'30+ PER YEAR',
    'ПОВНИЙ КОМПЛЕКС ПРОЄКТНИХ РОБІТ УСІХ СТАДІЙ (ТЕО, ТЕР, ЕП, П, РП, Р) ДЛЯ ОБʼЄКТІВ І МЕРЕЖ КЛАСІВ НАСЛІДКІВ СС1, СС2, СС3. ЗБІР ДАНИХ, ЕКСПЕРТИЗА, АВТОРСЬКИЙ НАГЛЯД. 38 ФАХІВЦІВ.':'FULL DESIGN CYCLE (FEASIBILITY TO WORKING DOCS) FOR CC1–CC3 SITES AND NETWORKS. DATA, REVIEW, SITE SUPERVISION. 38 SPECIALISTS.',
    'ПРОЄКТІВ / РІК':'PROJECTS / YEAR','КЛАСИ СС':'CC CLASSES','1–3':'1–3','СТАДІЇ':'STAGES','ТЕО–Р':'FS–WD',
    'ТЕПЛО':'HEAT','Котельні з енергозберігаючим обладнанням; мережі ППУ з ДКМ; ІТП/ЦТП з авторегулюванням і обліком':'Boiler houses with efficient equipment; PU-foam networks with monitoring; substations with controls and metering',
    'П + РП + Р':'D + WD','ВОДА':'WATER','Водозабезпечення і водовідведення промислових, житлових, громадських обʼєктів':'Water and sewage for industrial, residential and public sites',
    'СТОКИ':'EFFLUENT','Госп-побутові, промислові, дощові очисні; підземні/поверхневі води для питного водопостачання':'Domestic, industrial and stormwater treatment; groundwater/surface water for drinking supply',
    'ТЕО → Р':'FS → WD','АУДИТ':'AUDIT','Енергоаудит; концепції теплопостачання; оптимізація водопостачання/водовідведення':'Energy audits; heating concepts; water system optimisation','РЕКОМЕНДАЦІЇ':'RECOMMENDATIONS',
    'ДОДАТКОВО':'EXTRA','Станції біоочистки власної розробки; підбір обладнання; кошторис очисного комплексу':'In-house bio-treatment units; equipment selection; plant costing','ПІД КЛЮЧ':'TURNKEY',
    '/02 — Монтаж':'/02 — Installation','МОНТАЖ_':'INSTALLATION_','50+ НА РІК':'50+ PER YEAR',
    'БУДІВНИЦТВО І МОНТАЖ НОВИХ ОБʼЄКТІВ. РЕКОНСТРУКЦІЯ ІСНУЮЧИХ. ГЕНПІДРЯД. ЛІЦЕНЗІЯ НА БМР АЕ № 640955 (ДАБІ УКРАЇНИ). 47 ФАХІВЦІВ.':'NEW BUILDS AND INSTALLATION. RETROFIT OF EXISTING SITES. GENERAL CONTRACTING. LICENCE AE № 640955. 47 SPECIALISTS.',
    'БУДІВНИЦТВО':'CONSTRUCTION','Котельні, промобʼєкти, теплотраси, теплогідроізоляція стиків, каналізаційні/газові мережі, очисні, насосні':'Boiler houses, industrial sites, heating mains, joint insulation, sewer/gas networks, treatment plants, pump stations',
    '0-ЦИКЛ → ПУСК':'GROUND-UP → STARTUP','МОНТАЖ':'INSTALLATION','СДКМ трубопроводів; ІТП/ЦТП + пусконаладка; зʼємна ізоляція надземних труб, газоходів, ємностей':'Pipeline monitoring; substations + commissioning; removable insulation for pipes, flues, tanks',
    'РЕКОНСТРУКЦІЯ':'RETROFIT','Переоснащення ІТП/ЦТП і котелень; модернізація тепломереж':'Substation and boiler-house upgrades; network modernisation','ДІЮЧІ ОБʼЄКТИ':'LIVE SITES',
    'Замовити монтаж ↗':'Order installation ↗','Дивитись обʼєкти':'See projects',
    /* portfolio + press */
    '/ ГОЛОВНА / ПОРТФОЛІО':'/ HOME / PORTFOLIO','ПОРТФОЛІО_':'PORTFOLIO_',
    '10 КЕЙСІВ З РЕАЛЬНОГО САЙТУ. ТЕПЛО, ВОДА, ЕКСПОРТ.':'10 CASES FROM THE LIVE SITE. HEAT, WATER, EXPORT.',
    '/01 — Вибрані роботи':'/01 — Selected works',
    'СКОЛЕ // НЕГАБАРИТНИЙ РЕЗЕРВУАР':'SKOLE // OVERSIZED TANK','ПОСТАВКА + ЛОГІСТИКА ВЕЛИКОГАБАРИТУ':'DELIVERY + HEAVY LOGISTICS',
    'ЖИТОМИРЩИНА // ТЕПЛОТРАСА В МЕТАЛІ':'ZHYTOMYR REGION // STEEL-CASED MAIN','ППУ В МЕТАЛЕВІЙ ОБОЛОНЦІ':'FOAM IN STEEL CASING',
    'МИКОЛАЇВ × UNOPS // ВОДА':'MYKOLAIV × UNOPS // WATER','МІЖНАРОДНА СПІВПРАЦЯ, ВІДНОВЛЕННЯ МІСТ':'INTERNATIONAL AID, CITY RECOVERY',
    'МИКОЛАЇВ // ДНІПРОВСЬКА':'MYKOLAIV // DNIPROVSKA ST.','РЕКОНСТРУКЦІЯ ТЕПЛОМЕРЕЖ':'HEATING NETWORK RETROFIT',
    'БОРОДЯНКА // ВОДОПОСТАЧАННЯ':'BORODIANKA // WATER SUPPLY','ВИРОБИ ДЛЯ СИСТЕМ ОЧИЩЕННЯ ВОДИ':'PARTS FOR WATER TREATMENT SYSTEMS',
    'КАТЕРИНІВКА // ОЧИСНІ СПОРУДИ':'KATERYNIVKA // TREATMENT PLANT','ВИГОТОВЛЕННЯ + МОНТАЖ ДЛЯ ГРОМАДИ':'BUILT AND INSTALLED FOR THE COMMUNITY',
    'ВІННИЦЯ // КЕЛЕЦЬКА 113А, ЦТП-8/1':'VINNYTSIA // KELETSKA 113A, SUBSTATION 8/1','РЕКОНСТРУКЦІЯ МЕРЕЖ ГВП, КП ВМР':'DHW NETWORK RETROFIT, MUNICIPAL UTILITY',
    'СЛОВАЧЧИНА // ЕКСПОРТ':'SLOVAKIA // EXPORT','ТЕПЛОІЗОЛЬОВАНІ ТРУБИ ЗА КОРДОН':'INSULATED PIPES ABROAD',
    'ДУБЛЯНИ // ЛОГІСТИЧНИЙ ЦЕНТР':'DUBLIANY // LOGISTICS HUB','КОМПЛЕКСНА ПОСТАВКА ПІД КЛЮЧ':'TURNKEY PACKAGE SUPPLY',
    'ХМЕЛЬНИЦЬКИЙ // ТЕНДЕР ТКЕ':'KHMELNYTSKYI // DHE TENDER','КОНТРАКТ З МКП «ХМЕЛЬНИЦЬКТЕПЛОКОМУНЕНЕРГО»':'CONTRACT WITH THE MUNICIPAL HEATING UTILITY',
    'Прес-центр ↗':'Press centre ↗','Хочу так само ↗':'I want the same ↗',
    '/ ГОЛОВНА / ПРЕС-ЦЕНТР':'/ HOME / PRESS','ПРЕС-':'PRESS','ЦЕНТР_':'CENTRE_',
    'НОВИНИ КОРПОРАЦІЇ. ДЖЕРЕЛО: ENERGORESURS.COM.':'CORPORATE NEWS. SOURCE: ENERGORESURS.COM.',
    '/01 — Стрічка 2026':'/01 — 2026 feed',
    'Форум PIGS FARMING INDUSTRY 2026, Львів — свинарство, виклики, техрішення':'PIGS FARMING INDUSTRY 2026 forum, Lviv — pig production, challenges, tech','ФОРУМ':'FORUM',
    'Оборотне водопостачання кліматично-нейтрального автономного виробництва':'Recirculating water for climate-neutral autonomous production','АНАЛІТИКА':'INSIGHT',
    'Скрубери для обʼєкта у Городку на Львівщині — очищення повітря':'Scrubbers for a Horodok site, Lviv region — air treatment','ВИРОБНИЦТВО':'PRODUCTION',
    'Реконструкція тепломереж у Вінниці — нова теплоізоляція на існуючих трубах':'Vinnytsia retrofit — new insulation on existing pipes',
    'Фінансова звітність за 2025 рік — оприлюднено за законом':'2025 financial statements — disclosed by law','ЗВІТНІСТЬ':'REPORTING',
    'ГВП для Луцька: PE-RT труби + гнучкі Brugg — енергоефективна гаряча вода':'DHW for Lutsk: PE-RT pipes + Brugg flex — efficient hot water','ГВП':'DHW',
    'Поставки труб Ø 1020/1200 мм для міських комунікацій':'Ø 1020/1200 mm deliveries for city utilities','МАГІСТРАЛІ':'MAINS',
    'Весна — найкращий час для локальних очисних споруд':'Spring is the best time for package treatment plants',
    'Локальні очисні для приватних будинків — комфорт та екологія':'Package plants for homes — comfort and ecology',
    'Кінець опалювального сезону — час модернізації тепломереж':'Heating season over — time to upgrade networks',
    'Оригінал стрічки ↗':'Original feed ↗','[ До портфоліо ]':'[ To portfolio ]',
    /* docs */
    '/ ГОЛОВНА / ДОКУМЕНТАЦІЯ':'/ HOME / DOCS','ТЕХДОКУ-':'TECHNICAL','МЕНТАЦІЯ_':'DOCS_',
    'ПРОЄКТАНТАМ // МОНТАЖНИКАМ // ЗАМОВНИКАМ. ПРЯМІ PDF.':'FOR DESIGNERS // INSTALLERS // CLIENTS. DIRECT PDFS.',
    '/01 — Проєктантам · 9 каталогів':'/01 — For designers · 9 catalogs',
    'Труби ППУ з подвійною сталевою трубою в ПЕ':'Twin-steel PU-foam pipes in PE',
    'Труби зі сталевою трубою в ПЕ-оболонці (2022)':'Steel-carrier pipes in PE casing (2022)',
    'Труби і вироби з ПЕ для води і каналізації (2026)':'PE pipes and parts for water and sewage (2026)',
    'Труби зі сталевою трубою в металевій оболонці (спіро)':'Steel-carrier pipes in spiral steel casing',
    'Прилади СДКМ трубопроводів':'Pipeline monitoring instruments (SDCM)',
    'Труби з PE-RT трубою в ПЕ-оболонці':'PE-RT carrier pipes in PE casing',
    'Рекомендації з проєктування СДКМ тепломереж':'Heating-network monitoring design guide',
    'Гнучкі труби CALPEX (2026)':'CALPEX flexible pipes (2026)',
    'Гнучкі труби ARMOPEX® (2026)':'ARMOPEX® flexible pipes (2026)',
    '/02 — Монтажникам · 12 інструкцій':'/02 — For installers · 12 guides',
    'ЕР-1':'ER-1','Ізоляція стиків надземних мереж':'Joint insulation, above-ground networks',
    'ЕР-1К':'ER-1K','Ізоляція стиків, теплоізоляція «сендвіч»':'Joint insulation, “sandwich” type',
    'ЕР-3':'ER-3','Стики підземних мереж термоусадковою муфтою':'Buried joints, heat-shrink sleeves',
    'ЕР-4':'ER-4','Стики електрозварною муфтою':'Electrofusion sleeve joints',
    'Зварювання труб PE-RT':'PE-RT pipe welding','Монтаж системи ДКМ тепломереж':'Heating-network monitoring installation',
    'ФУТЛЯР':'CASING','Монтаж труб у футлярі':'Cased-pipe installation',
    'Проєктування і монтування КНС':'SPS design and installation',
    'РЕЗЕРВ.':'TANKS','Монтаж ПЕ-резервуарів і безнапірних труб':'PE tank and gravity-pipe installation',
    'ЗЕМЛЯНІ':'EARTHWORKS','Вантажно-розвантажувальні, земляні, монтажні роботи':'Handling, earthworks and installation',
    'ГІДРО-ПІД':'HYDRO-BURIED','Гідроізоляція закінчень підземних трубопроводів':'Waterproofing buried pipe ends',
    'ГІДРО-НАД':'HYDRO-ABOVE','Гідроізоляція закінчень надземних трубопроводів':'Waterproofing above-ground pipe ends',
    '/03 — Замовникам':'/03 — For clients',
    'Hydroman Goffer Pipe® — гофровані для безнапірної каналізації':'Hydroman Goffer Pipe® — corrugated for gravity sewers',
    'Нові техрішення для КОС і каналізування':'New solutions for treatment plants and sewers',
    'Сальникові компенсатори для тепломереж':'Gland expansion joints for heating networks',
    'БМ каналізаційні очисні':'Containerised sewage treatment plants','Буклет корпорації':'Corporate brochure',
    'Hydroman Pipe® Light — структурована стінка':'Hydroman Pipe® Light — structured wall',
    'Технічна пропозиція 2020':'2020 technical proposal','Теплогідроізоляція існуючих трубопроводів':'Insulating existing pipelines',
    'Кільця ковзні':'Spacer rings','Локальні очисні HYDROMAN':'HYDROMAN package plants',
    'Труби з провідною трубою PE-RT':'PE-RT carrier pipes','Щит управління (шафа)':'Control cabinet',
    'Подвійні теплоізольовані труби':'Twin insulated pipes','Аератори':'Aerators','Резервуари полімерні':'Polymer tanks',
    'Каналізаційні насосні станції':'Sewage pump stations','Реконструкція КОС':'Treatment plant retrofit',
    'Полімерні труби стільникові':'Structured-wall polymer pipes','Сепаратор жирів':'Grease separator',
    'Сепаратор нафтопродуктів':'Oil separator','Флотатор':'Flotation unit',
    'Циліндри і півциліндри з базальтової вати':'Basalt-wool cylinders and half-shells',
    'CALPEX PUR-KING UNO/DUO, BRUGG (Швейцарія)':'CALPEX PUR-KING UNO/DUO, BRUGG (Switzerland)',
    'ПЕРЕГЛЯНУТИ ⬇':'VIEW ⬇',
    /* about */
    '/ ГОЛОВНА / ПРО КОМПАНІЮ':'/ HOME / ABOUT','З 1996_':'SINCE 1996_','І ДОСІ №1':'STILL №1',
    'ПЕРШЕ В УКРАЇНІ ВИРОБНИЦТВО ППУ-ТРУБ. ОДНЕ З НАЙБІЛЬШИХ У СХІДНІЙ ЄВРОПІ.':'UKRAINEʼS FIRST PU-FOAM PIPE PLANT. AMONG EASTERN EUROPEʼS LARGEST.',
    '/01 — Президент корпорації':'/01 — Corporation president',
    '«ОКРІМ МОДЕРНІЗАЦІЇ ПОТУЖНОСТЕЙ МИ ВТІЛЮЄМО НОВІ ПРОЄКТИ — ЦЕ ТРИМАЄ НАС ЛІДЕРАМИ В УКРАЇНІ І РОБИТЬ СИЛЬНІШИМИ НА ГЛОБАЛЬНОМУ РИНКУ»':'“BEYOND UPGRADING CAPACITY WE LAUNCH NEW PROJECTS — THAT KEEPS US LEADING IN UKRAINE AND STRONGER GLOBALLY”',
    'ІВАН НІРОНОВИЧ — ЛАУРЕАТ ДЕРЖПРЕМІЇ УКРАЇНИ В ГАЛУЗІ НАУКИ І ТЕХНІКИ, ЗАСЛУЖЕНИЙ ЕНЕРГЕТИК УКРАЇНИ.':'IVAN NIRONOVYCH — LAUREATE OF UKRAINEʼS STATE PRIZE IN SCIENCE AND TECHNOLOGY, HONOURED POWER ENGINEER OF UKRAINE.',
    '/02 — Історія досвіду':'/02 — Track record',
    'Перше в Україні виробництво труб з ППУ-ізоляцією. Держпроєкт «Регіональний центр теплогідроізоляції труб»':'Ukraineʼs first PU-foam pipe production. State project “Regional Pipe Insulation Centre”','СТАРТ':'START',
    'Перші українські стандарти, зокрема ДСТУ 34-204-88-002-98 на ППУ-труби в ПЕ-оболонці':'First Ukrainian standards incl. DSTU 34-204-88-002-98 for PU pipes in PE casing','СТАНДАРТ':'STANDARD',
    'Система якості за ДСТУ ISO 9001':'Quality system to DSTU ISO 9001','ЯКІСТЬ':'QUALITY',
    'Сертифікація ISO 9001:2000 — Bureau Veritas, Велика Британія':'ISO 9001:2000 certification — Bureau Veritas, UK','СЕРТИФІКАТ':'CERTIFICATE',
    'Перемога на конкурсі «100 кращих товарів України — 2003»':'Winner, “100 Best Goods of Ukraine — 2003”','НАГОРОДА':'AWARD',
    'Екструзійні лінії, термостійкі PE-RT труби для ГВП':'Extrusion lines, heat-resistant PE-RT pipes for DHW',
    'Технології очистки, перші блочно-модульні очисні споруди':'Treatment tech, first containerised treatment plants',
    'Санація колекторів стільниковими трубами власного виробництва':'Sewer renovation with own structured-wall pipes','РЕНОВАЦІЯ':'RENOVATION',
    'Самозатухаюча рецептура ПЕ — пожежна безпека оболонок':'Self-extinguishing PE recipe — casing fire safety','БЕЗПЕКА':'SAFETY',
    '/03 — Інновації · Сертифікати · Географія':'/03 — Innovation · Certificates · Geography',
    'Цех ізоляції магістралей до Ø 1200; сильфонні компенсатори, термоусадкові/електрозварні муфти; екструзія ПЕ-оболонок':'Main-line insulation shop up to Ø 1200; bellows joints, heat-shrink/electrofusion sleeves; PE casing extrusion',
    '3+ ТЕХНОЛОГІЙ/РІК':'3+ TECHNOLOGIES/YEAR','ISO':'ISO',
    'ISO 9001:2015 (UKR/ENG), ISO 14001, Bureau Veritas, Euroheat & Power':'ISO 9001:2015 (UKR/ENG), ISO 14001, Bureau Veritas, Euroheat & Power','СЕРТИФІКАТИ':'CERTIFICATES',
    '20+':'20+','Патенти України: № 45418, 54139, 74342, 81988, 92562, 96998 … 148097':'Ukrainian patents: Nos. 45418, 54139, 74342, 81988, 92562, 96998 … 148097','ПАТЕНТИ':'PATENTS',
    '9 КРАЇН':'9 COUNTRIES','Польща, Молдова, Білорусь, Казахстан, Нідерланди, Велика Британія, Румунія, Болгарія, Словаччина. Експорт ≥10% навіть у кризу':'Poland, Moldova, Belarus, Kazakhstan, Netherlands, UK, Romania, Bulgaria, Slovakia. Exports ≥10% even in crisis','ЕКСПОРТ':'EXPORT',
    '6 ГАЛУЗЕЙ':'6 SECTORS','Теплоенергетика · Вода і каналізація · Нафтогаз · Житлова/промислова інфраструктура · Харчопереробка · Агро':'Heat and power · Water and sewage · Oil and gas · Residential/industrial infrastructure · Food processing · Agri','РИНКИ':'MARKETS',
    'Наші обʼєкти ↗':'Our projects ↗','Співпраця ↗':'Partner with us ↗',
    /* contacts */
    '/ ГОЛОВНА / КОНТАКТИ':'/ HOME / CONTACTS','КОНТАКТИ_':'CONTACTS_',
    'ПН–ПТ 9:00–18:00. ВІДПОВІДАЄМО ЗА 40 ХВ.':'MON–FRI 9:00–18:00. WE REPLY IN 40 MIN.',
    '/01 — Офіси та виробництво':'/01 — Offices and plant','HQ':'HQ','ЛЬВІВ · ЗЕЛЕНА 131':'LVIV · ZELENA 131',
    '79035, вул. Зелена, 131':'79035, ZELENA ST. 131','ЦЕХ':'PLANT','ЛЬВІВ · БОГДАНІВСЬКА':'LVIV · BOHDANIVSKA',
    '79024, вул. Богданівська, 42/13':'79024, BOHDANIVSKA ST. 42/13','Виробництво ППУ-труб':'PU-foam pipe plant','Відвантаження 24/7':'Dispatch 24/7',
    'KYIV':'KYIV','КИЇВ · БЕРКОВЕЦЬКА 1':'KYIV · BERKOVETSKA 1','03062, офіс 510':'03062, OFFICE 510',
    'Проєктний офіс':'Design office','Тендерний супровід':'Tender support','→ НАПИСАТИ В ОФІС':'→ MESSAGE THE OFFICE',
    '→ НАПИСАТИ В ЦЕХ':'→ MESSAGE THE PLANT','→ НАПИСАТИ В КИЇВ':'→ MESSAGE KYIV',
    'ZP':'ZP','ЗАПОРІЖЖЯ':'ZAPORIZHZHIA','69063, вул. Святого Миколая, 42, оф. 25':'69063, SVIATOHO MYKOLAIA ST. 42, OFF. 25',
    '→ НАПИСАТИ':'→ MESSAGE','MAIL':'MAIL','ПОШТА':'EMAIL','→ НАПИСАТИ ЛИСТА':'→ SEND A LETTER',
    'SOC':'SOC','СОЦМЕРЕЖІ':'SOCIAL','YouTube — виробництво':'YouTube — production','Facebook — новини':'Facebook — news',
    '→ ПІДПИСАТИСЬ':'→ FOLLOW','/02 — Регіональні менеджери · 25':'/02 — Regional managers · 25',
    'ОБЕРИ ОБЛАСТЬ.':'PICK A REGION.','ОТРИМАЙ ІНЖЕНЕРА_':'GET YOUR ENGINEER_',
    '/03 — Форма':'/03 — Form','ВІДПРАВИТИ':'SEND','ЛИСТА_':'A MESSAGE_',
    'ДАНІ — ТІЛЬКИ ДЛЯ ВІДПОВІДІ НА ВАШЕ ПИТАННЯ. ПН–ПТ 9–18.':'DATA IS USED ONLY TO ANSWER YOU. MON–FRI 9–18.',
    'Повне імʼя':'Full name','Відправити листа ↗':'Send letter ↗','Ваш коментар':'Your message',
    /* titles + meta */
    'ЕНЕРГОРЕСУРС ІНВЕСТ — тепло і вода для міст | Львів, з 1996':'ENERGORESURS INVEST — heat and water for cities | Lviv, since 1996',
    'Предизольовані ППУ-труби в ПЕ та металевій оболонці, фасонні вироби, ДКМ, теплові пункти, КНС, резервуари. Проєктуємо, виробляємо у Львові, монтуємо по Україні.':'Pre-insulated PU-foam pipes in PE and steel casing, fittings, monitoring, substations, pump stations, tanks. Designed and made in Lviv, installed across Ukraine.',
    'Наша продукція — ЕНЕРГОРЕСУРС ІНВЕСТ | Тепло, ГВП, вода, каналізація':'Our products — ENERGORESURS INVEST | Heat, DHW, water, sewage',
    'Труби ППУ в ПЕ і металевій оболонці, ДКМ, PE-RT, CALPEX, КНС, очисні споруди HYDROMAN, резервуари. Повний каталог продукції корпорації.':'PU-foam pipes in PE and steel casing, monitoring, PE-RT, CALPEX, pump stations, HYDROMAN treatment, tanks. Full corporate catalog.',
    'Наші послуги — ЕНЕРГОРЕСУРС ІНВЕСТ | Проєктування 30+/рік, монтаж 50+/рік':'Our services — ENERGORESURS INVEST | Design 30+/yr, installation 50+/yr',
    'Проєктування СС1–СС3: котельні, тепломережі ППУ з ДКМ, ІТП/ЦТП, вода, очисні. Монтаж під ключ, ліцензія АЕ № 640955. Аудит, шеф-монтаж.':'CC1–CC3 design: boiler houses, PU-foam networks with monitoring, substations, water, treatment. Turnkey installation, licence AE № 640955. Audits, supervision.',
    'Портфоліо — ЕНЕРГОРЕСУРС ІНВЕСТ | Вінниця, Луцьк, Миколаїв × UNOPS':'Portfolio — ENERGORESURS INVEST | Vinnytsia, Lutsk, Mykolaiv × UNOPS',
    'Реалізовані проєкти: Вінниця ЦТП-8/1, Луцьк ГВП, Миколаїв UNOPS і Дніпровська, Житомирщина, Сколе, Бородянка, Словаччина, Дубляни, Хмельницький.':'Delivered projects: Vinnytsia substation 8/1, Lutsk DHW, Mykolaiv UNOPS and Dniprovska, Zhytomyr region, Skole, Borodianka, Slovakia, Dubliany, Khmelnytskyi.',
    'Прес-центр — ЕНЕРГОРЕСУРС ІНВЕСТ | Новини 2026':'Press centre — ENERGORESURS INVEST | 2026 news',
    'Новини корпорації: PIGS FARMING 2026, скрубери Городок, Вінниця, Луцьк PE-RT, труби 1020/1200, локальні очисні споруди.':'Corporate news: PIGS FARMING 2026, Horodok scrubbers, Vinnytsia, Lutsk PE-RT, 1020/1200 pipes, package treatment plants.',
    'Технічна документація — ЕНЕРГОРЕСУРС ІНВЕСТ | Каталоги, інструкції ЕР-1…ЕР-4':'Technical docs — ENERGORESURS INVEST | Catalogs, ER-1…ER-4 guides',
    'Каталоги ППУ, PE-RT, CALPEX, ДКМ. Інструкції ЕР-1, ЕР-1к, ЕР-3, ЕР-4, СДКМ, КНС. Матеріали замовнику. Прямі PDF з energoresurs.com.':'PU-foam, PE-RT, CALPEX and monitoring catalogs. ER-1, ER-1K, ER-3, ER-4, SDCM and SPS guides. Client materials. Direct PDFs from energoresurs.com.',
    'Про компанію — ЕНЕРГОРЕСУРС ІНВЕСТ | З 1996 року, 400+ фахівців':'About — ENERGORESURS INVEST | Since 1996, 400+ specialists',
    'Історія 1996–2015: перші ППУ-труби України, ДСТУ, ISO 9001 Bureau Veritas, 100 кращих товарів. 400+ працівників, експорт 9 країн, 20+ патентів.':'1996–2015 history: Ukraineʼs first PU-foam pipes, DSTU standards, ISO 9001 by Bureau Veritas, 100 best goods. 400+ staff, 9 export countries, 20+ patents.',
    'Контакти — ЕНЕРГОРЕСУРС ІНВЕСТ | Львів, Київ, Запоріжжя, 25 менеджерів':'Contacts — ENERGORESURS INVEST | Lviv, Kyiv, Zaporizhzhia, 25 managers',
    'Офіси: Львів Зелена 131, Богданівська 42/13, Київ Берковецька 1, Запоріжжя. Телефони, email, форма заявки, регіональні менеджери 25 областей.':'Offices: Lviv Zelena 131 and Bohdanivska 42/13, Kyiv Berkovetska 1, Zaporizhzhia. Phones, email, request form, 25 regional managers.'
  };
  function norm(s){ return (s || '').replace(/\s+/g, ' ').trim(); }
  function t(key, params){
    var D = (typeof I18N === 'object' && I18N) ? I18N : {};
    var L = (typeof lang === 'string') ? lang : 'ua';
    var out = (L === 'en' && D[norm(key)] !== undefined) ? D[norm(key)] : key;
    if(params) Object.keys(params).forEach(function(p){ out = out.split('{' + p + '}').join(params[p]); });
    return out;
  }
  function regionName(ua){ return (lang === 'en' && REGION_EN[ua]) ? REGION_EN[ua] : ua; }
  function renderRegions(){
    [['regionSelect'], ['formRegion']].forEach(function(pair){
      var sel = $(pair[0]); if(!sel) return;
      var cur = sel.value;
      while(sel.options.length > 1) sel.remove(1);
      MANAGERS.forEach(function(m){
        var o = document.createElement('option'); o.value = m[0]; o.textContent = regionName(m[0]); sel.appendChild(o);
      });
      sel.value = cur;
    });
  }
  var TEXT_ATTRS = ['placeholder', 'aria-label', 'alt', 'label'];
  function walk(root){
    var skip = {SCRIPT:1, STYLE:1, NOSCRIPT:1};
    (function rec(node){
      if(node.nodeType === 3){
        var k = norm(node.nodeValue);
        if(!k || !node.parentNode) return;
        if(node._ua === undefined) node._ua = node.nodeValue;
        node.nodeValue = (lang === 'en' && I18N[k] !== undefined) ? I18N[k] : node._ua;
      }else if(node.nodeType === 1){
        if(skip[node.tagName] || node.id === 'annotLayer' || node.id === 'leaderSvg') return;
        TEXT_ATTRS.forEach(function(a){
          if(node.hasAttribute && node.hasAttribute(a)){
            var ak = '_ua_' + a;
            if(node[ak] === undefined) node[ak] = node.getAttribute(a);
            var kk = norm(node[ak]);
            node.setAttribute(a, (lang === 'en' && I18N[kk] !== undefined) ? I18N[kk] : node[ak]);
          }
        });
        var ch = node.childNodes;
        for(var i = 0; i < ch.length; i++) rec(ch[i]);
      }
    })(root);
  }
  var themeBtn = null;
  function paintThemeBtn(){
    if(themeBtn) themeBtn.innerHTML = (document.documentElement.getAttribute('data-theme') === 'dark' ? '◑ ' : '◐ ') + t('ТЕМА');
  }
  function setTheme(th){
    document.documentElement.setAttribute('data-theme', th);
    try{ localStorage.setItem(THEME_KEY, th); }catch(e1){}
    try{ document.documentElement.style.colorScheme = (th === 'dark') ? 'dark' : 'light'; }catch(e2){}
    paintThemeBtn();
  }
  function setLang(l){
    lang = l;
    try{ localStorage.setItem(LANG_KEY, l); }catch(e3){}
    document.documentElement.lang = (l === 'en') ? 'en' : 'uk';
    walk(document.body);
    if(window.__titleUa === undefined){
      window.__titleUa = document.title;
      var m0 = document.querySelector('meta[name="description"]');
      window.__descUa = m0 ? m0.getAttribute('content') : '';
    }
    document.title = (l === 'en' && I18N[norm(window.__titleUa)]) ? I18N[norm(window.__titleUa)] : window.__titleUa;
    var md = document.querySelector('meta[name="description"]');
    if(md) md.setAttribute('content', (l === 'en' && I18N[norm(window.__descUa)]) ? I18N[norm(window.__descUa)] : window.__descUa);
    renderRegions();
    if(regionSelect && regionSelect.value) regionSelect.dispatchEvent(new Event('change'));
    if(window.__eri3dRefresh) window.__eri3dRefresh();
    paintThemeBtn();
    document.querySelectorAll('.lang button').forEach(function(b, i){
      b.classList.toggle('on', (i === 0 && l === 'ua') || (i === 1 && l === 'en'));
    });
  }
  (function(){
    var langBtns = document.querySelectorAll('.lang button');
    if(langBtns[0]) langBtns[0].addEventListener('click', function(){ setLang('ua'); });
    if(langBtns[1]) langBtns[1].addEventListener('click', function(){ setLang('en'); });
    var act = document.querySelector('.header__act');
    if(act){
      themeBtn = document.createElement('button');
      themeBtn.className = 'themebtn'; themeBtn.type = 'button';
      themeBtn.setAttribute('aria-label', 'Перемкнути тему');
      themeBtn.addEventListener('click', function(){
        setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
      act.insertBefore(themeBtn, act.firstChild);
    }
    paintThemeBtn();
    if(lang !== 'ua') setLang(lang);
  })();
})();
