const table = document.querySelector('table')

let dataTransaction = []

// Fetch Data
async function fetchData() {
  try {
    const response = await fetch('../history.json');
    const data = await response.json();
    dataTransaction = data
    loadData(data)
  } catch (error) {
    console.error("Gagal memuat file JSON:", error);
  }
}

// Load Data Transaction History
function loadData(data){
  table.innerHTML = ''
  for(let i = 0; i < data.length; i++){
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')
    const td5 = document.createElement('td')
    const img = document.createElement('img')
    const img2 = document.createElement('img')
    
    table.append(tr)
    tr.append(td1)
    td1.append(img)
    img.src = data[i].image
    tr.append(td2)
    td2.innerHTML = `<a href="history-transaction-pop-up.html?name=${data[i].name}">${data[i].name}</a>`
    tr.append(td3)
    td3.textContent = data[i].phone
    tr.append(td4)
    if (data[i].typeTransaction === "Transfer" ){
      td4.style.color = 'green'
      td4.textContent = `+Rp. ${data[i].amount.toLocaleString('id')}`
    }else{
      td4.style.color = 'red'
      td4.textContent = `-Rp. ${data[i].amount.toLocaleString('id')}`
    }
    tr.append(td5)
    td5.append(img2)
    img2.src = '../img/trash.png'
    }
  }
  
  console.log(dataTransaction);
  console.log('dataTransaction');
  
  // Pencarian Data
  const search = document.getElementById('searchInput')
  const btnSearch = document.getElementById('btnSearch')
  const imgSearch = document.getElementById('imgSearch')
  btnSearch.addEventListener('click',function (){
    
    // Pengondisian Tombol Search
    if (imgSearch.src.includes('search.png')) {
      imgSearch.src = '../img/search-cancel.png';
      const input = search.value.toLowerCase()
      const filteredData = dataTransaction.filter(item => 
        item.name.toLowerCase().includes(input) ||
        item.phone.toLowerCase().includes(input)
      )
      filteredData.forEach(item => {
        console.log(item.name, item.phone);
      })
      loadData(filteredData)
    } else {
      imgSearch.src = '../img/search.png';
      loadData(dataTransaction)
    }
    
  })
  
  fetchData();