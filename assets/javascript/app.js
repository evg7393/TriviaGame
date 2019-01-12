$(document).ready(function(){

  // once the button is pressed the game starts
  $("#start-button").on("click", gameState.startTimer);
  

});

var gameState = {

  timeRemaining : 75,

  //Timer:
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#firstpage").hide();
    trivia.displayQuestions();
  },

  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // cheks the answers once timer stops
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // Revels the final score /hides the questions
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#lastpage").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers: " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
    $("#unanswered").text("Skipped questions: " + numUnanswered);
  }
}

// questions and scoring:
var trivia = {

  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];
      var answer4 = questionBank[i].answers[3];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer4 + '</label></div>');
    }

    // "Done" button
    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // verifies correct, incorrect and unanswered
  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // loop: compares the text of the label with the user answers
    // score count
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // calculates score:
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

// arrays Q&A:
var questionBank =
[
  {
      question: "What is the capital of Germany?",
      answers: ["Frankfurt", "Berlin", "Munich", "Dusseldorf"],
      correct: "Berlin"
    },
  
    {
      question: "What is the capital of Spain?",
      answers: ["Madrid", "Rota", "Grenada", "Barcelona"],
      correct: "Madrid"
    },
    {
      question: "What is the capital of Egypt?",
      answers: ["Giza", "Luxor", "Cairo", "Alexandria"],
      correct: "Cairo"
    },
    {
      question: "What is the capital of Sweden?",
      answers: ["Oslo", "Helsinki", "Copenhagen", "Stockholm"],
      correct: "Stockholm"
    },
    {
      question: "What is the capital of Thailand?",
      answers: ["Paattaya", "Chiang Rai", "Bangkok", "Chiang Mai"],
      correct: "Bangkok"
    },
    {
      question: "What is the capital of Iraq?",
      answers: ["Tirkrit", "Islamabad", "Baghdad", "Kabul"],
      correct: "Baghdad"
    },
    {
      question: "What is the capital of Russia?",
      answers: ["St. Petersburg", "Moscow", "Mara Largo", "Minsk"],
      correct: "Moscow"
    },
    {
      question: "What is the capital of Japan?",
      answers: ["Osaka", "Nagasaki", "Hiroshima", "Tokyo"],
      correct: "Tokyo"
    },
    {
      question: "What is the capital of Kenya ?",
      answers: ["Mosiro", "Nairobi", "Kongoni", "Matuuu"],
      correct: "Nairobi"
    },
    {
      question: "What is the capital of Paraguay?",
      answers: ["Asuncion", "San Ignacio", "San Jorge", "Caaguazu"],
      correct: "Asuncion"
    }
  ]