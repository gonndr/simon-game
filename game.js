var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
// var count = 0;

$(document).keypress(function() {
  if (level === 0) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

function nextSequence() {






  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(120).fadeIn(100);
  playSound(randomChosenColour);
  console.log("Game: " + gamePattern);
}


$(".btn").click(function() {
  if (level !== 0) {

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log("User: " + userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // count++;

    if (compareArrays(gamePattern.slice(0, userClickedPattern.length), userClickedPattern) === false) {
      gameOver();
      level = 0;
      userClickedPattern = [];
      gamePattern = [];
      return;
    }

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {

        userClickedPattern = [];
        nextSequence();


      }, 1000);
    }


  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function compareArrays(arr1, arr2) {
  var len1 = arr1.length;
  var len2 = arr2.length;
  if (len1 !== len2) {
    return false;
  } else {
    for (var i = 0; i < len1; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
}

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play()
  $("#level-title").text("Game Over, Press Any Key to Restart");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 400);
}
