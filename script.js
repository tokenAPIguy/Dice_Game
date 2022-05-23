'use strict';

// Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

// Starting conditions
let scores, currentScore, playing;
let activePlayer = 0;

// Initialize Game function
function init() {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	diceEl.classList.add('hidden');

	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
}

// Start Game
init();

// Switch Player function
function switchPlayer() {
	document.querySelector(`#current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
}

// Dice Roll functionality
btnRoll.addEventListener('click', () => {
	if (playing) {
		console.log(`Active Player: ${activePlayer}`);

		// 1. Generate random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;
		console.log(dice);

		// 2. Display Dice
		diceEl.classList.remove('hidden');
		diceEl.src = `images/dice-${dice}.png`;

		// 3. Check for 1 - if true switch players - if false add to score
		if (dice !== 1) {
			currentScore += dice;
			document.querySelector(`#current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchPlayer();
		}
	}
});

// Dice Hold Functionality
btnHold.addEventListener('click', () => {
	if (playing) {
		// 1. Add current score to active player's score
		scores[activePlayer] += currentScore;
		document.querySelector(`#score--${activePlayer}`).textContent =
			scores[activePlayer];
		// 2. Check if player's score is >= 100 (win game or switch player)
		if (scores[activePlayer] >= 100) {
			playing = false;
			diceEl.classList.add('hidden');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
		} else {
			switchPlayer();
		}
	}
});

// New Game Functionality
btnNewGame.addEventListener('click', init);
