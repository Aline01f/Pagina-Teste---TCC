function toggleCard(cardId) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card.id !== cardId) {
      card.classList.remove("selected");
      card.querySelector(".card-body").style.maxHeight = null;
    }
  });

  const selectedCard = document.querySelector(`#${cardId}`);
  const selectedCardBody = selectedCard.querySelector(".card-body");

  if (selectedCard.classList.contains("selected")) {
    selectedCard.classList.remove("selected");
    selectedCardBody.style.maxHeight = null;
  } else {
    selectedCard.classList.add("selected");
    selectedCardBody.style.maxHeight = selectedCardBody.scrollHeight + "px";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  fetch('pagamento.php')
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              console.error(data.error);
              document.getElementById('request').innerHTML = 'Erro ao carregar detalhes do pedido.';
              return;
          }

          // Converte ValorTotal e PrecoUnitario para números, se necessário
          const valorTotal = Number(data.ValorTotal);
          const itens = data.itens.map(item => ({
              ...item,
              PrecoUnitario: Number(item.PrecoUnitario)
          }));

          // Atualiza informações do pedido
          const detalhesPedido = `
              <h2>Pedido #${data.PedidoID}</h2>
              <p><strong>Data:</strong> ${new Date(data.DataPedido).toLocaleDateString()} ${new Date(data.DataPedido).toLocaleTimeString()}</p>
              <p><strong>Status:</strong> ${data.StatusPedido}</p>
              <p><strong>Valor Total:</strong> R$ ${valorTotal.toFixed(2)}</p>
              <p><strong>Método de Pagamento:</strong> ${data.MetodoPagamento}</p>
              <p><strong>Endereço de Entrega:</strong> ${data.EnderecoEntrega}</p>
              <h3>Itens do Pedido:</h3>
              <ul>
                  ${itens.map(item => `
                      <li>${item.produtoNome} - Quantidade: ${item.Quantidade} - Preço Unitário: R$ ${item.PrecoUnitario.toFixed(2)}</li>
                  `).join('')}
              </ul>
          `;
          document.querySelector('.request').innerHTML = detalhesPedido;

          // Atualiza o valor total na interface
          document.getElementById('valor-total').innerText = `( ${itens.length} produtos ) R$ ${valorTotal.toFixed(2)}`;
      })
      .catch(error => {
          console.error('Erro ao carregar os detalhes do pedido:', error);
          document.getElementById('request').innerHTML = 'Erro ao carregar detalhes do pedido.';
      });
});

