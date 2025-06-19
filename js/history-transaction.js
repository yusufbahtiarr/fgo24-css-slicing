const table = document.querySelector("table");
const user = localStorage.getItem("currentUser");

if (!user) {
  window.location.href = "../index.html";
}

let dataTransaction = [];
const itemsPerPage = 5;
let currentPage = 1;

// Fetch Data
async function fetchData() {
  try {
    const response = await fetch("../history.json");
    const data = await response.json();
    dataTransaction = data;
    // Check for URL search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    if (searchQuery) {
      document.getElementById("searchInput").value = searchQuery;
      document.getElementById("imgSearch").src = "../img/search-cancel.png";
      const filteredData = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchQuery.toLowerCase())
      );
      loadData(filteredData);
      setupPagination(filteredData);
    } else {
      loadData(data);
      setupPagination(data);
    }
  } catch (error) {
    console.error("Gagal memuat file JSON:", error);
  }
}

// Load Data Transaction History
function loadData(data, page = 1) {
  table.innerHTML = "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  if (paginatedData.length === 0) {
    table.innerHTML =
      '<tr><td colspan="5">Data Pencarian tidak ditemukan</td></tr>';
    return;
  }

  for (let i = 0; i < paginatedData.length; i++) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const img = document.createElement("img");
    const img2 = document.createElement("img");

    table.append(tr);
    tr.append(td1);
    td1.append(img);
    img.src = paginatedData[i].image;
    tr.append(td2);
    td2.innerHTML = `<a href="history-transaction-pop-up.html?name=${paginatedData[i].name}">${paginatedData[i].name}</a>`;
    tr.append(td3);
    td3.textContent = paginatedData[i].phone;
    tr.append(td4);
    if (paginatedData[i].typeTransaction === "Transfer") {
      td4.style.color = "green";
      td4.textContent = `+Rp. ${paginatedData[i].amount.toLocaleString("id")}`;
    } else {
      td4.style.color = "red";
      td4.textContent = `-Rp. ${paginatedData[i].amount.toLocaleString("id")}`;
    }
    tr.append(td5);
    td5.append(img2);
    img2.src = "../img/trash.png";
  }
}

// Setup Pagination Controls
function setupPagination(data) {
  const existingPagination = document.getElementById("pagination");
  if (existingPagination) {
    existingPagination.remove();
  }

  const paginationContainer = document.createElement("div");
  paginationContainer.id = "pagination";
  paginationContainer.style.textAlign = "center";
  paginationContainer.style.marginTop = "20px";

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.style.margin = "0 5px";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadData(data, currentPage);
      updatePaginationButtons(totalPages, data);
    }
  });

  const pageNumbers = document.createElement("span");

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.style.margin = "0 5px";
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadData(data, currentPage);
      updatePaginationButtons(totalPages, data);
    }
  });

  paginationContainer.append(prevButton, pageNumbers, nextButton);
  table.parentNode.insertBefore(paginationContainer, table.nextSibling);

  updatePaginationButtons(totalPages, data);

  function updatePaginationButtons(totalPages, data) {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
  }
}

// Search Functionality
const searchForm = document.querySelector("form");
const searchInput = document.getElementById("searchInput");
const imgSearch = document.getElementById("imgSearch");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission
  const input = searchInput.value.trim();

  if (imgSearch.src.includes("search.png") && input) {
    // Perform search
    // imgSearch.src = "../img/search-cancel.png";
    const filteredData = dataTransaction.filter(
      (item) =>
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.phone.toLowerCase().includes(input.toLowerCase())
    );
    // Update URL with search parameter
    const url = new URL(window.location);
    url.searchParams.set("search", input);
    window.history.pushState({}, "", url);
    currentPage = 1;
    loadData(filteredData, currentPage);
    setupPagination(filteredData);
  } else {
    // Clear search
    // imgSearch.src = "../img/search.png";
    searchInput.value = "";
    // Clear URL search parameter
    const url = new URL(window.location);
    url.searchParams.delete("search");
    window.history.pushState({}, "", url);
    currentPage = 1;
    loadData(dataTransaction, currentPage);
    setupPagination(dataTransaction);
  }
});

// Handle browser back/forward to update search
window.addEventListener("popstate", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");
  if (searchQuery) {
    searchInput.value = searchQuery;
    // imgSearch.src = "../img/search-cancel.png";
    const filteredData = dataTransaction.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    currentPage = 1;
    loadData(filteredData, currentPage);
    setupPagination(filteredData);
  } else {
    // imgSearch.src = "../img/search.png";
    searchInput.value = "";
    currentPage = 1;
    loadData(dataTransaction, currentPage);
    setupPagination(dataTransaction);
  }
});

fetchData();
