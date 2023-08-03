'use strict';

// Get elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const diceImgElement = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const rollBtn = document.querySelector('.btn--roll');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

// starting conditions
diceImgElement.classList.add('hidden');
score0Element.textContent = 0;
score1Element.textContent = 0;

// Rolling the dice
rollBtn.addEventListener('click', function () {
    if (playing) {
        // display dice and generate the number
        diceImgElement.classList.remove('hidden');
        const roll = Math.trunc(Math.random() * 6) + 1;
        console.log(`Dice roll: ${roll}`);
        diceImgElement.src = `img/dice-${roll}.png`;

        // Check if roll is 1
        if (roll !== 1) {
            currentScore += roll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // Switch player and clear current score
            switchPlayer();
        }
    }
});


// Hold Button actions --> update total score and switch player
holdBtn.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // Check winner
        if (scores[activePlayer] >= 50) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            playing = false;
            diceImgElement.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});


// Reset game
newBtn.addEventListener('click', function () {
    location.reload();
});