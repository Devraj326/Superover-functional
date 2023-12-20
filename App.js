const strikeButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");
const team1ScoreDisplay = document.getElementById("score-team1");
const team1WicketsDisplay = document.getElementById("wickets-team1");
const team2ScoreDisplay = document.getElementById("score-team2");
const team2WicketsDisplay = document.getElementById("wickets-team2");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

let team1Score = 0;
let team1Wickets = 0;
let team2Score = 0;
let team2Wickets = 0;
let team1BallsFaced = 0;
let team2BallsFaced = 0;
let turn = 1;

const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function gameOver() {
  playAudio(gameOverAudio);
  if (team1Score > team2Score) alert("IND wins");
  else if (team2Score > team1Score) alert("PAK wins");
  else alert("It is another superover!");
}

function updateScore() {
  team1ScoreDisplay.textContent = team1Score;
  team1WicketsDisplay.textContent = team1Wickets;
  team2ScoreDisplay.textContent = team2Score;
  team2WicketsDisplay.textContent = team2Wickets;
}

resetButton.onclick = () => {
  window.location.reload();
};

strikeButton.onclick = () => {
  playAudio(strikeAudio);

  const randomElement =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

  if (turn === 2) {
    team2BallsFaced++;
    const team2BallDisplay = document.querySelector(
      `#team2-superover div:nth-child(${team2BallsFaced})`
    );
    team2BallDisplay.textContent = randomElement;

    if (randomElement === "W") team2Wickets++;
    else team2Score += randomElement;

    if (team2BallsFaced === 6 || team2Wickets === 2 || team2Score > team1Score) {
      turn = 3;
      gameOver();
    }
  }

  if (turn === 1) {
    team1BallsFaced++;
    const team1BallDisplay = document.querySelector(
      `#team1-superover div:nth-child(${team1BallsFaced})`
    );
    team1BallDisplay.textContent = randomElement;

    if (randomElement === "W") team1Wickets++;
    else team1Score += randomElement;

    if (team1BallsFaced === 6 || team1Wickets === 2) turn = 2;
  }

  updateScore();
};
