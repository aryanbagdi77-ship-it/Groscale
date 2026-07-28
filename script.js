document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-links');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form: open a pre-filled email directly instead of relying on
  // a third-party form backend that may silently fail to deliver.
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const phone = contactForm.querySelector('#phone').value.trim();
      const service = contactForm.querySelector('#service').value;
      const message = contactForm.querySelector('#message').value.trim();

      const subject = `New enquiry from Groscale website — ${name}`;
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '(not provided)'}`,
        `Service: ${service}`,
        '',
        'Message:',
        message
      ];
      const body = bodyLines.join('\n');

      const mailtoUrl = `mailto:groscalemarketingandmedia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;

      if (formStatus) {
        formStatus.textContent = 'Opening your email app to send this — if nothing opens, email us directly at groscalemarketingandmedia@gmail.com.';
      }
    });
  }

  // Portfolio filters: service pills + custom industry dropdown, combined (AND logic)
  const filterPills = document.querySelectorAll('.filter-pill');
  const industryToggle = document.getElementById('industry-toggle');
  const industryMenu = document.getElementById('industry-menu');
  const industryLabel = document.getElementById('industry-label');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterPills.length && portfolioCards.length) {
    let activeService = 'all';
    let activeIndustry = 'all';

    const applyFilters = () => {
      portfolioCards.forEach(card => {
        const services = (card.dataset.services || '').split(',').map(s => s.trim());
        const industry = card.dataset.industry || '';
        const serviceMatch = activeService === 'all' || services.includes(activeService);
        const industryMatch = activeIndustry === 'all' || industry === activeIndustry;
        card.classList.toggle('is-hidden', !(serviceMatch && industryMatch));
      });
    };

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeService = pill.dataset.filter;
        applyFilters();
      });
    });

    if (industryToggle && industryMenu && industryLabel) {
      const closeMenu = () => {
        industryMenu.classList.remove('is-open');
        industryToggle.setAttribute('aria-expanded', 'false');
      };

      industryToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = industryMenu.classList.toggle('is-open');
        industryToggle.setAttribute('aria-expanded', String(isOpen));
      });

      industryMenu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
          industryMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
          item.classList.add('active');
          activeIndustry = item.dataset.value;
          industryLabel.textContent = activeIndustry === 'all' ? 'Industries' : item.textContent;
          closeMenu();
          applyFilters();
        });
      });

      document.addEventListener('click', (e) => {
        if (!industryToggle.contains(e.target) && !industryMenu.contains(e.target)) {
          closeMenu();
        }
      });
    }
  }
});
