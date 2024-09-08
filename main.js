let color = "black";
let isDrawing = false; // Track if the mouse button is being held down

document.addEventListener("DOMContentLoaded", () => {
  CreateBoard(16);

  // Ensure the .draw element is selected correctly
  let draw = document.querySelector(".draw");

  // Button to change board size
  let btn_popup = document.querySelector(".pop-up");
  btn_popup.addEventListener("click", () => {
    let size = getSize();
    CreateBoard(size);
  });

  // Listen for mouse events to track drawing state
  const container = document.querySelector('.container');

  container.addEventListener("mousedown", () => {
    isDrawing = true; // Start drawing when mouse button is pressed inside the container
    draw.textContent = "drawing now..."; // Update .draw element when drawing starts
  });

  container.addEventListener("mouseup", () => {
    isDrawing = false; // Stop drawing when mouse button is released
    draw.textContent = "not drawing now."; // Update .draw element when drawing stops
  });

  container.addEventListener("mouseleave", () => {
    isDrawing = false; // Stop drawing when mouse leaves the container
    draw.textContent = "not drawing now."; // Update .draw element when drawing stops
  });

  container.addEventListener("mousemove", (event) => {
    if (isDrawing) {
      colorDiv(event); // Draw if the mouse is moving while the button is held down
    }
  });
});

let CreateBoard = (size) => {
  const container = document.querySelector('.container');
  container.innerHTML = ''; // Clear previous board
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

  if (input === "") {
    message.textContent = "Please provide a number";
  } else if (input < 0 || input > 100) {
    message.textContent = "Please input a number bigger than 0 and smaller than 100";
  } else {
    message.textContent = "Input completed. Now you can draw!";
    return input;
  }
};

const colorDiv = (event) => {
  if (isDrawing || event.type === "mousedown") { // Draw when mouse button is held down
    if (color === "random") {
      event.target.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } else {
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
