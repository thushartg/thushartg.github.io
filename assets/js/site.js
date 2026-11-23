/* ==========================================================================
   Thushar Govindaraju — Scroll Choreography & Authentic Product UI Handlers
   ========================================================================== */
(function () {
  'use strict';

  /* 1. Scroll-Driven Horizontal Hero Pan + Dynamic Discipline Switcher */
  var heroTrack = document.querySelector('.tb-hero-track');
  var heroName = document.getElementById('heroPanWord');
  var heroRole = document.getElementById('heroRoleBtn');

  var ROLES = [
    { label: 'AI Agents & Evaluation', cls: '' },
    { label: 'Data & Cloud ELT', cls: 'is-cream' },
    { label: 'Native macOS Software', cls: 'is-hot' },
    { label: 'Applied Machine Learning', cls: 'is-cream' }
  ];
  var roleIdx = 0;

  function setRole(idx) {
    if (!heroRole) return;
    var item = ROLES[idx % ROLES.length];
    heroRole.textContent = item.label;
    heroRole.className = 'tb-hero-role' + (item.cls ? ' ' + item.cls : '');
  }

  if (heroRole) {
    heroRole.addEventListener('click', function () {
      roleIdx = (roleIdx + 1) % ROLES.length;
      setRole(roleIdx);
    });
  }

  function updateHeroPan() {
    if (!heroTrack || !heroName) return;
    if (window.innerWidth <= 760 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroName.style.transform = 'translate3d(0,0,0)';
      return;
    }
    var rect = heroTrack.getBoundingClientRect();
    var scrollable = Math.max(1, heroTrack.offsetHeight - window.innerHeight);
    var scrolled = Math.min(scrollable, Math.max(0, -rect.top));
    var progress = scrolled / scrollable;

    var maxShift = Math.max(0, heroName.scrollWidth - window.innerWidth + Math.round(window.innerWidth * 0.08));
    var tx = -progress * maxShift;
    heroName.style.transform = 'translate3d(' + tx.toFixed(1) + 'px, 0, 0)';

    var stepIdx = Math.min(ROLES.length - 1, Math.floor(progress * ROLES.length));
    if (stepIdx !== roleIdx) {
      roleIdx = stepIdx;
      setRole(roleIdx);
    }
  }

  if (heroTrack && heroName) {
    window.addEventListener('scroll', updateHeroPan, { passive: true });
    window.addEventListener('resize', updateHeroPan);
    updateHeroPan();
  }

  /* 2. Smooth Scroll-to-Top */
  document.querySelectorAll('[data-scroll-top]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* 3. Homepage Flashback Real Notch Scrubber + Retract Toggle */
  var fbHomeStage = document.getElementById('fbHomeStage');
  var fbHomeRange = document.getElementById('fbHomeRange');
  var fbHomeOut = document.getElementById('fbHomeOut');
  var fbHomeBadge = document.getElementById('fbHomeBadge');
  var fbHomeDocApp = document.getElementById('fbHomeDocApp');
  var fbHomeDocEye = document.getElementById('fbHomeDocEye');
  var fbHomeDocHead = document.getElementById('fbHomeDocHead');
  var fbHomeDocBody = document.getElementById('fbHomeDocBody');
  var fbHomeToggle = document.getElementById('fbHomeToggle');
  var fbHomeCopy = document.getElementById('fbHomeCopy');

  var FB_HOME_MOMENTS = [
    {
      max: -20,
      app: 'Terminal — zsh (spark-submit)',
      eye: 'STAGE 4/4 COMPLETED',
      head: '150,000 claims written to snappy.parquet.',
      body: 'Rewind 24 seconds to copy a scrolled-away Spark job ID or stack trace straight out of RAM.'
    },
    {
      max: -10,
      app: 'BigQuery — dbt test runner',
      eye: 'MART_DAILY_MARKET_MACRO',
      head: 'PASS=7 WARN=0 ERROR=0 in 1.18s.',
      body: 'Scrub across weekday equity & FRED macro validation runs without recording giant screen files.'
    },
    {
      max: 0.1,
      app: 'Notes — Launch draft',
      eye: 'LAUNCH NOTES',
      head: 'A moment worth keeping.',
      body: 'Highlight vanished terminal output, slides, or meeting text directly inside the paused frame—zero temp files touch your SSD.'
    }
  ];

  if (fbHomeRange && fbHomeOut && fbHomeBadge) {
    fbHomeRange.addEventListener('input', function () {
      var v = parseFloat(fbHomeRange.value);
      var label = v === 0 ? 'Now' : '−' + Math.abs(v).toFixed(1) + 's';
      fbHomeOut.textContent = label;
      fbHomeBadge.textContent = v === 0 ? 'Live frame · 0.0s' : 'Paused frame ' + label;

      for (var i = 0; i < FB_HOME_MOMENTS.length; i++) {
        if (v <= FB_HOME_MOMENTS[i].max) {
          if (fbHomeDocApp) fbHomeDocApp.textContent = FB_HOME_MOMENTS[i].app;
          if (fbHomeDocEye) fbHomeDocEye.textContent = FB_HOME_MOMENTS[i].eye;
          if (fbHomeDocHead) fbHomeDocHead.textContent = FB_HOME_MOMENTS[i].head;
          if (fbHomeDocBody) fbHomeDocBody.textContent = FB_HOME_MOMENTS[i].body;
          break;
        }
      }
    });
  }

  if (fbHomeToggle && fbHomeStage) {
    fbHomeToggle.addEventListener('click', function () {
      var collapsed = fbHomeStage.classList.toggle('is-collapsed');
      fbHomeToggle.textContent = collapsed ? 'Summon Notch (⌘⇧Z)' : 'Retract into Notch';
    });
  }

  if (fbHomeCopy) {
    fbHomeCopy.addEventListener('click', function () {
      fbHomeCopy.textContent = 'Copied PNG ✓';
      setTimeout(function () {
        fbHomeCopy.textContent = 'Copy frame';
      }, 1300);
    });
  }

  /* 4. Homepage MacControl Real iOS OLED Trackpad */
  var mcHomeSurface = document.getElementById('mcHomeSurface');
  var mcHomeCursor = document.getElementById('mcHomeCursor');
  var mcHomeCoord = document.getElementById('mcHomeCoord');

  if (mcHomeSurface && mcHomeCursor && mcHomeCoord) {
    mcHomeSurface.addEventListener('pointerdown', function (e) {
      e.preventDefault();
    });
    mcHomeSurface.addEventListener('pointermove', function (e) {
      var r = mcHomeSurface.getBoundingClientRect();
      var x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      var y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      mcHomeCursor.style.left = (x * 100).toFixed(1) + '%';
      mcHomeCursor.style.top = (y * 100).toFixed(1) + '%';
      mcHomeCoord.textContent =
        'HID (' + Math.round(x * 2880) + ', ' + Math.round(y * 1800) + ') · ChaCha20-Poly1305';
    });
  }

  document.querySelectorAll('[data-mc-click]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!mcHomeCoord) return;
      var action = btn.getAttribute('data-mc-click');
      mcHomeCoord.textContent = action + ' dispatched · 4ms UDP';
      if (mcHomeCursor) {
        mcHomeCursor.style.transform = 'scale(0.8)';
        setTimeout(function () {
          mcHomeCursor.style.transform = 'scale(1)';
        }, 140);
      }
    });
  });

  /* 5. Subpage Flashback Interactive 30-Second Scrubber */
  var fbScrub = document.getElementById('fbScrub');
  var fbTime = document.getElementById('fbTime');
  var fbOcrLine = document.getElementById('fbOcrLine');

  var FB_FRAMES = [
    {
      max: -22,
      code: 'spark-submit --master yarn jobs/clean_claims_parquet.py',
      hit: 'Stage 4/4 · 150,000 rows written (snappy)'
    },
    {
      max: -14,
      code: 'dbt test --select mart_daily_market_macro',
      hit: 'PASS=7 WARN=0 ERROR=0 · 1.18s'
    },
    {
      max: -6,
      code: 'SELECT diagnosis_category, ROUND(SUM(paid_amount)/1e6, 2) FROM claims',
      hit: '150,000 rows · 14.2 ms · Vision Live Text'
    },
    {
      max: 0.1,
      code: '⌘⇧Z summoned · H.264 hardware ring buffer active in RAM',
      hit: '0 disk writes · Drag MP4 ready'
    }
  ];

  if (fbScrub && fbTime && fbOcrLine) {
    fbScrub.addEventListener('input', function () {
      var val = parseFloat(fbScrub.value);
      fbTime.textContent = val === 0 ? 'LIVE' : val.toFixed(1) + 's';
      for (var i = 0; i < FB_FRAMES.length; i++) {
        if (val <= FB_FRAMES[i].max) {
          fbOcrLine.innerHTML =
            FB_FRAMES[i].code + '<br><span class="fb-ocr-hit">' + FB_FRAMES[i].hit + '</span>';
          break;
        }
      }
    });
  }

  /* 6. Subpage MacControl Interactive HID Trackpad */
  var mcPad = document.getElementById('mcPad');
  var mcDot = document.getElementById('mcDot');
  var mcCoord = document.getElementById('mcCoord');

  if (mcPad && mcDot && mcCoord) {
    var movePad = function (clientX, clientY) {
      var r = mcPad.getBoundingClientRect();
      var x = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      var y = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
      mcDot.style.left = (x * 100).toFixed(1) + '%';
      mcDot.style.top = (y * 100).toFixed(1) + '%';
      mcCoord.textContent =
        'HID (' + Math.round(x * 2880) + ', ' + Math.round(y * 1800) + ') · ChaCha20';
    };
    mcPad.addEventListener('pointermove', function (e) {
      movePad(e.clientX, e.clientY);
    });
  }

  /* 7. Click-to-Zoom Lightbox for Analytical Figures */
  var lb = document.getElementById('lb');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.shot img').forEach(function (img) {
      img.addEventListener('click', function () {
        if (!lbImg) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        lb.classList.add('is-open');
      });
    });
    lb.addEventListener('click', function () {
      lb.classList.remove('is-open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lb.classList.remove('is-open');
    });
  }
})();
