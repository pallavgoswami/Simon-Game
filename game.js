const buttonColours = ["red", "blue", "green", "yellow"]; // 3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow".

let gamePattern = []; // 5. At the top of the game.js file, create a new empty array called gamePattern.
let userClickedPattern = []; // 11. At the top of the game.js file, create a new empty array with the name userClickedPattern.

let started = false;
let level = 0; // 20. Create a new variable called level and start at level 0.

$(document).keypress(function () { // 18. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
  if (!started) {
    $("#level-title").text("Level " + level); // 20. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    nextSequence(); // 19. You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
    started = true;
  }
});

$(".btn").click(function () { // 9. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
  const userChosenColour = $(this).attr("id"); // 10. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  userClickedPattern.push(userChosenColour); // 12. Add the contents of the variable userChosenColour created in step 10 to the end of this new userClickedPattern

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1); // 23. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

function checkAnswer(currentLevel) { // 22. Create a new function called checkAnswer(), it should take one input with the name currentLevel
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) { // 24. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
      setTimeout(function () { // 25. Call nextSequence() after a 1000 millisecond delay.
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong"); // 26. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    $("body").addClass("game-over"); // 27. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("#level-title").text("Game Over, Press Any Key to Restart"); // 28. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // 30. Call startOver() if the user gets the sequence wrong.
  }
}

function nextSequence() { // 1. Inside game.js create a new function called nextSequence()
  userClickedPattern = []; // 26. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++; // 21. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  $("#level-title").text("Level " + level); // 22. Inside nextSequence(), update the h1 with this change in the value of level.
  const randomNumber = Math.floor(Math.random() * 4); // 2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber.
  const randomChosenColour = buttonColours[randomNumber]; // 4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  gamePattern.push(randomChosenColour); // 6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // 7. Use jQuery to select the button with the same id as the randomChosenColour and animate a flash to the button selected.
  playSound(randomChosenColour); // 8. Use JavaScript to play the sound for the button colour selected in step 7.
}

function animatePress(currentColor) { // 15. Create a new function called animatePress(), it should take a single input parameter called currentColour.
  $("#" + currentColor).addClass("pressed"); // 16. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  setTimeout(function () { // 17. Use Javascript to remove the pressed class after a 100 milliseconds.
    $("#" + currentColor).removeClass("pressed");
  }, 100); 
}

function playSound(name) { // 13. Create a new function called playSound() that takes a single input parameter called name.
  const audio = new Audio("sounds/" + name + ".mp3"); // 14. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  audio.play();
}

function startOver() { // 29. Create a new function called startOver().
  level = 0; // 31. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  gamePattern = [];
  started = false;
}
