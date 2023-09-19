const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".color");
const clearButton = document.getElementById("clear-button");
const tools = document.querySelectorAll(".tool");
let isDrawing = false;
let isErasing = false;

canvas.width = 1200; // Set a larger width for the canvas
canvas.height = 800; // Set a larger height for the canvas

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

function startDrawing(event) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function draw(event) {
  if (!isDrawing) return;
  if (isErasing) {
    ctx.globalCompositeOperation = "destination-out"; // Use eraser
  } else {
    ctx.globalCompositeOperation = "source-over"; // Use pen or brush
  }
  ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

colors.forEach(color => {
  color.addEventListener("click", () => {
    colors.forEach(c => c.classList.remove("selected"));
    color.classList.add("selected");
    ctx.strokeStyle = color.style.backgroundColor;
  });
});

tools.forEach(tool => {
  tool.addEventListener("click", () => {
    tools.forEach(t => t.classList.remove("selected"));
    tool.classList.add("selected");
    isErasing = tool.id === "eraser-tool";
    
    if (isErasing) {
      ctx.lineWidth = 10; // Set line width for eraser
      ctx.strokeStyle = "white"; // Eraser color
    } else if (tool.id === "brush-tool") {
      ctx.lineWidth = 10; // Set a softer line width for brush
      ctx.strokeStyle = colors[0].style.backgroundColor; // Set default color
    } else {
      ctx.lineWidth = 5; // Set a harder line width for pen
      ctx.strokeStyle = colors[0].style.backgroundColor; // Set default color
    }
  });
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
