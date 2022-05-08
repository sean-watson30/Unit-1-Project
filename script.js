// console.log($) checked that JS and jQuery connected

// VARIABLES
const URL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple"

// ELEMENT REFERENCES
const $playBtn = $('#playBtn')
// console.log($playBtn) playBtn connected
const $mainContent = $('main')
// connecting our <main> like in the walkthrough

// EVENT LISTENERS
$playBtn.on('click', getRiddle)

// FUNCTIONS

function getRiddle() {
  $.ajax(URL).then(function(data) {
    console.log(data)
  }, function(error) {
    console.log('something went wrong')
  })
} 

// const randomIndex = Math.floor(Math.random() * _.length)
// get array index from API data

function displayRiddle() {
// connect the randomIndex riddle to the DOM in the <main> by appending to $mainContent
}

// do I need a getOptions function also?

function displayOptions() {
// get the answer options form the API object and connect them to the answer buttons
  // maybe use DOM to create these buttons, so we can use .text to put the answer right in the buttons themselves (rather than hard-coding button A, B, etc)
}

// write some game logic (if/else, etc) as needed to figure out if the player selected the correct button
  // might be difficult, will maybe need to look at randomizing the button positions? (stretch goal, not necessarily MVP)
// 