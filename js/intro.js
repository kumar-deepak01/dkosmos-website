(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isHome = document.body.dataset.page === 'home';
  const host = document.getElementById('site-intro');
  if (!host || !isHome || reduced || sessionStorage.getItem('dk-intro-seen')) return;
  host.innerHTML = `<div class="site-intro" role="dialog" aria-label="Welcome"><div class="intro-sky"></div><div class="intro-sweep"></div><button class="intro-skip" type="button">Skip intro <span>↗</span></button><div class="intro-center"><div class="intro-brand">${window.SITE_CONFIG.shortBrand}</div><p class="intro-tagline">${window.SITE_CONFIG.tagline}</p></div></div>`;
  const intro = host.firstElementChild;
  const finish = () => { if (!intro || intro.classList.contains('dismissed')) return; intro.classList.add('dismissed'); sessionStorage.setItem('dk-intro-seen','1'); window.setTimeout(() => intro.remove(), 520); };
  intro.querySelector('.intro-skip').addEventListener('click',finish);
  window.setTimeout(finish,900);
})();
