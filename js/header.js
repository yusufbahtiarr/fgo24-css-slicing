function loadHeader() {
  const headerHTML = `
      <div class="logo" role="banner">
        <img src="../img/wallet-small.png" alt="E-wallet logo" />
        <span id="logo-name">e-wallet</span>
      </div>
      <div class="user" role="complementary">
        <div class="user-greeting">
          <span id="user-account">Galih Wizard</span>
        </div>
        <img src="../img/user-48.png" alt="User profile picture" />
        <button class="btn-user dekstop" aria-label="User menu toggle"></button>
      </div>
  `;

  document.querySelector("header").innerHTML = headerHTML;

  const username = document.getElementById('user-account');
  const user = JSON.parse(localStorage.getItem('currentUser'));
  username.textContent = user?.name || user?.email?.split('@')[0];
}

document.addEventListener("DOMContentLoaded", loadHeader);

