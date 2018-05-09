// referance to DOM - $ = DOM elements
var $newGameButton = document.getElementById('new-game-button');
var $underScore = document.getElementById('under-score');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
var $aww = document.getElementById("aww"); 
var $cheer = document.getElementById("cheer");


// Create vars (wordBank, wins, losses, random word, guesses left, game running, random word placeholder, guessed letter bank, incorrect letter bank)
var wordBank = ['Lager','Pilsner','India Pale Ale','Stout','Bitter','Pale Ale','Wheat Beer','Saison', 'Porter', 'Bock', 'Irish Red', 'Brown', 'Scotch', 'Rye', 'Amber', 'Vienna Lager'];
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var gameRunning = false;
var randomWord = '';
var randomWordUnderScoreArr = [];  // Needed for a push = array
var guessedLetters = [];  // Needed for a push = array
var wrongLetters = [];  // Needed for a push = array

//newGame function to reset all stats, pick new word and create placeholders
function newGame() {
	// Resets
	gameRunning = true;
	guessesLeft =8;
	guessedLetters = [];
	wrongLetters = [];
	randomWordUnderScoreArr = [];

	// Pick a random word
	randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

	// Under Scores of new word
	for (var i = 0; i < randomWord.length; i++) {
		if (randomWord[i] === ' ') {
			randomWordUnderScoreArr.push('  ');
		} 
		else {
			randomWordUnderScoreArr.push(' _ ');
		}
	}

	// Write new stuff to DOM
	$guessesLeft.textContent = guessesLeft;
	$underScore.textContent = randomWordUnderScoreArr.join('');
	$guessedLetters.textContent = wrongLetters;	
}

// letterGuess function, takes in the letter you pressed and sees if its in the selected word
function letterGuess(letter) {
	console.log(letter);

	if (gameRunning === true && guessedLetters.indexOf(letter) === -1) {
		//Game Logic
		guessedLetters.push(letter);

		// Check if guessed letter is there
		for (var i = 0; i < randomWord.length; i++) {
			// all lower case
			if (
				randomWord[i].toLowerCase() === letter.toLowerCase()) {
				// if matched, swap out to correct letter
				randomWordUnderScoreArr[i] = randomWord[i];
			}
		}

		$underScore.textContent = randomWordUnderScoreArr.join('');
		// Pass letter to incorrect function
		checkIncorrect(letter);
	}
	else {
		if (gameRunning === false) { 
			alert("You need to start the game, please click the button.");
		}
		else {
			alert("You've guessed this letter, try a new one.");
		}
	}
}

// Check Incorrect Letter
function checkIncorrect(letter) {
	// Check to see if it is the wrong letter
	if (
		randomWordUnderScoreArr.indexOf(letter.toLowerCase()) === -1 
		&& 
		randomWordUnderScoreArr.indexOf(letter.toUpperCase()) === -1
		) 
		{
		// Minus a guess
		guessesLeft --;
		// Add wrong letter to wrongLetters
		wrongLetters.push(letter);
		// Write incorrect letters
		$guessedLetters.textContent = wrongLetters.join(' ');
		// Write amount of guesses left to DOM
		$guessesLeft.textContent = guessesLeft;
	}
	checkLoss();
}

// // checkLoss
function checkLoss() {
	if (guessesLeft === 0) {
		losses++;
		gameRunning = false;
		$losses.textContent = losses;
		$underScore.textContent = randomWord;
		$aww.play();
	}
	checkWin();
}

// checkWin
function checkWin() {
	if (randomWord.toLowerCase() === randomWordUnderScoreArr.join('').toLowerCase())
	{
		wins++;
		gameRunning = false;
		$wins.textContent = wins;
		$cheer.play(); 
	}
}

// play audio for win or loss
function playAudio() { 
    $aww.play(); 
    $cheer.play(); 
} 

// Add event listener for new game button
$newGameButton.addEventListener('click', newGame);

// Add onkeyup event to trigger letterGuess 65 to 90 is A to Z
document.onkeyup = function(event) {
	if (event.keyCode >= 65 && event.keyCode <= 90) {
		letterGuess(event.key);
	}
	// kill the space bar so it does not start a new game
	 if (event.keyCode == 32) {
        return false;
    }
}