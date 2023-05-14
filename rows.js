const rows = document.querySelectorAll(".row");

const onDragOver = (event) => {
  event.preventDefault();
};

const onDrop = (event) => {
  event.preventDefault();
  const draggedCardId = event.dataTransfer.getData("id");
  const draggedCard = document.getElementById(draggedCardId);
  event.target.appendChild(draggedCard);
  console.log("Element has been dropped.");
};
rows.forEach((row) => {
  row.ondragover = onDragOver;
  row.ondrop = onDrop;
});
