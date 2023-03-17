var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var keyPressCount = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var sound = new Audio("/sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
  keyPressCount++;
  if (keyPressCount === 1) {
    nextSequence();
  }
});

// How to check the userPattern.
// The userClicked pattern is auto nulled at nextSequence, so we do that when gamePattern size = userpattern. And when the userPattern is small in size we do not call the nextSequence hence userPattern is not deleted.
function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    wrong();
  }
}

function wrong() {
  animatePress();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any key to Restart");
  var sound = new Audio("/sounds/wrong.mp3");
  sound.play();
  reset();
}

function reset() {
  level = 0;
  index = 0;
  gamePattern = [];
  keyPressCount = 0;
}
