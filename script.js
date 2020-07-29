const startButton = document.getElementById('start-btn')
const restartButton = document.getElementById('restart-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const highscore = document.getElementById('highscore')


document.getElementById("timer").innerHTML = 60


let timer 
let count = 60

let highScore = 0
let score = 0

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  begin()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  checkAnswer(correct)
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    document.getElementById("restart-btn").style.display="block"
    highscore.style.display="block"
    highscore.innerHTML+=highScore
    var timeoutHandle = window.setTimeout(timer);
    window.clearTimeout(timeoutHandle);
    timeoutHandle = window.setTimeout(timer);
  }
}



function checkAnswer(correct) {
  console.log(correct)
  if (correct) {
    score++
    if (score > highScore) {
      highScore = score
      console.log(highScore)
    }
    console.log(score)
  }
}

function startTimer() {
    if (count < 60) {
        document.getElementById("timer").innerHTML = count 
    }
    if (count > 0) {
        count--
    } else {
        clearInterval(timer)
    }
}

function begin() {
    if (!timer) {
        timer = window.setInterval(function() {
            startTimer()
        }, 1000 )
    }
}

// Click an answer
// Check if answer is correct
// if it is, add 1 to score
// else do nothing
// display score at end


function restart() {
    count = 60
    document.getElementById("timer").innerHTML = 60
    location.reload()
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
}

// The questions that will be answered by the user //
const questions = [
  {
    question: 'How do you make a button respond to an user click?',
    answers: [
      { text: 'Add an Event Listener', correct: true },
      { text: 'Add a function', correct: false },
      { text: 'Add a variable ', correct: false },
      { text: 'Add a if/else statement', correct: false }
    ]
  },
  {
    question: 'Which of the following variables represents a string?',
    answers: [
      { text: 'const string = "Hello World"', correct: true },
      { text: 'const string = Hello World', correct: false },
      { text: 'const string = 1', correct: false },
      { text: 'const string = True', correct: false }
    ]
  },
  {
    question: 'Which of the following variables represents an integer?',
    answers: [
      { text: 'const string = "Hello World"', correct: false },
      { text: 'const string = Hello World', correct: false },
      { text: 'const string = 1', correct: true },
      { text: 'const string = True', correct: false }
    ]
  },
  {
    question: 'Which of the following variables represents a boolean?',
    answers: [
      { text: 'const string = "Hello World"', correct: false },
      { text: 'const string = Hello World', correct: false },
      { text: 'const string = 1', correct: false },
      { text: 'const string = True', correct: true }
    ]
  },
  {
    question: 'Which of the following variables represents an incorrect format?',
    answers: [
      { text: 'const string = "Hello World"', correct: false },
      { text: 'const string = Hello World', correct: true },
      { text: 'const string = 1', correct: false },
      { text: 'const string = True', correct: false }
    ]
  },
  {
    question: 'What stores code and repeats itself for multiple future uses?',
    answers: [
      { text: 'Function', correct: true },
      { text: 'Event Listener', correct: false },
      { text: 'Boolean', correct: false },
      { text: 'Constant Variable', correct: false }
    ]
  },
  {
    question: 'Why is javascript important in developing web pages?',
    answers: [
      { text: 'It puts static text on the screen to be formatted', correct: false },
      { text: 'It adds color and design to the screen for appearances', correct: false },
      { text: 'It gives the user interactice elements ', correct: true },
      { text: 'It lets the programmer add pictures to the website', correct: false }
    ]
  },
  {
    question: 'Which of the following is syntax within Javascript?',
    answers: [
      { text: '<div id="question-container" class="hide">', correct: false },
      { text: 'body {justify-content: center;}', correct: false },
      { text: 'const answerButtonsElement = document.getElementById()', correct: true },
      { text: 'def my_function(firstName, lastName): ', correct: false }
    ]
  },
  {
    question: 'What is the difference between a for loop and a while loop?',
    answers: [
      { text: 'You can stop a for loop at a designated spot, and you cannot with a while loop', correct: false },
      { text: 'None, except for syntax and user preference', correct: true },
      { text: 'The while loop is used to count numbers', correct: false },
      { text: 'The for loop is used to keep track of strings', correct: false }
    ]
  },
  {
    question: 'How does javascript interact with the html on the page?',
    answers: [
      { text: 'By using ElementIDs to correlate with a piece of code', correct: false },
      { text: 'By importing the file to the main page in the header section', correct: false },
      { text: 'Through the use of <script></script> tags and writing the javscript in between the tags on the body of html', correct: false },
      { text: 'All of these are correct', correct: true }
    ]
  }
]