const passwordInput = document.getElementById("password");
const passwordHidden = document.getElementById("passwordHidden");

const confirmInput = document.getElementById("confirmPassword");
const confirmHidden = document.getElementById("passwordConfirmHidden");

passwordHidden.addEventListener("click", function () {
  if (
    passwordHidden.style.backgroundImage === 'url("../img/password-hidden.png")'
  ) {
    passwordInput.type = "text";
    passwordHidden.style.backgroundImage = 'url("../img/password-open.png")';
  } else {
    passwordInput.type = "password";
    passwordHidden.style.backgroundImage = 'url("../img/password-hidden.png")';
  }
});

passwordConfirmHidden.addEventListener("click", function () {
  if (
    passwordConfirmHidden.style.backgroundImage ===
    'url("../img/password-hidden.png")'
  ) {
    confirmInput.type = "text";
    passwordConfirmHidden.style.backgroundImage =
      'url("../img/password-open.png")';
  } else {
    confirmInput.type = "password";
    passwordConfirmHidden.style.backgroundImage =
      'url("../img/password-hidden.png")';
  }
});

// Handle Form
const formRegister = document.getElementById("formRegister");
const spanInfo = document.getElementById("infoValidation");

formRegister.addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.removeItem("registerData");

  const register = [];

  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  const dataUser = JSON.parse(localStorage.getItem("dataUser")) || [];
  console.log(dataUser);

  if (
    email &&
    dataUser.some((user) => user.email?.toLowerCase() === email.toLowerCase())
  ) {
    spanInfo.textContent = "Email sudah terdaftar!";
    clearInfoValidation();
    return;
  }

  if (password !== confirmPassword) {
    spanInfo.textContent = "Password tidak sama. Silahkan ulangi lagi";
    clearInfoValidation();
    return;
  } else {
    register.push({
      email,
      password,
    });

    localStorage.setItem("registerData", JSON.stringify(register));
    window.location.href = "../pages/enter-pin.html";
  }
});

function clearInfoValidation() {
  setTimeout(() => {
    spanInfo.textContent = "";
  }, 3000);
}
