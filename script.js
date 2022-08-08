const gameContainer = document.getElementById("game");
let flipped = 0;

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

// TODO: Implement this function!
let arr = [];
let matched = 0;
let score = 0;
let pause = false;
let bestScore = localStorage.getItem("best score");
let p = document.getElementById("bestScore");
p.innerText = bestScore;
function handleCardClick(event) {
 if (pause) return;
if(flipped < 1){
  let firstCard = event.target.className;
  flipped ++;
  arr.push(firstCard);
  event.target.classList.add('flipped');}
  else if(flipped >= 1){
    if (event.target.classList.contains("flipped")) return;
    if(event.target.className === arr[0]){
      event.target.classList.add('flipped');
      arr = arr.splice(1,1);
      matched = matched +2;
      if (matched === COLORS.length){
        alert("You won!");
        if(score < bestScore){
          let bestScore = localStorage.setItem("best score",score);}
      }
    }

    else{
      pause = true;
      let scoreCard = document.getElementById('score');
      score++;
      scoreCard.innerText = score;
      event.target.classList.add('flipped');
      flipped = 0;

      setTimeout(function(){
        event.target.classList.remove('flipped');
        let colorVal = arr[0];
        document.querySelector('.' + colorVal+ '.flipped').classList.remove('flipped');
        arr = arr.splice(1,1);
        pause = false;
      },'1000');

      firstCard = "";
    
    }
    flipped = 0;
    

  
}

}




// when the DOM loads
createDivsForColors(shuffledColors);
