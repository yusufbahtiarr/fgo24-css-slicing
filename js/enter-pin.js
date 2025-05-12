// Handle Form
const formPin = document.getElementById('formPin')
const cekData = localStorage.getItem('registerData')
const info = document.getElementById('information')

// console.log(registerData);

if (cekData.length == "") {
  window.location.href = 'register.html';
}

formPin.addEventListener('submit', function(e) {
  e.preventDefault();
  const pin = 
  `${e.target.firstNumber.value}${e.target.secondNumber.value}${e.target.thirdNumber.value}${e.target.fourthNumber.value}${e.target.fifthNumber.value}${e.target.sixthNumber.value}` 
  
  formPin.reset()
  const registerData = JSON.parse(localStorage.getItem('registerData'))

  if (registerData.length > 0){
    registerData[registerData.length - 1].pin = pin
  
  
    localStorage.setItem('registerData', JSON.stringify(registerData))
    
    const latestUser = registerData[registerData.length - 1];
    let dataUser = JSON.parse(localStorage.getItem('dataUser')) || []

    dataUser.push(latestUser)

    localStorage.setItem('dataUser', JSON.stringify(dataUser));
    localStorage.removeItem('registerData')
    console.log(dataUser);

    info.textContent = 'Registrasi berhasil! Anda akan diarahkan ke halaman utama dalam 3 detik.';

    setTimeout(() => {
      window.location.href = '../index.html';
    }, 3000);    
  } 
  }
)

// [{"email":"aaa@aaaa","password":"123","pin":"257890"},
// {"email":"bbb@aaaa","password":"444","pin":"978978"},
// [{"email":"asdad@asdasd","password":"1234","pin":"256867"}],
// {"email":"asdas@sdfsdf","password":"1231","pin":"225676"}]