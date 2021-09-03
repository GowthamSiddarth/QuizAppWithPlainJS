const highScoresListEle = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresListEle.innerHTML = highScores
  .map(
    (score) =>
      `<li class="high-score">
        <p class="high-score-name">${score.name}</p>
        <p class="high-score-score">${score.score}</p>
        </li>`
  )
  .join("");
