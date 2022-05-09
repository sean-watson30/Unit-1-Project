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
  $riddleHeader.text('The Sphynx speaks out to you in a supernatural voice: "Answer, if you dare!"')
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
}


// write some game logic (if/else, etc) as needed to figure out if the player selected the correct button...render() function needed here?
// might be difficult, will maybe need to look at randomizing the button positions? (stretch goal, not necessarily MVP)...possibly adding them to a randomIndex sorta thing of an array?