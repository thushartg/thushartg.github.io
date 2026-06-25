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
