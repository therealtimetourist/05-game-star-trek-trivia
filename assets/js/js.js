//declare variables
var arrCurrRound = [];
var questionAnswered = false;
var questionsCorrect = 0;
var questionsIncorrect = 0;
var questionNum = 0;
var gameStarted = false;
var gameLength = 10;
var tn;

function resetGame(){
	// clear variables
	gameStarted = true;
	arrCurrRound = [];
	questionAnswered = false;
	questionsCorrect = 0;
	questionsIncorrect = 0;
	questionNum = 0;
	// call the game
	engage();
}

function engage(){
	// wait until game starts
	if(gameStarted){
		// clear game wait loop
		// create the DOM elements for the game
		initGameboard();
		playTheGame(questionNum);
	}
}

//initial game-board setup
function initGameboard(){
	// get questions from the all question array
	for (var i = 0; i < gameLength; i++){
		// get a random question object from the question array
		var qPick = arrAllQuestions[Math.floor((Math.random() * arrAllQuestions.length))];
		// error check: check if question has already been added to current round
		if (arrCurrRound.indexOf(qPick) > -1){
			// try again
			i--;
		}else{
			// add it to arrCurrRound
			arrCurrRound.push(qPick); 
			//console.log(arrCurrRound);
		}
	}
	// clear and append content to gameboard divs
	$('#gameboard').empty().append('<div class="row"><div id="question" class="col col-md-7"></div><div id="countdown" class="col col-md-5">&nbsp;</div><div id="question-img" class="col col-md-5 text-center"></div></div>');
	// clear and append question/distractor divs
	$('#question').empty().append('<div class="row"><div id="questionStem" class="col col-md-12"></div></div><div class="row"><div id="distractors" class="col col-md-12"></div><div class="row"><div id="feedback" class="col col-md-12"></div></div></div>');
}

function playTheGame(i){
	questionAnswered = false;
	// set the question
	$('#questionStem').empty().append('<p>' + arrCurrRound[i].question + '</p>');
		
	// set the distractors
	var strDistractors = "";
	for(var j = 1; j <= 4; j++){
		strDistractors += "<button class='btn btn-info btn-lg'>" + arrCurrRound[i]['distractor' + j] + "</button>";
	}
	// clear distractors div/write in distractors
	$('#distractors').empty().append(strDistractors);
	
	// set the question image
	$('#question-img').empty().append('<img alt="' + arrCurrRound[i].questionPic + '" class="img-responsive center-block"  src="assets/img/' + arrCurrRound[i].questionPic + '.jpg">');
		
	//clear feedback
	$('#feedback').empty();
	
	// get button click info/disable button after selection
	$('.btn').on('click', function(){
		$('.btn').prop('disabled',true);
		checkAnswer($(this).html());
	});
	
	var n = 15;
	tn = setInterval(function(){
		// write countdown to div
		$('#countdown').html('Question ' + (questionNum + 1) + ': ' + n);
		// if count reaches 0
		if(n == 0){
			if(!questionAnswered){
				//checkAnswer('unanswered');
				questionsIncorrect++;
				$('#feedback').html('NO ANSWER GIVEN<br>The correct answer is ' + arrCurrRound[questionNum].correctAnswer);
				setTimeout(recheck,5000);
				clearInterval(tn);
			}else{
				clearInterval(tn);
				recheck();
			}
		}
		n--;
	}, 1000);
}

// clear content/show results
function endGame(){
	gameStarted = false;
	var pct = (questionsCorrect/arrCurrRound.length)*100;
	$('#gameboard').empty().html('<h1>GAME OVER</h1><p>You got ' + questionsCorrect + ' correct and ' + questionsIncorrect + ' incorrect!</p><p>A ' + pct + '% Rating</p><button id="starter" class="btn btn-lg btn-success center-block" onclick="resetGame()">PLAY AGAIN</button>');
}

function checkAnswer(r){
	questionAnswered = true;
	if (r == arrCurrRound[questionNum].correctAnswer){
		// correct
		questionsCorrect++;
		$('#feedback').html('CORRECT!');
	}else{
		// incorrect
		questionsIncorrect++;
		$('#feedback').html('INCORRECT!<br>The correct answer is ' + arrCurrRound[questionNum].correctAnswer);
		
	}
	setTimeout(recheck,5000);
	clearInterval(tn);
}

function recheck(){
	questionNum++;
	if(questionNum < arrCurrRound.length){
		playTheGame(questionNum);
	}else{
		endGame();
	}
}

// goes nowhere does nothing (it's a Star Trek joke)
function gndn(){}

// let's play the game!
$('#starter').click(function(){
	resetGame();
});
