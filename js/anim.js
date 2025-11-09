/*! Tiny viewport animation helper
 * Usage: add data-animate="fadeInUp" (any animate.css class suffix) to elements.
 * When they enter the viewport, we add 'animate__animated animate__<name> animate__faster show'.
 */
(function(){
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  var els = [].slice.call(document.querySelectorAll('[data-animate]'));
  if (!('IntersectionObserver' in window) || els.length === 0) {
    // Fallback: show everything
    els.forEach(function(el){ el.classList.add('show'); });
    return;
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        var el = entry.target;
        var name = el.getAttribute('data-animate') || 'fadeInUp';
        // avoid re-triggering
        if (!el.classList.contains('animate__animated')) {
          el.classList.add('animate__animated', 'animate__' + name, 'animate__faster', 'show');
        }
        io.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  els.forEach(function(el){
    io.observe(el);
  });
})();
