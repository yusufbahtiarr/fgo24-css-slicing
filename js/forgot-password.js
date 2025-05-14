const input =  document.getElementById('email')
const btnSubmit =  document.getElementById('btnSubmit')
const span =  document.getElementById('information')


btnSubmit.addEventListener('click', function() {
  const dataUser = JSON.parse(localStorage.getItem('dataUser'))
  // console.log(dataUser);
  const email = input.value.toLowerCase()
  // console.log(email);
  
  const findUser = dataUser.find(item => item.email.toLowerCase() === email)
  // console.log(findUser);
  if(findUser) {
    span.textContent = 'Silahkan cek inbox email anda'
    span.style.color = 'green'
    input.value =""
    clearInfo()
  }else{
    span.textContent = 'Email belum terdaftar!'
    span.style.color = 'red'
    input.value =""
    clearInfo()
  }
})

function clearInfo(){
  setTimeout(() =>{
    span.textContent = ""
  }, 3000)
}