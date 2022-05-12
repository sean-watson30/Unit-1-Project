// VARIABLES

const URLeasy = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple"
const URLmedium = "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple"
  
// ELEMENT REFERENCES

const $playBtn = $('#playBtn')
const $playAgain = $('#playAgain')
const $mainContent = $('main')
const $headerContent = $('header')
const $body = $('body')
const $div = $('div')

// EVENT LISTENERS

$playBtn.on('click', getRiddleEasy)

// FUNCTIONS

function getRiddleEasy() {
  const randomIndex = Math.floor(Math.random() * 10)
  $.ajax(URLeasy).then(function(data) {
    const riddle = data.results[randomIndex]
    displayRiddle(riddle)
    displayOptions(riddle)
  }, function(error) {
    console.log('something went wrong')
  })
} 

function getRiddleMedium() {
  const randomIndex = Math.floor(Math.random() * 10)
  $.ajax(URLmedium).then(function(data) {
    const riddle = data.results[randomIndex]
    console.log(riddle)
    displayRiddle(riddle)
    displayOptions(riddle)
  }, function(error) {
    console.log('something went wrong')
  })
}
// connect the randomIndex riddle to the DOM in the <main> by appending to $mainContent
const displayRiddle = (riddle) => {
  $mainContent.empty();
  
  const $riddleHeader = $('<h2>')
  $riddleHeader.text('The Sphinx speaks out to you in a supernatural voice: "Answer the following, if you dare!"')
  $mainContent.append($riddleHeader)
  
  const $riddleText = $('<p>')
  $riddleText.text(riddle.question)
  $mainContent.append($riddleText)
  
}
// connect the answers/options as buttons to the DOM in the <main>
const displayOptions = (riddle) => {
  const choices = []
  
  const $btnMakerA = $(`<button>${riddle.correct_answer}</button>`)
  choices.push($btnMakerA)
  
  const $btnMakerW1 = $(`<button>${riddle.incorrect_answers[0]}</button>`)
  choices.push($btnMakerW1)
  
  const $btnMakerW2 = $(`<button>${riddle.incorrect_answers[1]}</button>`)
  choices.push($btnMakerW2)
  
  const $btnMakerW3 = $(`<button>${riddle.incorrect_answers[2]}</button>`)
  choices.push($btnMakerW3)
  
  const shuffleOptions = (choices) => {
    choices.sort(() => Math.random() - 0.5);
  }
  shuffleOptions(choices)
  $mainContent.append(choices)
  
  $btnMakerA.on('click', playerChoiceCorrect)
  $btnMakerW1.on('click', playerChoiceWrong)
  $btnMakerW2.on('click', playerChoiceWrong)
  $btnMakerW3.on('click', playerChoiceWrong)
}

// a function to compare player selection with answers
const playerChoiceCorrect = () => {
  $mainContent.empty();
  
  const win = $('<h1>Your answer is correct! The sphinx spares your life...this time.</h1>')
  $mainContent.append(win)
  
  const $playAgain = $('<button id="playAgain">Play Again?</button>')
  $mainContent.append($playAgain);
  $playAgain.on('click', getRiddleMedium)
}
const playerChoiceWrong = () => {
  $div.empty();
  document.body.style.backgroundImage='none'
  
  const $sphinx = $('<img src="https://i.imgur.com/bvYiesw.png">')
  $sphinx.addClass('imgSphinx');
  $div.prepend($sphinx);
  $div.fadeOut(8000);
  
  const lose = $('<h1 class="lostText">You have answered incorrectly. The sphinx will now take your life!!!!</h1>')
  $body.prepend(lose)
  
  // const $startOver = $('<button id="playBtn">Play Again?</button>')
  // $body.prepend($startOver);
  // to later add a start over button to refresh page
}