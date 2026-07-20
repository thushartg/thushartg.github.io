// year
var yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// nav scrolled state
var header = document.querySelector('header');
if (header) addEventListener('scroll', function () {
  header.classList.toggle('scrolled', scrollY > 10);
});

// mobile menu
var burger = document.getElementById('burger');
var menu = document.getElementById('menu');
if (burger && menu) {
  burger.addEventListener('click', function () { menu.classList.toggle('open'); });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('open'); });
  });
}

// reveal on scroll
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

// lightbox for project galleries
var lb = document.getElementById('lb');
if (lb) {
  var lbImg = lb.querySelector('img');
  document.querySelectorAll('.shot img').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.src;
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
}

/* ---------- TERMINAL COMMAND PALETTE (site-wide) ---------- */
(function () {
  var LINKS = {
    github: 'https://github.com/thushartg',
    linkedin: 'https://www.linkedin.com/in/thushar-thorenur-govindaraju-945712186',
    email: 'mailto:thushartg25@gmail.com'
  };
  var PROJECTS = [
    { key: 'financial', n: '01', name: 'Financial Markets Data Platform', url: '/projects/financial-markets-data-platform.html' },
    { key: 'hadoop',    n: '02', name: 'Hadoop Healthcare Claims Pipeline', url: '/projects/hadoop-claims-pipeline.html', alias: ['claims'] },
    { key: 'crop',      n: '03', name: 'US Crop Price & Supply-Chain Risk', url: '/projects/usda-crop-price-risk.html', alias: ['usda'] },
    { key: 'cleanunet', n: '04', name: 'CleanUNet Speech Denoising', url: '/projects/cleanunet-speech-denoising.html', alias: ['speech','denoise'] },
    { key: 'emoji',     n: '05', name: 'Emoji Generation GAN', url: '/projects/emoji-gan.html', alias: ['gan'] },
    { key: 'taskq',     n: '06', name: 'TaskQ — Async Task Router', url: '/projects/taskq.html' },
    { key: 'iot',       n: '07', name: 'IoT Air Quality Monitor', url: '/projects/iot-aqi.html', alias: ['aqi'] },
    { key: 'tastenet',  n: '08', name: 'TasteNet — Taste-Matched Restaurant Reviews', url: '/projects/tastenet.html', alias: ['taste'] }
  ];
  var COMMANDS = [
    { name: 'help', desc: 'list every command' },
    { name: 'ls', desc: 'list all projects' },
    { name: 'open', desc: 'open a project — e.g. open hadoop', arg: true },
    { name: 'sql', desc: 'jump to the live SQL console' },
    { name: 'dag', desc: 'jump to the running Airflow DAG' },
    { name: 'whoami', desc: 'who is this' },
    { name: 'resume', desc: 'print résumé summary' },
    { name: 'home', desc: 'go to the homepage' },
    { name: 'about', desc: 'about section' },
    { name: 'skills', desc: 'skills section' },
    { name: 'experience', desc: 'experience & education' },
    { name: 'contact', desc: 'contact section' },
    { name: 'github', desc: 'open GitHub ↗' },
    { name: 'linkedin', desc: 'open LinkedIn ↗' },
    { name: 'email', desc: 'compose an email' },
    { name: 'clear', desc: 'clear the screen' },
    { name: 'exit', desc: 'close the terminal (Esc)' }
  ];

  // build DOM
  var overlay = document.createElement('div');
  overlay.className = 'term-overlay';
  overlay.innerHTML =
    '<div class="term" role="dialog" aria-label="Terminal">' +
      '<div class="term-bar"><span class="tl r"></span><span class="tl y"></span><span class="tl g"></span>' +
      '<span class="tt">thushartg — -zsh</span><span class="tx" id="termClose">✕</span></div>' +
      '<div class="term-body" id="termBody"><div class="inner">' +
        '<div class="term-out" id="termOut"></div>' +
        '<div class="term-inrow">' +
          '<span class="term-prompt">thushartg@Thushars-MacBook-Pro ~ %</span>' +
          '<span class="term-line" id="termLine"></span><span class="term-cursor" id="termCur"></span>' +
          '<input class="term-in" id="termIn" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="command"/>' +
        '</div>' +
      '</div></div>' +
    '</div>';
  document.body.appendChild(overlay);

  // nav trigger — sits among the section links (About / Projects / Skills…)
  var navLinks = document.getElementById('menu');
  var navBtn = document.createElement('button');
  navBtn.className = 'nav-term';
  navBtn.type = 'button';
  navBtn.innerHTML = '<span>&gt;_ terminal</span><span class="kbd">⌘K</span>';
  if (navLinks) {
    var ctaEl = navLinks.querySelector('.nav-cta');
    ctaEl ? navLinks.insertBefore(navBtn, ctaEl) : navLinks.appendChild(navBtn);
  }

  var out = overlay.querySelector('#termOut');
  var input = overlay.querySelector('#termIn');
  var lineEl = overlay.querySelector('#termLine');
  var body = overlay.querySelector('#termBody');
  var booted = false;

  function echo(html, cls) {
    var d = document.createElement('div');
    d.className = 'ln' + (cls ? ' ' + cls : '');
    d.innerHTML = html;
    out.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function esc(s){ return String(s).replace(/[&<>]/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];}); }
  function prompt(line){ echo('<span class="grn">thushartg@Thushars-MacBook-Pro ~ %</span> <span class="cmd">' + esc(line) + '</span>'); }

  function stamp() {
    var d = new Date(), p = function(n){ return ('0' + n).slice(-2); };
    var wd = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
    var mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
    return wd + ' ' + mo + ' ' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }
  function open() {
    overlay.classList.add('open');
    if (!booted) {
      booted = true;
      echo('<span class="dim">Last login: ' + stamp() + ' on ttys001</span>');
      echo('<span class="dim">type </span><span class="grn">help</span><span class="dim"> for a list of commands</span>');
    }
    setTimeout(function(){ input.focus(); }, 30);
  }
  function close() { overlay.classList.remove('open'); input.blur(); }
  function go(url) { echo('<span class="dim">→ ' + esc(url) + '</span>'); setTimeout(function(){ location.href = url; }, 180); }

  function findProject(term) {
    term = (term || '').trim().toLowerCase();
    if (!term) return null;
    return PROJECTS.find(function (p) {
      return p.key === term || p.n === term || p.name.toLowerCase().indexOf(term) > -1 ||
             (p.alias && p.alias.indexOf(term) > -1) || p.key.indexOf(term) > -1;
    }) || null;
  }

  function run(line) {
    var t = line.trim();
    if (!t) return;
    prompt(t);
    var sp = t.indexOf(' ');
    var cmd = (sp < 0 ? t : t.slice(0, sp)).toLowerCase();
    var arg = sp < 0 ? '' : t.slice(sp + 1).trim();

    switch (cmd) {
      case 'help':
        echo('<span class="dim">available commands:</span>');
        COMMANDS.forEach(function (c) { echo('  <span class="grn">' + c.name + (c.arg ? ' &lt;name&gt;' : '') + '</span>  <span class="dim">' + c.desc + '</span>'); });
        break;
      case 'ls': case 'projects':
        PROJECTS.forEach(function (p) { echo('  <span class="amb">' + p.n + '</span>  <span class="cmd">' + esc(p.key) + '</span>  <span class="dim">' + esc(p.name) + '</span>'); });
        echo('<span class="dim">→ open one with </span><span class="grn">open ' + PROJECTS[1].key + '</span>');
        break;
      case 'open': case 'cd': {
        var p = findProject(arg);
        if (!p) { echo('open: no project matching “' + esc(arg) + '” — try <span class="grn">ls</span>', 'err'); break; }
        echo('opening <span class="cmd">' + esc(p.name) + '</span>…'); go(p.url); break;
      }
      case 'sql': echo('booting the in-browser DuckDB console…'); go('/projects/hadoop-claims-pipeline.html#query'); break;
      case 'dag': echo('triggering the Airflow DAG…'); go('/projects/financial-markets-data-platform.html#orchestration'); break;
      case 'whoami':
        echo('<span class="cmd">Thushar Thorenur Govindaraju</span>');
        echo('<span class="dim">AI/ML &amp; Data Engineer · Buffalo, NY</span>');
        echo('<span class="dim">M.S. Computer Science (AI/ML) — University at Buffalo</span>');
        echo('<span class="dim">I build ML systems and end-to-end data pipelines.</span>');
        break;
      case 'resume': case 'cat':
        echo('<span class="amb">— education —</span>');
        echo('  M.S. Computer Science (AI/ML), University at Buffalo · GPA 3.5');
        echo('  B.E. Electronics &amp; Communication, Global Academy of Technology');
        echo('<span class="amb">— experience —</span>');
        echo('  Data Engineering Intern · CloudBC Labs (2023)');
        echo('<span class="amb">— stack —</span>');
        echo('  Python · SQL · PyTorch · Spark · Hadoop · Hive · Airflow · dbt · BigQuery · Docker');
        echo('<span class="dim">tip: type </span><span class="grn">ls</span><span class="dim"> to browse the work.</span>');
        break;
      case 'about':
        echo("I'm an AI/ML &amp; Data Engineer with a Master's in Computer Science (AI/ML) from the");
        echo('University at Buffalo. My work spans two connected worlds — building ML models');
        echo('(speech-denoising autoencoders, GANs, computer vision) and engineering the data');
        echo('platforms that feed them: <span class="amb">ingest → model → orchestrate → serve</span>.');
        break;
      case 'skills':
        echo('<span class="amb">languages</span>   Python · SQL · C/C++ · Swift');
        echo('<span class="amb">data eng</span>    Airflow · dbt · BigQuery · Hadoop/HDFS · Spark · Hive · Docker · ETL/ELT');
        echo('<span class="amb">ml &amp; ai</span>     PyTorch · GANs · Computer Vision · NLP · Speech Denoising · Prophet');
        echo('<span class="amb">cloud / bi</span>  Google Cloud · Looker Studio · Tableau · Pandas · REST APIs · Git');
        break;
      case 'experience': case 'exp':
        echo('<span class="amb">— experience —</span>');
        echo('  Data Engineering Intern · CloudBC Labs · Oct–Dec 2023 · Bangalore');
        echo('  <span class="dim">Built a Python data-ingestion pipeline (scraping + filtering) for talent analytics.</span>');
        echo('<span class="amb">— education —</span>');
        echo('  M.S. Computer Science (AI/ML) · University at Buffalo · 2024–2025 · GPA 3.5');
        echo('  B.E. Electronics &amp; Communication · Global Academy of Technology · 2020–2024');
        break;
      case 'contact':
        echo('<span class="amb">email</span>     <a href="' + LINKS.email + '">thushartg25@gmail.com</a>');
        echo('<span class="amb">github</span>    <a href="' + LINKS.github + '" target="_blank" rel="noopener">github.com/thushartg ↗</a>');
        echo('<span class="amb">linkedin</span>  <a href="' + LINKS.linkedin + '" target="_blank" rel="noopener">linkedin.com/in/thushar-thorenur-govindaraju ↗</a>');
        break;
      case 'home': case '~': echo('<span class="dim">closing terminal…</span>'); setTimeout(close, 180); break;
      case 'github': echo('opening GitHub ↗'); window.open(LINKS.github, '_blank', 'noopener'); break;
      case 'linkedin': echo('opening LinkedIn ↗'); window.open(LINKS.linkedin, '_blank', 'noopener'); break;
      case 'email': case 'mail': echo('opening mail client…'); location.href = LINKS.email; break;
      case 'clear': out.innerHTML = ''; break;
      case 'exit': case 'q': close(); break;
      default: {
        var pj = findProject(t);
        if (pj) { echo('opening <span class="cmd">' + esc(pj.name) + '</span>…'); go(pj.url); }
        else echo('command not found: ' + esc(cmd) + ' — type <span class="grn">help</span>', 'err');
      }
    }
  }

  // mirror typed text next to the block cursor
  function setInput(v) {
    input.value = v; lineEl.textContent = v;
    try { input.setSelectionRange(v.length, v.length); } catch (e) {}
  }

  // bash-style Tab completion
  function commonPrefix(list) {
    return list.reduce(function (a, b) {
      var i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
      return a.slice(0, i);
    });
  }
  function complete() {
    var val = input.value;
    var sp = val.indexOf(' ');
    var head = (sp < 0 ? val : val.slice(0, sp)).toLowerCase();
    var candidates, before, token;
    if (sp < 0) {
      token = head; before = '';
      candidates = COMMANDS.map(function (c) { return c.name; }).filter(function (n) { return n.indexOf(token) === 0; });
    } else if (head === 'open' || head === 'cd') {
      token = val.slice(sp + 1).toLowerCase(); before = val.slice(0, sp + 1);
      candidates = [];
      PROJECTS.forEach(function (p) {
        if (p.key.indexOf(token) === 0) candidates.push(p.key);
        (p.alias || []).forEach(function (a) { if (a.indexOf(token) === 0) candidates.push(a); });
      });
    } else { return; }

    if (!candidates.length) return;
    if (candidates.length === 1) {
      var only = candidates[0], full = before + only;
      if (sp < 0) { var c = COMMANDS.find(function (x) { return x.name === only; }); if (c && c.arg) full += ' '; }
      setInput(full); return;
    }
    var common = commonPrefix(candidates);
    if (common.length > token.length) { setInput(before + common); }
    else { prompt(val); echo(candidates.map(esc).join('   '), 'dim'); }
  }

  input.addEventListener('input', function () { lineEl.textContent = input.value; });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var v = input.value;
      input.value = ''; lineEl.textContent = '';
      run(v);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      complete();
    }
  });
  // keep focus on the input so the caret/keyboard stay live
  body.addEventListener('mousedown', function (e) {
    if (e.target.tagName !== 'A') { setTimeout(function(){ input.focus(); }, 0); }
  });

  navBtn.addEventListener('click', function () { if (navLinks) navLinks.classList.remove('open'); open(); });
  overlay.querySelector('#termClose').addEventListener('click', close);
  addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA)$/.test((e.target.tagName || '')) || e.target.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); overlay.classList.contains('open') ? close() : open(); }
    else if (e.key === 'Escape' && overlay.classList.contains('open')) { close(); }
    else if (e.key === '/' && !overlay.classList.contains('open') && !typing) { e.preventDefault(); open(); }
  });
})();
