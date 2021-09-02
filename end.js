const userNameEle = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScore");

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