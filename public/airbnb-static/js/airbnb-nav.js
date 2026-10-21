/**
 * Airbnb Navigation Controller (User Dropdown, Mobile Bottom Navigation Bar, and Search)
 */
(function() {
  function initAirbnbNav() {
    const currentPath = window.location.pathname.toLowerCase();
    const isHomes = currentPath.includes('homes.html');
    const isExp = currentPath.includes('experiences.html');
    const isServices = currentPath.includes('services.html');
    const isHost = currentPath.includes('host.html');
    const isWishlists = currentPath.includes('wishlists.html');
    const isLogin = currentPath.includes('login.html');
    const isHelp = currentPath.includes('help.html');
    const isExplore = !isHomes && !isExp && !isServices && !isHost && !isWishlists && !isLogin && !isHelp;

    // 1. Ensure User Dropdown Menu exists
    let userMenu = document.querySelector('.ab-user-menu');
    let userBtn = document.querySelector('.ab-user-btn, button[aria-label="Main navigation menu"]');

    if (!userMenu && userBtn) {
      userMenu = document.createElement('div');
      userMenu.className = 'ab-user-menu';
      userMenu.innerHTML = `
        <a href="login.html" class="ab-menu-item" style="font-weight: 700;">Sign up</a>
        <a href="login.html" class="ab-menu-item">Log in</a>
        <div class="ab-menu-divider"></div>
        <a href="host.html" class="ab-menu-item">Airbnb your home</a>
        <a href="experiences.html" class="ab-menu-item">Host an experience</a>
        <a href="wishlists.html" class="ab-menu-item">Wishlists</a>
        <a href="help.html" class="ab-menu-item">Help Center</a>
      `;
      userBtn.parentElement.style.position = 'relative';
      userBtn.parentElement.appendChild(userMenu);
    }

    if (userBtn && userMenu) {
      userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenu.classList.toggle('is-open');
      });

      document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target) && !userBtn.contains(e.target)) {
          userMenu.classList.remove('is-open');
        }
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          userMenu.classList.remove('is-open');
        }
      });
    }

    // 2. Ensure Fixed Bottom Mobile Navigation Bar exists
    let bottomNav = document.querySelector('.airbnb-bottom-nav');
    if (!bottomNav) {
      bottomNav = document.createElement('nav');
      bottomNav.className = 'airbnb-bottom-nav';
      bottomNav.setAttribute('aria-label', 'Mobile Navigation');
      bottomNav.innerHTML = `
        <a href="index.html" class="airbnb-bottom-nav-item ${isExplore ? 'active' : ''}">
          <svg viewBox="0 0 32 32" class="airbnb-bottom-nav-icon" focusable="false" role="img">
            <path d="M13 2a11 11 0 0 1 8.5 17.96l7.85 7.85a1.5 1.5 0 0 1-2.12 2.12l-7.85-7.85A11 11 0 1 1 13 2zm0 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"></path>
          </svg>
          <span class="airbnb-bottom-nav-label">Explore</span>
        </a>
        <a href="homes.html" class="airbnb-bottom-nav-item ${isHomes ? 'active' : ''}">
          <svg viewBox="0 0 32 32" class="airbnb-bottom-nav-icon" focusable="false" role="img">
            <path d="M16 2.5L2 15h4v14h7v-9h6v9h7V15h4L16 2.5z"></path>
          </svg>
          <span class="airbnb-bottom-nav-label">Stays</span>
        </a>
        <a href="experiences.html" class="airbnb-bottom-nav-item ${isExp ? 'active' : ''}">
          <svg viewBox="0 0 32 32" class="airbnb-bottom-nav-icon" focusable="false" role="img">
            <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 4a10 10 0 1 1-10 10A10 10 0 0 1 16 6zm-2 5v5h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2z"></path>
          </svg>
          <span class="airbnb-bottom-nav-label">Experiences</span>
        </a>
        <a href="wishlists.html" class="airbnb-bottom-nav-item ${isWishlists ? 'active' : ''}">
          <svg viewBox="0 0 32 32" class="airbnb-bottom-nav-icon" focusable="false" role="img">
            <path d="M16 28c-.4 0-.8-.1-1.1-.4C14.1 26.9 2 16.5 2 9.5 2 5.4 5.4 2 9.5 2c2.4 0 4.6 1.2 5.9 3.2C16.8 3.2 19 2 21.4 2 25.5 2 29 5.4 29 9.5c0 7-12.1 17.4-12.9 18.1-.3.3-.7.4-1.1.4zM9.5 4.5C6.7 4.5 4.5 6.7 4.5 9.5c0 5.4 9.4 14.1 11.5 15.9 2.1-1.8 11.5-10.5 11.5-15.9 0-2.8-2.2-5-5-5-2.2 0-4.1 1.4-4.8 3.5h-3.4c-.7-2.1-2.6-3.5-4.8-3.5z"></path>
          </svg>
          <span class="airbnb-bottom-nav-label">Wishlists</span>
        </a>
        <a href="login.html" class="airbnb-bottom-nav-item ${isLogin ? 'active' : ''}">
          <svg viewBox="0 0 32 32" class="airbnb-bottom-nav-icon" focusable="false" role="img">
            <path d="M16 3a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 15c-6.6 0-12 3.4-12 10a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1c0-6.6-5.4-10-12-10z"></path>
          </svg>
          <span class="airbnb-bottom-nav-label">Log in</span>
        </a>
      `;
      document.body.appendChild(bottomNav);
    }

    // 3. Enable Search Bar click or Enter key to route to homes.html
    const searchInputs = document.querySelectorAll('input[type="text"], input[type="search"]');
    searchInputs.forEach(inp => {
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim().length > 0) {
          window.location.href = 'homes.html?search=' + encodeURIComponent(this.value.trim());
        }
      });
    });

    const searchButtons = document.querySelectorAll('button[aria-label="Search"], .ab-search-btn');
    searchButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const inp = document.querySelector('input[type="text"], input[type="search"]');
        const val = inp ? inp.value.trim() : '';
        window.location.href = 'homes.html' + (val ? '?search=' + encodeURIComponent(val) : '');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAirbnbNav);
  } else {
    initAirbnbNav();
  }
})();
