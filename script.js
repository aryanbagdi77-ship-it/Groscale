// The original file had no <script> tag — all motion (hero chart draw, ticker
// scroll) is pure CSS animation, so there was nothing to extract.
// Added here: a simple mobile nav toggle, since .nav-links is hidden below
// 860px with no way to reopen it. Wire it up by adding a burger button in
// the nav markup, e.g.:
//   <button class="nav-burger" aria-label="Menu" aria-expanded="false">☰</button>
// and a mobile menu panel with class="mobile-links" (already styled, unused).

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-links');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu after tapping a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
