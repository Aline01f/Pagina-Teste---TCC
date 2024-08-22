document.addEventListener('DOMContentLoaded', function() {
  var formEntrar = document.querySelector('#formEntrar');
  var formCadastrar = document.querySelector('#formCadastrar');
  var corBotao = document.querySelector('.corBotao');

  document.querySelector('#btnEntrar')
    .addEventListener('click', () => {
      formEntrar.style.left = "25px";
      formCadastrar.style.left = "450px";
      corBotao.style.left = "0px";
  });

  document.querySelector('#btnCadastrar')
    .addEventListener('click', () => {
      formEntrar.style.left = "-450px";
      formCadastrar.style.left = "25px";
      corBotao.style.left = "110px";
  });
});

function logar(event) {
  console.log("Função logar chamada"); // Adicione esta linha
  event.preventDefault();

  var email = document.getElementById('emailEntrar').value;
  var senha = document.getElementById('senhaEntrar').value;

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

  var nome = document.getElementById('nomeCadastrar').value;
  var email = document.getElementById('emailCadastrar').value;
  var senha = document.getElementById('senhaCadastrar').value;
  var senhaConfirmacao = document.getElementById('confirmarSenhaCadastrar').value;

  if (senha !== senhaConfirmacao) {
    alert("As senhas não coincidem.");
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../cadastrar.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = xhr.responseText.trim();
        alert(response); // Mostra a mensagem retornada pelo servidor
      } else {
        alert("Erro ao tentar cadastrar.");
      }
    }
  };
  xhr.send("nome=" + encodeURIComponent(nome) +
           "&email=" + encodeURIComponent(email) +
           "&senha=" + encodeURIComponent(senha));
}





