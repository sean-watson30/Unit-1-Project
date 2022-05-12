// VARIABLES

const URL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple"
  
// ELEMENT REFERENCES

const $playBtn = $('#playBtn')
const $mainContent = $('main')
const $headerContent = $('header')
const $body = $('body')
const $div = $('div')

// EVENT LISTENERS

$playBtn.on('click', getRiddle)

// FUNCTIONS

// getRiddle uses $.ajax to get info from APi and randomize the riddle question, and call displayRiddle() and displayOptions()
function getRiddle() {
  const randomIndex = Math.floor(Math.random() * 10)
  // get array index from API data (I tried to use .length method, but couldn't figure out how, so I went with hard-coding *10 since the API only has 10 index options)
  $.ajax(URL).then(function(data) {
    const riddle = data.results[randomIndex]
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
  $btnMakerA.addClass('correctAnswer')
  choices.push($btnMakerA)
  
  const $btnMakerW1 = $(`<button>${riddle.incorrect_answers[0]}</button>`)
  $btnMakerW1.addClass('wrongAnswer')
  choices.push($btnMakerW1)
  
  const $btnMakerW2 = $(`<button>${riddle.incorrect_answers[1]}</button>`)
  $btnMakerW2.addClass('wrongAnswer')
  choices.push($btnMakerW2)
  
  const $btnMakerW3 = $(`<button>${riddle.incorrect_answers[2]}</button>`)
  $btnMakerW3.addClass('wrongAnswer')
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
  $mainContent.prepend(win)
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