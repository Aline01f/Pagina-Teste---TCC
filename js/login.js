var formSignin = document.querySelector('#signin');
var formSignup = document.querySelector('#signup');
var btnColor = document.querySelector('.btnColor');

document.querySelector('#btnSignin')
  .addEventListener('click', () => {
    formSignin.style.left = "25px";
    formSignup.style.left = "450px";
    btnColor.style.left = "0px";
});

document.querySelector('#btnSignup')
  .addEventListener('click', () => {
    formSignin.style.left = "-450px";
    formSignup.style.left = "25px";
    btnColor.style.left = "110px";
});

function logar(event) {
  event.preventDefault(); // Previnir variaveis

  var loginEmail = document.getElementById('loginEmail').value;
  var loginPassword = document.getElementById('loginPassword').value;

  var signupEmail = document.getElementById('signupEmail').value;
  var signupPassword = document.getElementById('signupPassword').value;
  var signupPasswordConfirm = document.getElementById('signupPasswordConfirm').value;

  // Verifica se o email e a senha do login correspondem ao cadastro
  if (loginEmail === signupEmail && loginPassword === signupPassword) {
    alert('Sucesso');
    // Save data to local storage or session storage
    localStorage.setItem('email', loginEmail);
    // Redirecionar página login para a pagina loading
    window.location.href = "loading.html";
  } else {
    alert('Usuario ou senha incorretos');
  }
}
