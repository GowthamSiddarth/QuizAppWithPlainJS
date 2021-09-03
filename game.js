const questionEle = document.getElementById("question");
const choicesTextElems = Array.from(
  document.getElementsByClassName("choice-text")
);
const gameEle = document.getElementById("game");
const loaderEle = document.getElementById("loader");

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

  gameEle.classList.remove("hidden");
  loaderEle.classList.add("hidden");
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

fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
  .then((res) => res.json())
  .then((res) => {
    availableQuestions = res.results.map((question) => {
      const choices = question.incorrect_answers;
      const answer_index = Math.floor(Math.random() * 4);
      choices.splice(answer_index, 0, question.correct_answer);

      return {
        question: question.question,
        choice1: choices[0],
        choice2: choices[1],
        choice3: choices[2],
        choice4: choices[3],
        answer: answer_index + 1,
      };
    });

    MAX_QUESTIONS = availableQuestions.length;
    playGame(availableQuestions);
  })
  .catch((err) => {
    alert("Error! Please try again.");
    window.location.replace("/");
  });
