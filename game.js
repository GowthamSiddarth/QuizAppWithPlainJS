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

  const progressBarEle = document.getElementById("progressBarFull");
  progressBarEle.style.width = `${(questionNum / MAX_QUESTIONS) * 100}%`;
};

updateScore = (score) => {
  const scoreEle = document.getElementById("score");
  scoreEle.innerText = score;
};

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
        localStorage.setItem("recentScore", score);
        window.location.replace("/end.html");
      }
    }, 1000);
  });
});

let availableQuestions = [];
let MAX_QUESTIONS = 0;
let currentQuestion = {};
let currentQuestionIdx = -1;
let score = 0;
let acceptingAnswers = true;

fetch("questions.json")
  .then((res) => res.json())
  .then((questions) => {
    availableQuestions = [...questions];
    MAX_QUESTIONS = availableQuestions.length;
    playGame(availableQuestions);
  });
