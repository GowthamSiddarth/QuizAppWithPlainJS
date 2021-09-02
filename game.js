const questionEle = document.getElementById("question");
const choicesTextElems = Array.from(
  document.getElementsByClassName("choice-text")
);

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
  acceptingAnswers = true;
};

updateQuestionNumber = (questionNum) => {
  const questionNumberEle = document.getElementById("questionNumber");
  questionNumberEle.innerText = `Question ${questionNum}/${MAX_QUESTIONS}`;

  const progressBarEle = document.getElementById('progressBarFull');
  progressBarEle.style.width = `${(questionNum/MAX_QUESTIONS) * 100}%`;
};

updateScore = (score) => {
    const scoreEle = document.getElementById('score');
    scoreEle.innerText = score;
}

playGame = (availableQuestions) => {
  let currQuestionNum = MAX_QUESTIONS - availableQuestions.length + 1;
  updateQuestionNumber(currQuestionNum);

  let nextQuestion = getNextQuestion(availableQuestions);
  currentQuestion = nextQuestion;
  setNextQuestionAndChoices(nextQuestion);
};

choicesTextElems.forEach((choiceElem) => {
  choiceElem.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    let selectionClass = "incorrect";
    let selectedChoice = e.target;
    if (parseInt(selectedChoice.dataset.number) === currentQuestion.answer) {
      score++;
      selectionClass = "correct";
      updateScore(score);
    }

    selectedChoice.parentElement.classList.add(selectionClass);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(selectionClass);
      availableQuestions.splice(currentQuestionIdx, 1);

      if (availableQuestions.length) playGame(availableQuestions);
      else {
        alert("Game Over! Score = " + score);
        window.location.replace("/");
      }
    }, 1000);
  });
});

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

let availableQuestions = [...questions];
let MAX_QUESTIONS = availableQuestions.length;
let currentQuestion = {};
let currentQuestionIdx = -1;
let score = 0;
let acceptingAnswers = true;
playGame(availableQuestions);
