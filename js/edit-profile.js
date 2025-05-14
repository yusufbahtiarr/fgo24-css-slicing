const formProfile = document.getElementById('formEditProfile')
const email = document.querySelector('.btn-input:nth-of-type(3)')
const spanInfo = document.getElementById('infoValidation')
const fullname = document.getElementById('name')
const telephone = document.getElementById('telephone')

const dataUser = JSON.parse(localStorage.getItem('dataUser'))
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

const user = localStorage.getItem('currentUser')

if (!user) {
  window.location.href = '../index.html'
}

const emailUser = currentUser.email
const userIndex = dataUser.findIndex(user => user.email === emailUser)
email.value = emailUser
currentUser.name ? fullname.value = currentUser.name : ""
currentUser.telephone ? telephone.value = currentUser.telephone : ""


formProfile.addEventListener('submit', function(e) {
  e.preventDefault()
  const name = e.target.name.value
  const telephone = e.target.telephone.value
  const email = e.target.email.value

  dataUser[userIndex].name = name
  dataUser[userIndex].telephone = telephone
  dataUser[userIndex].email = email
  currentUser.name = name
  currentUser.telephone = telephone
  currentUser.email = email
  localStorage.setItem('dataUser', JSON.stringify(dataUser))
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
  spanInfo.textContent = '"Data Profile berhasil diperbaharui"'
  clearInfoValidation()
  formProfile.reset()

})

function clearInfoValidation(){
  setTimeout(() => {
    spanInfo.textContent = ""
  }, 3000)
}


