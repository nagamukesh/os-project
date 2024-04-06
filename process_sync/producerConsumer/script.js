// Buffer to store items
const buffer = [];

// Maximum buffer size
const bufferSize = 10;

// Function to produce item
const fruits = ["apple", "banana", "orange", "grape", "mango"];
const fruitBasket = document.getElementById("fruit-basket");

function produce() {
  if (buffer.length < bufferSize) {
    const randomIndex = Math.floor(Math.random() * fruits.length);
    const fruit = fruits[randomIndex];
    buffer.push(fruit);
    updateBufferDisplay();
    displayFruit(fruit);
  } else {
    console.log("Buffer is full. Cannot produce item.");
    displayWarning("Buffer is full. Cannot produce item.");
  }
}

function consume() {
  if (buffer.length > 0) {
    const consumedFruit = buffer.shift();
    updateBufferDisplay();
    removeFruit(consumedFruit);
  } else {
    console.log("Buffer is empty. Cannot consume item.");
    displayWarning("Buffer is empty. Cannot consume item.");
  }
}

function updateBufferDisplay() {
  const bufferContent = document.getElementById("buffer-content");
  bufferContent.textContent = buffer.join(", ");
}

function displayFruit(fruit) {
  const fruitImage = new Image();
  const imageFormats = ["jpg", "jpeg"]; // Array of image formats
  let fruitImagePath = ""; // Variable to store the image path
  
  fruitImage.onload = function() {
    fruitImage.classList.add("fruit-image");
    fruitBasket.appendChild(fruitImage);
  };

  fruitImage.onerror = function() {
    console.log(`Image not found for ${fruit}`);
  };

  for (let i = 0; i < imageFormats.length; i++) {
    const imageFormat = imageFormats[i];
    const imagePath = `${fruit}.${imageFormat}`;
    fruitImage.src = imagePath;
    fruitImagePath = imagePath;

    if (fruitImage.complete) {
      break;
    }
  }

  if (fruitImagePath === "") {
    console.log(`Image not found for ${fruit}`);
  }
}

function removeFruit(fruit) {
  const fruitImages = fruitBasket.getElementsByClassName("fruit-image");
  for (let i = 0; i < fruitImages.length; i++) {
    if (fruitImages[i].src.endsWith(`${fruit}.jpg`) || fruitImages[i].src.endsWith(`${fruit}.jpeg`)) {
      fruitBasket.removeChild(fruitImages[i]);
      break;
    }
  }
}
function displayWarning(message) {
  const warningContainer = document.getElementById("warning-container");
  const warningMessage = document.createElement("div");
  warningMessage.classList.add("warning-message");
  warningMessage.textContent = message;
  warningContainer.appendChild(warningMessage);

  setTimeout(function() {
    warningContainer.removeChild(warningMessage);
  }, 2000);
}

