const dataUser = JSON.parse(localStorage.getItem('currentUser'))

const fullname = document.getElementById('user-name')
const phone = document.getElementById('user-phone')

fullname.textContent = dataUser.name
phone.textContent = dataUser.telephone

const deliveryPrices = {
  bri: 1700,
  dana: 3000,
  bca: 2000,
  gopay: 1500,
  ovo: 1200,
};

const amountInput = document.getElementById("input-amount");
const radios = document.querySelectorAll('input[name="payment"]');

const orderSpan = document.getElementById("order-amount");
const deliverySpan = document.getElementById("delivery");
const taxSpan = document.getElementById("tax-amount");
const subtotalSpan = document.getElementById("sub-total");
const spanInfo = document.getElementById("infoTopup")

let orderAmount = 0;
let deliveryAmount = 0; // default
let taxAmount = 0;

function formatCurrency(num) {
  return `Idr. ${num.toLocaleString("id")}`;
}

function updateOrder(value) {
  orderAmount = parseInt(value) || 0;
  taxAmount = Math.floor(orderAmount * 0.1); // 10% tax
  orderSpan.textContent = formatCurrency(orderAmount);
  taxSpan.textContent = formatCurrency(taxAmount);
  updateSubtotal();
}

function updateDelivery(method) {
  deliveryAmount = deliveryPrices[method] || 0;
  deliverySpan.textContent = formatCurrency(deliveryAmount);
  updateSubtotal();
}

function updateSubtotal() {
  const total = orderAmount + deliveryAmount + taxAmount;
  subtotalSpan.textContent = formatCurrency(total);
}

amountInput.addEventListener("input", (e) => {
  updateOrder(e.target.value);
});

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    updateDelivery(radio.value);
  });
});

updateOrder(amountInput.value);


const btnTopup = document.getElementById('btnTopup')
 
btnTopup.addEventListener('click', function(e) {
  const paymentRadio = document.querySelector(
    'input[name="payment"]:checked'
  );
  if (amountInput.value === "") {
    spanInfo.textContent = '"Silahkan input nominal terlebih dahulu"';
    spanInfo.style.color = "red";
    clearInfo()
    return;  
  }
  if (!paymentRadio) {
    spanInfo.textContent = '"Metode pembayaran belum di pilih"'
    spanInfo.style.color = 'red'
    clearInfo()
    return;
  }
  spanInfo.textContent = '"Topup telah berhasil!"'
  spanInfo.style.color = 'green'
  clearInfo()
});

function clearInfo(){
  setTimeout(()=>{
    spanInfo.textContent = ''
  },3000)
}