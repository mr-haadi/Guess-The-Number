(function () {
  const form = document.querySelector("form");
  const userInput = document.querySelector("form input");
  const startGame = document.querySelector(".start-game-btn");
  const submitBtn = document.querySelector(".submit-btn");
  const userProgress = document.querySelector(".user-progress");
  const userGuesses = document.querySelector(".your-guesses");

  let userGuessNum = 0;
  let totalUserGuesses = [];

  let computerGuessNum = Math.floor(Math.random() * 101);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    userGuessNum = parseInt(userInput.value);

    // Input validation
    if (isNaN(userGuessNum) || userGuessNum < 0 || userGuessNum > 100) {
      userProgress.innerText = "Please enter a valid number between 0 and 100.";
      userInput.value = ""; // Clear the input
      userInput.focus();
      return; // Exit early
    }
    totalUserGuesses.push(userGuessNum);

    if (userGuessNum > computerGuessNum) {
      userProgress.innerText = "Too high!";
      userGuesses.innerText = `Your guesses: ${totalUserGuesses.join(", ")}`;
    } else if (userGuessNum < computerGuessNum) {
      userProgress.innerText = "Too low!";
      userGuesses.innerText = `Your guesses: ${totalUserGuesses.join(", ")}`;
    } else {
      userGuesses.innerText = `Your guesses: ${totalUserGuesses.join(", ")}`;
      userProgress.innerText = "You got it! Congrats";
      startGame.disabled = false;
      submitBtn.disabled = true;
      userInput.disabled = true;
      userInput.value = ""; // Clear the input
      startGame.focus();
      return;
    }

    // Check for maximum guesses
    if (totalUserGuesses.length >= 10) {
      userGuessNum = "";
      computerGuessNum = Math.floor(Math.random() * 101);
      startGame.disabled = false;
      submitBtn.disabled = true;
      userInput.disabled = true;
      userProgress.innerText = "You lost! The number was " + computerGuessNum;
      userGuesses.innerText = `Your guesses: ${totalUserGuesses.join(", ")}`;
    }
    userInput.focus();
    userInput.value = ""; // Clear the input
  });

  startGame.addEventListener("click", () => {
    userGuesses.innerText = "";
    userProgress.innerText = "";
    startGame.disabled = true;
    submitBtn.disabled = false;
    userInput.disabled = false;
    totalUserGuesses = [];
    userGuessNum = "";
    computerGuessNum = Math.floor(Math.random() * 101);
    userInput.focus();
  });
})();
