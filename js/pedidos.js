function atualizarStatus(idPedido, status, aluno) {
    const elementoStatus = document.getElementById('status-' + idPedido);
    if (status === 'preparando') {
        elementoStatus.textContent = 'Status: Preparando';
        elementoStatus.style.color = 'orange';
    } else if (status === 'pronto') {
        elementoStatus.textContent = 'Status: Pronto para Retirada';
        elementoStatus.style.color = 'green';
        notificarAluno(aluno);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar pedidos ao carregar a página
    function carregarPedidos() {
        fetch('gerenciar_pedidos.php')
            .then(response => response.json())
            .then(pedidos => {
                const container = document.querySelector('.container');
                container.innerHTML = '<h2>Lista de Pedidos</h2>'; // Resetar a lista

                pedidos.forEach(pedido => {
                    const pedidoDiv = document.createElement('div');
                    pedidoDiv.className = 'pedido';
                    pedidoDiv.id = 'pedido' + pedido.PedidoID;

                    pedidoDiv.innerHTML = `
                        <p><strong>Aluno:</strong> ${pedido.Nome}</p>
                        <p>Pedido #${pedido.PedidoID} - ${pedido.Itens}</p>
                        <button class="status-button" onclick="atualizarStatus(${pedido.PedidoID}, 'Preparando')">Preparando</button>
                        <button class="status-button" onclick="atualizarStatus(${pedido.PedidoID}, 'Pronto')">Pronto</button>
                        <p class="status" id="status-pedido${pedido.PedidoID}">Status: ${pedido.StatusPedido}</p>
                    `;

                    container.appendChild(pedidoDiv);
                });
            })
            .catch(error => console.error('Erro ao carregar pedidos:', error));
    }

    // Função para atualizar o status do pedido
    window.atualizarStatus = function (pedidoId, status) {
        fetch('gerenciar_pedidos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `pedido_id=${pedidoId}&status=${status}`
        })
        .then(response => response.text())
        .then(text => {
            console.log(text); // Exibe a resposta do servidor
            document.getElementById(`status-pedido${pedidoId}`).textContent = `Status: ${status}`;
        })
        .catch(error => console.error('Erro ao atualizar o status:', error));
    };

    // Carregar pedidos ao inicializar a página
    carregarPedidos();
});

