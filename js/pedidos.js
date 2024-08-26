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

function notificarAluno(aluno) {
    alert(`Olá ${aluno}, seu pedido está pronto para retirada!`);
}
