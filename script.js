// script.js - Intersection reveal, smooth scroll, and small utilities
(function(){
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || 0, 10);
        setTimeout(() => el.classList.add('revealed'), delay);
        obs.unobserve(el);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => obs.observe(r));

  // Smooth internal link scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior: 'smooth'});
      }
    });
  });

  // Copy-to-clipboard buttons
  function fallbackCopy(text){
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-copy-target');
      if(!value) return;
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(value).then(() => {
          const prev = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => btn.textContent = prev, 1400);
        }).catch(() => {
          fallbackCopy(value);
        });
      } else {
        fallbackCopy(value);
        const prev = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => btn.textContent = prev, 1400);
      }
    });
  });

  // Respect prefers-reduced-motion: if reduce, reveal immediately
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq && mq.matches){
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
  }

})();
