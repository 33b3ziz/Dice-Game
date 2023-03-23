'use strict';

// Selecting elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const name0 = document.getElementById('name--0');
const name1 = document.getElementById('name--1');

// Initial values
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let scores = [0, 0];
let player0Name = prompt('First Name');
let player1Name = prompt('Second Name');
name0.textContent = player0Name;
name1.textContent = player1Name;

// Functions
const toggleActive = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  toggleActive();
};

const resetGame = function () {
  currentScore = 0;
  playing = true;
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner', 'player--active');
  dice.classList.add('hidden');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generte random dice
    const diceNum = Math.trunc(Math.random() * 6 + 1);

    // Display dice
    dice.classList.remove('hidden');
    dice.src = `images/dice-${diceNum}.png`;

    // Check if dice number is not 1
    if (diceNum !== 1) {
      // If true
      // Add the number to current score
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to second player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score the the total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check the score
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('.player--active');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// Reset the game
btnNew.addEventListener('click', resetGame);
