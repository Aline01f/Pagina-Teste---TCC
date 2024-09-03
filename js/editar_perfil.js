document.getElementById('toggleButton').addEventListener('click', function() {
    var navbarLinks = document.getElementById('navbarLinks');
    navbarLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('editar_perfil.php') // Substitua pelo seu arquivo que retorna os dados do usuário
        .then(response => response.json())
        .then(data => {
            // Verifique se a resposta contém os dados esperados
            if (data && data.Nome) {
                document.getElementById('nomeUsuario').textContent = data.Nome;
            } else {
                document.getElementById('nomeUsuario').textContent = 'Usuário';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do usuário:', error);
            document.getElementById('nomeUsuario').textContent = 'Usuário';
        });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('editar_perfil.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('nome').value = data.Nome;
            document.getElementById('email').value = data.Email;
        });

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch('editar_perfil.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Mudei para json aqui para tratar a resposta
        .then(data => {
            alert(data.message); // Exibir mensagem da resposta
        });
    });

    document.querySelector('.excluir-conta').addEventListener('click', function() {
        if (confirm("Tem certeza que deseja excluir sua conta?")) {
            fetch('editar_perfil.php', {
                method: 'POST',
                body: JSON.stringify({ delete: true }), // Enviando o campo delete
                headers: {
                    'Content-Type': 'application/json' // Definindo cabeçalho para JSON
                }
            })            
            .then(response => response.json()) // Mudando para tratar a resposta como JSON
            .then(data => {
                alert(data.message); // Exibir mensagem da resposta
                if (data.success) {
                    window.location.href = './login.html'; // Redireciona se a conta foi excluída
                }
            });
        }
    });
});
