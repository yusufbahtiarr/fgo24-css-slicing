// Handle Form
const formChangePin = document.getElementById('formChangePin')
const spanInfo = document.getElementById('infoValidation')

formChangePin.addEventListener('submit', function(e) {
  e.preventDefault();

  const pin = 
  `${e.target.firstNumber.value}${e.target.secondNumber.value}${e.target.thirdNumber.value}${e.target.fourthNumber.value}${e.target.fifthNumber.value}${e.target.sixthNumber.value}` 
  
  console.log(pin);
  
  let dataUser = JSON.parse(localStorage.getItem('dataUser'))
  let currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const emailUser = currentUser.email 
  const userIndex = dataUser.findIndex(user => user.email === emailUser)  
  console.log(dataUser[userIndex]);
  
  dataUser[userIndex].pin = pin
  currentUser.pin = pin
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
  localStorage.setItem('dataUser', JSON.stringify(dataUser))
  spanInfo.textContent = 'Pin berhasil diubah!'
  clearInfoValidation()
  formChangePin.reset()

})

function clearInfoValidation(){
  setTimeout(() => {
    spanInfo.textContent = ""
  }, 3000)
}