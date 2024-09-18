let color = "black";
let isDrawing = false; // track if the mouse button is being held down

document.addEventListener("DOMContentLoaded", () => {
  CreateBoard(16);

  let draw = document.querySelector(".draw");

  // button to change board size
  let btn_popup = document.querySelector(".pop-up");
  btn_popup.addEventListener("click", () => {
    let size = getSize();
    if (size) { // Proceed only if size is valid (exists)
      CreateBoard(size);
    }
  });

  const container = document.querySelector('.container');
  
  // listeners for mouse events to track drawing state
  container.addEventListener("mousedown", () => {
    isDrawing = true; // start drawing when mouse button is pressed inside the container
    draw.textContent = "drawing now..."; 
  });

  container.addEventListener("mouseup", () => {
    isDrawing = false; // stop drawing when mouse button is released
    draw.textContent = "not drawing now."; 
  });

  container.addEventListener("mouseleave", () => {
    isDrawing = false; 
    draw.textContent = "not drawing now."; 
  });

  container.addEventListener("mousemove", (event) => {
    if (isDrawing) {
      colorDiv(event); 
    }
  });
});

let CreateBoard = (size) => {
  const container = document.querySelector('.container');

  while (container.firstChild) { // clear board
    container.removeChild(container.firstChild);
  } 

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`; 

  let div_number = size * size;

  for (let i = 0; i < div_number; i++) {
    let div = document.createElement("div");
    div.addEventListener("mousedown", colorDiv); // Allow immediate drawing on mouse click
    container.insertAdjacentElement("beforeend", div);
  }
};

let getSize = () => {
  let input = prompt("Input size of the Etch-A-Sketch board (just a singular number)");
  let message = document.querySelector(".message");

  if (!input) {
    message.textContent = "Please provide a number";
    return null;
  }

  input = Number(input); // Convert input to a number

  if (isNaN(input) || input <= 0 || input > 100) {
    message.textContent = "Please input a number bigger than 0 and smaller than 100";
    return null;
  }

  message.textContent = "Input completed. Now you can draw!";
  return input;
};

const colorDiv = (event) => {
  if (isDrawing || event.type === "mousedown") { 
    if (color === "random") {
      event.target.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } else if (color === "eraser") {
      event.target.style.backgroundColor = "#ffffff";
    }
    else {
      event.target.style.backgroundColor = color;
    }
  }
};

const pickColor = (colorPick) => {
  color = colorPick;
};

const resetBoard = () => {
  let divs = document.querySelectorAll(".container div"); 

  divs.forEach((div) => div.style.backgroundColor = "white");
};
