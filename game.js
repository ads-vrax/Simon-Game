var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0

$(document).keypress(function() {
    if(gameStarted == false)
    {
        gameStarted = true;
        nextSequence();
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    $("h1").text("Level " + level);
    level++;

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animateGamePattern();
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function animateGamePattern() {
    let delay = 0;

    for (let i = 0; i < gamePattern.length; i++) {
        (function() {
            setTimeout(function() {
                $("#" + gamePattern[i]).fadeIn(300).fadeOut(300).fadeIn(300);
                playSound(gamePattern[i]);
            }, delay);

            delay += 500;
        })(i);
    }
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else 
    {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart.");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

