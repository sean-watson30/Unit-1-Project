const URLs = {
  easy: "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple",
  medium: "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple",
  hard: "https://opentdb.com/api.php?amount=10&category=20&difficulty=hard&type=multiple",
} 

const $playBtn = $('#playBtn')
const $playAgain = $('#playAgain')
const $mainContent = $('main')
const $headerContent = $('header')
const $body = $('body')
const $div = $('div')
const $retry = $('#retry')

$playBtn.on('click', start1)

function start1() { getRiddle(1) } 
function start2() { getRiddle(2) } 
function start3() { getRiddle(3) } 

function getRiddle(round) {
  const randomIndex = Math.floor(Math.random() * 10)
  let URL
  if (round === 1) { URL = URLs.easy }
  else if (round === 2) { URL = URLs.medium }
  else if (round === 3) { URL = URLs.hard }
  $.ajax(URL).then(function(data) {
    const riddle = data.results[randomIndex]
    displayRiddle(riddle)
    displayOptions(riddle, round)
  }, function(error) {
    console.log('something went wrong')
  })
} 

const displayRiddle = (riddle) => {
  $mainContent.empty();
  const $riddleHeader = $('<h2>')
  $riddleHeader.text('The Sphinx speaks out to you in a supernatural voice: "Answer the following, if you dare!"')
  $mainContent.append($riddleHeader)
  const $riddleText = $('<p>')
  $riddleText.text(riddle.question)
  $mainContent.append($riddleText)  
}

const displayOptions = (riddle, round) => {
  const choices = []
  const $btnMakerA = $(`<button>${riddle.correct_answer}</button>`)
  choices.push($btnMakerA)
  const wrongBtn1 = $(`<button>${riddle.incorrect_answers[0]}</button>`);
  choices.push(wrongBtn1)
  const wrongBtn2 = $(`<button>${riddle.incorrect_answers[1]}</button>`);
  choices.push(wrongBtn2)
  const wrongBtn3 = $(`<button>${riddle.incorrect_answers[2]}</button>`);
  choices.push(wrongBtn3)
  const shuffleOptions = (choices) => {
    choices.sort(() => Math.random() - 0.5);
  }
  shuffleOptions(choices)
  $mainContent.append(choices)
  if (round === 1) {
    const playerFirstChoiceCorrect = () => { playerChoiceCorrect(1) }
    $btnMakerA.on('click', playerFirstChoiceCorrect)
  } else if (round === 2) {
    const playerSecondChoiceCorrect = () => { playerChoiceCorrect(2) }
    $btnMakerA.on('click', playerSecondChoiceCorrect)
  } else if (round === 3) {
    const playerLastChoiceCorrect = () => { playerChoiceCorrect(3) }
    $btnMakerA.on('click', playerLastChoiceCorrect)
  }
  wrongBtn1.on('click', playerChoiceWrong)
  wrongBtn2.on('click', playerChoiceWrong)
  wrongBtn3.on('click', playerChoiceWrong)
}

const playerChoiceCorrect = (round) => {
  $mainContent.empty();
  if (round === 1) {
    const win = $('<h1>"Ha! That one was easy!" The Sphinx says to you. "Do you dare try your luck again?!"</h1>')
    $mainContent.append(win)
    const $playAgain = $('<button id="playAgain">Play Again?</button>')
    $mainContent.append($playAgain);
    $playAgain.on('click', start2)
  } else if (round === 2) {
    $mainContent.empty();
    const win = $('<h1>Your answer is correct! The sphinx spares your life...this time. "Do you dare try your luck again?!" she asks.</h1>')
    $mainContent.append(win)
    const $playLast = $('<button id="playLast">Play Again?</button>')
    $mainContent.append($playLast);
    $playLast.on('click', start3)
  } else if (round === 3) {
    $mainContent.empty();
    const win = $('<h1>Your answer is correct! The sphinx lets you leave with your life.</h1>')
    $mainContent.append(win)
  }
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
  // to later add a start over button to refresh page
}