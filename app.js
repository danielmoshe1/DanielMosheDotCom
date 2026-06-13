/* danielmoshe.com — nav, mobile menu, role rotator, scroll reveal */
(function () {
  var nav    = document.getElementById('site-nav');
  var toggle = document.getElementById('menu-toggle');
  var links  = document.getElementById('nav-links');

  if (nav && toggle && links) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open) { nav.classList.add('scrolled'); }
      else if (window.scrollY <= 60) { nav.classList.remove('scrolled'); }
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        if (window.scrollY <= 60) { nav.classList.remove('scrolled'); }
      }
    });
  }

  // Rotating hero roles
  var roles = ['Entrepreneur.', 'Expert EOS Implementer™.', 'Speaker.', 'Leadership Team Coach.', 'EO Accelerator Mentor.', 'Pilot.'];
  var rotator = document.getElementById('role-rotator');
  var idx = 0;
  if (rotator && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () {
      idx = (idx + 1) % roles.length;
      rotator.classList.add('role-out');
      setTimeout(function () {
        rotator.textContent = roles[idx];
        rotator.classList.remove('role-out');
      }, 280);
    }, 2600);
  }

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }
}());
