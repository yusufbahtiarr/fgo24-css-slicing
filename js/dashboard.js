const btnTransfer = document.getElementById('btn-transfer')
const btnTopup = document.getElementById('btn-topup')

btnTopup.addEventListener('click', function () {
    window.location.href = 'top-up.html';
});
btnTransfer.addEventListener('click', function () {
    window.location.href = 'transfer.html';
});

const image = document.querySelectorAll('.transaction-image > img')
const name = document.querySelectorAll('.transaction-name > span:first-child')

let dataHistory = []
// console.log(image[1]);
// console.log(name[1]);

//Fetch Data

function fetchData() {
  fetch('https://randomuser.me/api/?results=20') // ambil 20 user acak
    .then(response => response.json())
    .then(data => {
      const simplifiedUsers = data.results.map(user => ({
        name: `${user.name.first} ${user.name.last}`,
        phone: user.phone,
        image: user.picture.large
      }))

      dataHistory = simplifiedUsers
      // console.log(simplifiedUsers);

        // Tampilkan data ke elemen
      dataHistory.forEach((item, index) => {
        if (image[index] && name[index]) {
          image[index].src = item.image;
          name[index].textContent = item.name;

          // console.log(item.name, item.image);
        }
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
  })
}
fetchData()

dataHistory.forEach((item, index) =>{
  image[index].src = item.image
  name[index].textContent = item.name
  console.log(image[index]);
  console.log(name[index]);
  console.log(item.name);
  console.log(item.image);
})