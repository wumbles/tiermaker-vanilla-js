const cards = document.querySelectorAll(".card");

const onDragStart = (event) => {
  console.log("Starting to drag the element...");
  event.dataTransfer.setData("id", event.target.id);
};

const onDragEnd = (event) => {
  console.log("Drag has been ended.");
};

cards.forEach((card) => {
  card.ondragstart = onDragStart;
  card.ondragend = onDragEnd;
});
