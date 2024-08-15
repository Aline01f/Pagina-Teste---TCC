document.addEventListener('DOMContentLoaded', function() {
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
});

function logar(event) {
  console.log("Função logar chamada"); // Adicione esta linha
  event.preventDefault();

  var email = document.getElementById('loginEmail').value;
  var senha = document.getElementById('loginPassword').value;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "login.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        var response = JSON.parse(xhr.responseText.trim());
        console.log(response); // Adicione esta linha para verificar a resposta
        if (response.success) {
          window.location.href = "loading.html";
        } else {
          alert(response.message);
        }
      } catch (e) {
        alert("Erro ao processar resposta do servidor.");
      }
    } else {
      alert("Erro ao tentar logar.");
    }
  };

  xhr.send("email=" + encodeURIComponent(email) + "&senha=" + encodeURIComponent(senha));
}


function cadastrar(event) {
  event.preventDefault();

  var nome = document.getElementById('signupNome').value;
  var email = document.getElementById('signupEmail').value;
  var senha = document.getElementById('signupPassword').value;
  var senhaConfirmacao = document.getElementById('signupPasswordConfirm').value;

  if (senha !== senhaConfirmacao) {
    alert("As senhas não coincidem.");
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../cadastrar.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText.trim();
      alert(response);
      if (response === "Cadastro realizado com sucesso!") {
        window.location.href = "login.html";
      }
    }
  };
  xhr.send("nome=" + encodeURIComponent(nome) +
           "&email=" + encodeURIComponent(email) +
           "&senha=" + encodeURIComponent(senha));
}