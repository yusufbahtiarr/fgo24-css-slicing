const listHistory = document.querySelector('.list-history')
const divList = document.querySelector('.list-history > div')
const image = document.querySelector('.list-history > div > img:first-child')
const name = document.querySelector('.list-history > div > span:nth-of-type(1)')
const telephone = document.querySelector('.list-history > div > span:nth-of-type(2)')
const star = document.querySelector('.list-history > div > img:last-child')

async function loadData() {
  try {
    const response = await fetch('../history.json');
    const data = await response.json();
    dataTransfer = data;

    // Sekarang kamu bisa menggunakan dataTransfer
    console.log(dataTransfer);
    
    for(let i = 0; i < 9; i++){
      const div = document.createElement('div')
      const img = document.createElement('img')
      const img2 = document.createElement('img')
      const span = document.createElement('span')
      const span2 = document.createElement('span')
      console.log(dataTransfer[i].name);
      listHistory.append(div)
      div.append(img)
      div.append(span)
      div.append(span2)
      div.append(img2)
      img.src = dataTransfer[i].image
      img.style.height = '48px'
      img.style.width = '48px'
      img.style.borderRadius = '6px'
      span.textContent = dataTransfer[i].name
      span2.textContent = dataTransfer[i].phone
      img2.src = '../img/star.png'

    }
  } catch (error) {
    console.error("Gagal memuat file JSON:", error);
  }
}

loadData();


