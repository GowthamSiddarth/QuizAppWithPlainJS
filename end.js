const userNameEle = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScore");
const scoreEle = document.getElementById('score');
const recentScore = localStorage.getItem("recentScore");

scoreEle.innerText = recentScore;

userNameEle.addEventListener("keyup", (e) => {
  saveScoreBtn.disabled = !e.target.value;
});

playAgain = () => {
  window.location.replace("/game.html");
};

saveScore = (e) => {
    e.preventDefault();
};

saveScoreBtn.addEventListener("click", saveScore);