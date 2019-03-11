// Game Values
let min = 1,
  max = 10,
  winningNum = getRanNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign Min Max to UI
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // Validate Input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    //Game over - WON
    gameOver(true, `${winningNum} is Correct! Congratulations, you win!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game Over - LOST
      gameOver(
        false,
        `Game Over, You Lost. The Correct Number Was ${winningNum}`
      );
    } else {
      // Game Continues - Answer Wrong
      // Tell User it's the wrong number
      setMessage(
        `${guess} is not correct. ${guessesLeft} guesses left.`,
        "red"
      );

      // Clear Input
      guessInput.value = "";
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable input
  guessInput.disabled = true;

  // Change border color
  guessInput.style.borderColor = color;
  // Set Text Color
  message.style.color = color;

  // Let user know they won
  setMessage(msg);

  // Play Again?
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get Winning Number
function getRanNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
