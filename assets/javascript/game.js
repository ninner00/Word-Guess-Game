// referance to DOM - $ = DOM elements
var newGameButton = document.getElementById('new-game-button');
var $underScore = document.getElementById('under-score');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

var aww = document.getElementById("aww"); 
var cheer = document.getElementById("cheer");


// Create vars (wordBank, wins, losses, random word, guesses left, game running, random word placeholder, guessed letter bank, incorrect letter bank)
var wordBank = ['Lager','Pilsner','IPA','Stout','Bitter','Pale','Wheat','Saison', 'Porter', 'Bock', 'Red', 'Brown', 'Scotch', 'Rye', 'Amber', 'Vienna'];
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var startGame = false;
var randomWord = '';
var randomWordUnderScore = [];  // Needed for a push = array
var guessedLetters = [];  // Needed for a push = arra
var wrongLetters = [];  // Needed for a push = array

//newGame function to reset all stats, pick new word and create placeholders
function newGame() {
	// Resets
	startGame = true;
	guessesLeft =9;
	guessedLetters = [];
	wrongLetters = [];
	randomWordUnderScore = [];

	// Pick a random word
	randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

	// Under Scores of new word
	for (var i = 0; i < randomWord.length; i++) {
		if (randomWord[i] === ' ') {
			randomWordUnderScore.push(' ');
		} 
		else {
			randomWordUnderScore.push(' _ ');
		}
	}

	// Write new stuff to DOM
	$guessesLeft.textContent = guessesLeft;
	$underScore.textContent = randomWordUnderScore.join('');
	$guessedLetters.textContent = wrongLetters;	
}

// letterGuess function, takes in the letter you pressed and sees if its in the selected word
function letterGuess(letter) {
	console.log(randomWordUnderScore);

	if (startGame === true && guessedLetters.indexOf(letter) === -1) {
		//Game Logic
		guessedLetters.push(letter);

		// Check if guessed letter is there
		for (var i = 0; i < randomWord.length; i++) {
			// all lower case
			if (
				randomWord[i].toLowerCase() === letter.toLowerCase()) {
				// if matched, swap out to correct letter
				randomWordUnderScore[i] = randomWord[i];
			}
		}

		$underScore.textContent = randomWordUnderScore.join('');
		// Pass letter to incorrect function
		checkIncorrect(letter);
	}
	else {
		if (startGame === false) { 
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
		randomWordUnderScore.indexOf(letter.toLowerCase()) === -1 
		&& 
		randomWordUnderScore.indexOf(letter.toUpperCase()) === -1
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
		startGame = false;
		$losses.textContent = losses;
		$underScore.textContent = randomWord;
		aww.play();
	}
	checkWin();
}

// checkWin
function checkWin() {
	if (randomWord.toLowerCase() === randomWordUnderScore.join('').toLowerCase())
	{
		wins++;
		startGame = false;
		$wins.textContent = wins;
		cheer.play(); 
	}
}

// play audio for win or loss
function playAudio() { 
    aww.play(); 
    cheer.play(); 
} 

// Add event listener for new game button
newGameButton.addEventListener('click', newGame);


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