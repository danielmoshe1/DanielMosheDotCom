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

  // Contact form — inline confirmation via FormSubmit AJAX (progressive enhancement)
  var form = document.querySelector('.contact-form');
  var status = document.getElementById('form-status');
  if (form && status && window.fetch) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // browser still runs required-field validation before this fires
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      fetch('https://formsubmit.co/ajax/a702a6c9fd97003a7db2bc462ecbaeef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && (j.success === 'true' || j.success === true)) {
            form.reset();
            form.classList.add('is-hidden');
            status.className = 'form-status form-status-success';
            status.innerHTML = '<strong>Message sent.</strong> Thanks for reaching out — Daniel reads every message and will get back to you personally.';
            status.hidden = false;
            status.focus();
          } else {
            throw new Error('FormSubmit returned an error');
          }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
          status.className = 'form-status form-status-error';
          status.innerHTML = 'Something went wrong sending your message. Please try again, or connect with Daniel on <a href="https://www.linkedin.com/in/danmoshe" target="_blank" rel="noopener noreferrer">LinkedIn</a>.';
          status.hidden = false;
          status.focus();
        });
    });
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
