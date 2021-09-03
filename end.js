const userNameEle = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScore");
const scoreEle = document.getElementById('score');

const MAX_HIGH_SCORES = 5;

const recentScore = localStorage.getItem("recentScore");
scoreEle.innerText = recentScore;

const highScores =  JSON.parse(localStorage.getItem("highScores")) || [];

userNameEle.addEventListener("keyup", (e) => {
  saveScoreBtn.disabled = !e.target.value;
});

playAgain = () => {
  window.location.replace("/game.html");
};

saveScore = (e) => {
    e.preventDefault();

    const score = {
      score: recentScore,
      name: userNameEle.value
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    if (highScores.length > MAX_HIGH_SCORES) highScores.splice(MAX_HIGH_SCORES, 1);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.replace('/');
};

saveScoreBtn.addEventListener("click", saveScore);