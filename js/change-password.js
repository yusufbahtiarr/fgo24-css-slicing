
const passwordInput = document.querySelectorAll('.data-history > div > form > input');
const passwordHidden = document.querySelectorAll('.data-history > div > form > button');

passwordHidden[0].addEventListener('click', function() {
  if(passwordHidden[0].style.backgroundImage === 'url("../img/password-hidden.png")'){
    passwordInput[0].type = "text"
    passwordHidden[0].style.backgroundImage = 'url("../img/password-open.png")'
  }else{
    passwordInput[0].type = "password"
    passwordHidden[0].style.backgroundImage = 'url("../img/password-hidden.png")'
  }
})

passwordHidden[1].addEventListener('click', function() {
  if(passwordHidden[1].style.backgroundImage === 'url("../img/password-hidden.png")'){
    passwordInput[1].type = "text"
    passwordHidden[1].style.backgroundImage = 'url("../img/password-open.png")'
  }else{
    passwordInput[1].type = "password"
    passwordHidden[1].style.backgroundImage = 'url("../img/password-hidden.png")'
  }
})

passwordHidden[2].addEventListener('click', function() {
  if(passwordHidden[2].style.backgroundImage === 'url("../img/password-hidden.png")'){
    passwordInput[2].type = "text"
    passwordHidden[2].style.backgroundImage = 'url("../img/password-open.png")'
  }else{
    passwordInput[2].type = "password"
    passwordHidden[2].style.backgroundImage = 'url("../img/password-hidden.png")'
  }
})

// Handle Form
const formChangePassword = document.getElementById('formChangePassword')
const spanInfo = document.getElementById('infoValidation')

formChangePassword.addEventListener('submit', function(e) {
  e.preventDefault();

  
  const existingPassword = e.target.existingPassword.value
  const newPassword = e.target.newPassword.value
  const confirmNewPassword = e.target.confirmNewPassword.value

  let dataUser = JSON.parse(localStorage.getItem('dataUser'))
  let currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const userIndex = dataUser.findIndex(user => user.email === currentUser.email)  
  const existingPasswordOld = dataUser[userIndex].password
  if (existingPassword !== existingPasswordOld){
    spanInfo.textContent = 'Inputan Password Lama tidak sama!'
    spanInfo.style.color = 'red'
    clearInfoValidation()
    return
  }
  
  if (newPassword !== confirmNewPassword){
    spanInfo.textContent = 'Inputan Password Baru tidak sama!'
    spanInfo.style.color = 'red'
    clearInfoValidation()
    return
  }

  dataUser[userIndex].password = newPassword
  currentUser.password = newPassword
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
  localStorage.setItem('dataUser', JSON.stringify(dataUser))
  spanInfo.textContent = 'Password berhasil diubah!'
  spanInfo.style.color = 'green'
  clearInfoValidation()
  formChangePassword.reset()

})

function clearInfoValidation(){
  setTimeout(() => {
    spanInfo.textContent = ""
  }, 3000)
}