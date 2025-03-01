document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const pages = document.querySelectorAll('.page');
  const tabLinks = document.querySelectorAll('.tab-links a');
  const themeToggle = document.getElementById('theme-toggle');

  // Function to show a specific tab and page
  function showTab(tab) {
    tabs.forEach((t) => t.classList.remove('active'));
    pages.forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    tab.classList.remove('hidden'); // Ensure tab is visible
    const tabId = tab.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  }

  // Function to revert to home if no tabs are active
  function revertToHome() {
    const homeTab = document.querySelector('.tab[data-tab="home"]');
    showTab(homeTab);
  }

  // Tab and close button functionality
  tabs.forEach((tab) => {
    const closeBtn = tab.querySelector('.close-btn');

    // Click on tab (excluding close button) to open it
    tab.addEventListener('click', (e) => {
      if (!e.target.classList.contains('close-btn')) {
        showTab(tab);
      }
    });

    // Click on close button to hide tab
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent tab click event from firing
      tab.classList.remove('active');
      tab.classList.add('hidden'); // Hide the tab
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.remove('active');

      // Check if any tab is active; if not, revert to home
      if (!document.querySelector('.tab.active')) {
        revertToHome();
      }
    });
  });

  // Homepage links to reopen tabs
  tabLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
      showTab(tab);
    });
  });

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark')
      ? 'Light Theme'
      : 'Dark Theme';
  });
});
