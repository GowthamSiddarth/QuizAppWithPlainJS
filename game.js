const questionEle = document.getElementById("question");
const choicesTextElems = Array.from(document.getElementsByClassName("choice-text"));
const choicesContainerElems = Array.from(document.getElementsByClassName("choice-container"));

let acceptingAnswers = false;
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

getNextQuestion = (availableQuestions) => {
  let nextQuestionIdx = Math.floor(Math.random() * availableQuestions.length);
  currentQuestionIdx = nextQuestionIdx;
  return availableQuestions[nextQuestionIdx];
};

setNextQuestionAndChoices = (nextQuestion) => {
  questionEle.innerText = nextQuestion.question;

  choicesTextElems.forEach((choice) => {
    choice.innerText = nextQuestion["choice" + choice.dataset.number];
  });
};

playGame = (availableQuestions) => {
  let nextQuestion = getNextQuestion(availableQuestions);
  currentQuestion = nextQuestion;
  setNextQuestionAndChoices(nextQuestion);
};

choicesContainerElems.forEach((choiceElem) => {
  choiceElem.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    let selectedChoice = parseInt(e.target.dataset.number);
    if (selectedChoice === currentQuestion.answer) score++;
    availableQuestions.splice(currentQuestionIdx, 1);

    if (availableQuestions.length) playGame(availableQuestions);
    else {
      alert("Game Over! Score = " + score);
      window.location.replace("/");
    }
  });
});

let availableQuestions = [...questions];
let currentQuestion = {};
let currentQuestionIdx = -1;
let score = 0;
acceptingAnswers = true;
playGame(availableQuestions);
