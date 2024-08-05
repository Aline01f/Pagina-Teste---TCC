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
