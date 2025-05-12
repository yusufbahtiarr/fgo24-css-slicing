// Button Password Hide/Show
const passwordInput = document.getElementById('password');
const passwordHidden = document.getElementById('passwordHidden');

passwordHidden.addEventListener('click', function() {
  if(passwordHidden.style.backgroundImage === 'url("../img/password-hidden.png")'){
    passwordInput.type = "text"
    passwordHidden.style.backgroundImage = 'url("../img/password-open.png")'
  }else{
    passwordInput.type = "password"
    passwordHidden.style.backgroundImage = 'url("../img/password-hidden.png")'
  }
})


// Handle Form Login
const formLogin = document.getElementById('formLogin')
const spanInfo = document.getElementById('infoValidation')

formLogin.addEventListener('submit', function(e) {
  e.preventDefault();
  let dataUser = JSON.parse(localStorage.getItem('dataUser'))
  // console.log(dataUser);
  const email = e.target.email.value
  const password = e.target.password.value
  

  // Cari user yang cocok
  const matchUser = dataUser.find(user => user.email === email && user.password === password)
  
  if(matchUser) {
    // Encode to base64
    // encodedEmail = btoa(matchUser.email)
    // encodedPassword = btoa(matchUser.password)
    // console.log('Login Berhasil');

    localStorage.setItem('currentUser', JSON.stringify(matchUser))
    window.location.href = "dashboard.html"
  }else{
    console.log('Email atau password salah');
    spanInfo.textContent = 'Email atau password salah'
    clearInfo()
  }

function clearInfo(){
  setTimeout(() => {
    spanInfo.textContent = ""
  }, 3000)
}

  
  
  
    
  // const register = []

  // const email = e.target.email.value
  // const password = e.target.password.value
  // const confirmPassword = e.target.confirmPassword.value

  // if(password !== confirmPassword){
  //   spanInfo.textContent = "Password tidak sama. Silahkan ulangi lagi";
  //   clearInfoValidation()
  //   return;
  // }else {
  //   register.push({
  //     email,
  //     password,
  //   })
  
  //   localStorage.setItem('registerData', JSON.stringify(register))
  //   window.location.href = '../pages/enter-pin.html'
  // }

})

function clearInfoValidation(){
  setTimeout(() => {
    spanInfo.textContent = ""
  }, 3000)
}