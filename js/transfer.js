// transfer.js
document.addEventListener("DOMContentLoaded", function () {
  // Cek user login
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "../index.html";
    return;
  }

  // Elemen DOM
  const listHistory = document.querySelector(".list-history");
  const searchInput = document.querySelector(
    '.title-history input[name="find"]'
  );
  let dataTransfer = [];

  // Load data dari JSON
  async function loadData() {
    try {
      const response = await fetch("../history.json");
      const data = await response.json();
      dataTransfer = data;
      renderData(data);
    } catch (error) {
      console.error("Gagal memuat file JSON:", error);
    }
  }

  // Render data dengan filter
  function renderData(dataToRender) {
    listHistory.innerHTML = "";

    // Ambil nilai pencarian
    const searchQuery = searchInput.value.trim().toLowerCase();

    // Filter data
    const filteredData = searchQuery
      ? dataToRender.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.phone.includes(searchQuery)
        )
      : dataToRender;

    // Tampilkan pesan jika tidak ada hasil
    if (filteredData.length === 0) {
      const noResults = document.createElement("div");
      noResults.className = "no-results";
      noResults.textContent = "No results found";
      listHistory.appendChild(noResults);
      return;
    }

    // Render setiap item
    filteredData.forEach((item) => {
      const historyItem = document.createElement("div");
      historyItem.className = "history-item";
      historyItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="history-avatar">
        <div class="history-info">
          <span class="history-name">${item.name}</span>
          <span class="history-phone">${item.phone}</span>
        </div>
        <img src="../img/star.png" alt="Star" class="history-star">
      `;

      // Tambahkan event listener untuk memilih penerima transfer
      historyItem.addEventListener("click", function () {
        // Simpan penerima transfer ke localStorage
        localStorage.setItem("transferRecipient", JSON.stringify(item));
        // Redirect ke halaman set nominal
        window.location.href = "transfer-amount.html";
      });

      listHistory.appendChild(historyItem);
    });
  }

  // Event listener untuk input pencarian
  searchInput.addEventListener("input", function () {
    renderData(dataTransfer);
  });

  // Inisialisasi
  loadData();
});
