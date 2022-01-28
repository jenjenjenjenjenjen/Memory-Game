const gameContainer = document.getElementById("game");
let cardsFlipped = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

const h1 = document.querySelector('h1');

let restartButton = document.createElement('button');
h1.append(restartButton);
restartButton.innerText = "Restart";


let clickCount = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  clickCount++;
  event.target.style.backgroundColor = event.target.className;
    event.target.classList.add('flipped');
    let flipped = document.querySelectorAll('.flipped');
    for (let i = 0; i < flipped.length; i++) {
       if (clickCount === 2 && flipped[0].className === flipped[1].className) {
        flipped[0].classList.remove('flipped');
        flipped[1].classList.remove('flipped');
        flipped[0].classList.add('match');
        flipped[1].classList.add('match');
        flipped[0].removeEventListener('click', handleCardClick);
        flipped[1].removeEventListener('click', handleCardClick);
           clickCount = 0;
           cardsFlipped += 2;
       } 
       else if (clickCount === 2) {
        setTimeout (function() {
            flipped[0].style.backgroundColor = '';
            flipped[1].style.backgroundColor = '';
            flipped[0].classList.remove('flipped');
            flipped[1].classList.remove('flipped');
            clickCount = 0;
        }, 1000)
    }
    }
    if (cardsFlipped === COLORS.length) alert('YOU WIN!');
}

restartButton.addEventListener('click', function () {
    window.location.reload();
})



// when the DOM loads
createDivsForColors(shuffledColors);
