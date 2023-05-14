const cards = document.querySelectorAll(".card");
const addCard = document.querySelector("#addCard");

/* Add Card Logic */

const addCardToBank = (event) => {
  const card = createCard();
  const bank = document.querySelector("#bank");
  bank.appendChild(card);
};

addCard.onclick = addCardToBank;

/* Card Logic */
const createCard = (id, cardData) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("draggable", "true");
  card.id = id || Date.now();
  card.ondragstart = onDragStart;
  card.ondragend = onDragEnd;
  card.onclick = deleteCard;
  if (cardData && cardData.imageSrc) {
    const image = new Image(100, 85);
    image.src = cardData.imageSrc;
    image.style.pointerEvents = "none";
    card.appendChild(image);
  } else {
    appendImage(card);
  }
  return card;
};

const appendImage = (card) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/x-png, image/gif, image/jpeg");
  input.style.visibility = "hidden";
  input.onchange = () => {
    const image = new Image(100, 85);
    const file = input.files[0];
    console.log(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      image.src = event.target.result;
      image.style.pointerEvents = "none";
      card.appendChild(image);
    };
    reader.readAsDataURL(file);

    /* Save Data to Local Storage */
    const cardData = {
      imageSrc: image.src,
      row: card.parentNode.querySelector(".label")?.innerText,
    };
    window.localStorage.setItem(card.id, JSON.stringify(cardData));
    // JSON.stringify(cardData) => " { imageSrc: ..., row: ... }"
  };
  input.click();
};

const deleteCard = (event) => {
  const willDelete = window.confirm("Do you want to delete this card?");
  if (willDelete) {
    event.target.remove();
    window.localStorage.removeItem(event.target.id);
  }
};

const onDragStart = (event) => {
  console.log("Starting to drag the element...");
  event.dataTransfer.setData("id", event.target.id);
  setTimeout(() => {
    event.target.style.visiblity = "hidden";
  }, 50);
};

const onDragEnd = (event) => {
  event.target.style.visiblity = "visible";
  console.log("Drag has been ended.");
};

cards.forEach((card) => {
  card.ondragstart = onDragStart;
  card.ondragend = onDragEnd;
});

/* Logic Upon First Window Load */
window.onload = () => {
  const cardBank = document.querySelector("#bank");
  const keys = Object.keys(window.localStorage);
  keys.forEach((key) => {
    const cardData = JSON.parse(window.localStorage.getItem(key));
    const loadedCard = createCard(key, cardData);
    const rows = document.querySelectorAll(".row");
    const correctRow = Array.from(rows).find((row) => {
      return row.querySelector(".label").innerText === cardData.row;
    });
    if (correctRow) {
      correctRow.appendChild(loadedCard);
    } else {
      cardBank.appendChild(loadedCard);
    }
  });
};
