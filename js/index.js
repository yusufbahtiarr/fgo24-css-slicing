// Subscribe
const info = document.getElementById('notifNewsletter')
const input = document.getElementById('newsletter')
let listSubscribe = []
function subscribe() {
  const newsletter = input.value
  if(newsletter === "") {
    info.textContent = '"Email tidak boleh kosong."'
    deleteInfo()
    return
  } 

  // Validasi format email
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletter);
  if (!isValid) {
    info.textContent = 'Format email tidak valid.';
    input.value = ""
    deleteInfo()
    return
  } 

  listSubscribe.push(newsletter)
  localStorage.setItem('subscribes', JSON.stringify(listSubscribe));
  info.textContent = 'Berhasil berlangganan!';
  input.value = ""
  
  //menampilkan isi array
  // const arrSubscribes = JSON.parse(localStorage.getItem('subscribes'));
  // console.log(arrSubscribes);

  deleteInfo()  
}

function deleteInfo(){
  setTimeout(() => {
    info.textContent = ""
  },3000)
}

  // Navbar
  const toggle = document.querySelector('.header-button')

  function toggleMenu(){
    toggle.classList.toggle('show');
    
  }



