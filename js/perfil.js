document.getElementById('toggleButton').addEventListener('click', function() {
    var navbarLinks = document.getElementById('navbarLinks');
    navbarLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('perfil.php')
        .then(response => response.json())
        .then(data => {
            if (data && data.success !== false) {
                document.getElementById('nome').textContent = data.Nome;
                document.getElementById('email').textContent = data.Email;
            } else {
                console.error('Erro: ', data.message || 'Erro ao buscar os dados do usuário');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do usuário:', error);
        });
});
