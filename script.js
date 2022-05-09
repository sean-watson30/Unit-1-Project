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
// getRiddle uses $.ajax to get info form APi and randomize the riddle question, and call displayRiddle() and displayOptions()
function getRiddle() {
  const randomIndex = Math.floor(Math.random() * 10)
  // console.log(randomIndex)
  // get array index from API data (I tried to use .length method, but couldn't figure out how, so I went with hard-coding *10 since the API only has 10 index options)
  $.ajax(URL).then(function(data) {
    // console.log(data)
    const riddle = data.results[randomIndex]
    // was const riddle = data.results[randomIndex].question...but as I'm referencing later to get answers as well, I thinkk it won't work here, so calling .question below in $riddleText
    displayRiddle(riddle)
    displayOptions(riddle)
  }, function(error) {
    console.log('something went wrong')
  })
} 
// connect the randomIndex riddle to the DOM in the <main> by appending to $mainContent
const displayRiddle = (riddle) => {
  // console.log(riddle)
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
  // console.log(riddle)
  const $btnMakerA = $(`<button>${riddle.correct_answer}</button>`)
  $btnMakerA.addClass('correctAnswer')
  $mainContent.append($btnMakerA)

  const $btnMakerW1 = $(`<button>${riddle.incorrect_answers[0]}</button>`)
  $btnMakerW1.addClass('wrongAnswer')
  $mainContent.append($btnMakerW1)

  const $btnMakerW2 = $(`<button>${riddle.incorrect_answers[1]}</button>`)
  $btnMakerW2.addClass('wrongAnswer')
  $mainContent.append($btnMakerW2)

  const $btnMakerW3 = $(`<button>${riddle.incorrect_answers[2]}</button>`)
  $btnMakerW3.addClass('wrongAnswer')
  $mainContent.append($btnMakerW3)

  $btnMakerA.on('click', playerChoiceCorrect)
  $btnMakerW1.on('click', playerChoiceWrong)
  $btnMakerW2.on('click', playerChoiceWrong)
  $btnMakerW3.on('click', playerChoiceWrong)
}


// write some game logic (if/else, etc) as needed to figure out if the player selected the correct button...render() function needed here?
// might be difficult, will maybe need to look at randomizing the button positions? (stretch goal, not necessarily MVP)...possibly adding them to a randomIndex sorta thing of an array?

// setting initial player selection at null
// const player = {
//   currentChoice: null
// }
// an array of the options for the player to choose?
// const options = ['.correctAnswer', '.wrongAnswer']
// console.log(options[0])


// a function to compare player selection with answers
const playerChoiceCorrect = () => {
 const win = $('<h3>Your answer is correct! The sphinx spares your life...this time.</h3>')
 $mainContent.prepend(win)
}
const playerChoiceWrong = () => {
  const lose = $('<h3>You have answered incorrectly. The sphinx will now take your life!</h3>')
  $mainContent.prepend(lose)
  $mainContent.fadeOut(4000);
}
// see if this can be done with if/else logic, and see if we can get the content of the text of the buttons to use to compare