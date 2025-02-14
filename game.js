
var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []

var level = 0
var started = false

$(document).on("keypress", function () {
    if(!started){
        nextSequence()
        started = true
    }
})


$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)

    animatePress(userChosenColor)
    playSound("sounds/" + userChosenColor + ".mp3")

    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence() {
    userClickedPattern = []

    var randomNumber = Math.floor(4 * Math.random())
    var randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound("sounds/" + randomChosenColor + ".mp3")
    $("h1").text("Level " + level)
    level += 1
}

function playSound(sound){
    var audio = new Audio(sound)
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed")
    setTimeout( function () {
        $("." + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success")
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    }
    else {
        playSound("sounds/wrong.mp3")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        })
        $("h1").text("Game Over, Press Any Key to Restart")

        startOver()
    }
}


function startOver() {
    level = 0
    gamePattern = []
    started = false
}