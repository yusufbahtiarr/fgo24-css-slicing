const btnTransfer = document.getElementById('btn-transfer')
const btnTopup = document.getElementById('btn-topup')
const username = document.getElementById('user-account')

const user = JSON.parse(localStorage.getItem('currentUser'))
// username.textContent = user?.name || user?.email?.split('@')[0] 

if (!user) {
  window.location.href = '../index.html'
}

btnTopup.addEventListener('click', function () {
    window.location.href = 'top-up.html';
});
btnTransfer.addEventListener('click', function () {
    window.location.href = 'transfer.html';
});

let dataHistory = []

const boxRight = document.querySelector('.box-right-down')

async function loadData() {
  try {
    const response = await fetch('../history.json');
    const data = await response.json();
    dataTransfer = data;

    // Sekarang kamu bisa menggunakan dataTransfer
    console.log(dataTransfer);
    
    for(let i = 0; i < 9; i++){
      const div = document.createElement('div')
      const div2 = document.createElement('div')
      const div3 = document.createElement('div')
      const transaction = document.createElement('div')
      const img = document.createElement('img')
      const img2 = document.createElement('img')
      const span = document.createElement('span')
      const span2 = document.createElement('span')
      const span3 = document.createElement('span')
      console.log(dataTransfer[i].name);
      console.log(dataTransfer[i].image);
      console.log(dataTransfer[i].typeTransaction);
      boxRight.append(transaction)
      transaction.classList.add('transaction')
      transaction.append(div)
      div.classList.add('transaction-image')
      div.append(img)
      img.src = dataTransfer[i].image
      img.style.height = '48px'
      img.style.width = '48px'
      img.style.borderRadius = '6px'
      transaction.append(div2)
      div2.classList.add('transaction-name')
      div2.append(span)
      div2.append(span2)
      span.textContent = dataTransfer[i].name
      span2.textContent = dataTransfer[i].typeTransaction
      
      transaction.append(div3)
      div3.classList.add('transaction-amount')
      div3.append(span3)
      if (dataTransfer[i].typeTransaction === "Transfer" ){
        span3.style.color = 'green'
        span3.textContent = `+Rp. ${dataTransfer[i].amount.toLocaleString('id')}`
      }else{
        span3.style.color = 'red'
        span3.textContent = `-Rp. ${dataTransfer[i].amount.toLocaleString('id')}`
      }
    }
  } catch (error) {
    console.error("Gagal memuat file JSON:", error);
  }
}
loadData();

function signOut() {
  localStorage.removeItem('currentUser')
  window.location.href = '../index.html'
}



// [{"email":"bahtiar@gmail.com","password":"123","pin":"345456"}]

