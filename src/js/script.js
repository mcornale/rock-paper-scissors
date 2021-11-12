import 'regenerator-runtime/runtime';
import paperImage from '/images/icon-paper.svg';
import scissorsImage from '/images/icon-scissors.svg';
import rockImage from '/images/icon-rock.svg';
import { transitionToInit, transitionToSeeResults } from './gameAnimations';
import { openPopup, closePopup } from './popupAnimations';

const GAME_ELEMENTS = ['paper', 'scissors', 'rock'];
const ELEMENTS_IMAGES = [paperImage, scissorsImage, rockImage];
const RESULTS_LABEL = {
  WIN: 'WIN',
  TIED: 'TIED',
  LOSE: 'LOSE',
};

const gameChoice = document.querySelector('.game__choice');
const gameResultsBox = document.querySelector('.game__results-box');
const playerChoiceShow = document.querySelector(
  '.game__player .game__choice-box'
);
const computerChoiceShow = document.querySelector(
  '.game__computer .game__choice-box'
);
const scoreElement = document.querySelector('.score__value');
const gameResultsText = document.querySelector('.game__result');
const gameResultTitle = document.querySelector('.game__result-title');
const playAgainBtn = document.querySelector('.button--play-again');
const openPopupBtn = document.querySelector('.button--no-bg');
const popup = document.querySelector('.popup');
const popupBackground = document.querySelector('.popup__bg');
const closePopupBtn = document.querySelector('.popup__close');

let playerChoice;
let computerChoice;
let playerChoiceIndex;
let computerChoiceIndex;
let gameResult;
let score = 0;

const initGame = function () {
  playerChoice = '';
  computerChoice = '';
  playerChoiceIndex = '';
  computerChoiceIndex = '';
  gameResult = '';

  playerChoiceShow.innerHTML = '';
  computerChoiceShow.innerHTML = '';
  gameResultTitle.innerHTML = '';

  transitionToInit(
    gameResultsBox,
    gameChoice,
    gameResultTitle,
    playAgainBtn,
    gameResultsText
  );
};

const getPlayerChoice = function (e) {
  const choiceEl = e.target.closest('.game__icon');

  if (!choiceEl) return;

  playerChoice = choiceEl.dataset.choice;

  genComputerChoice();
};

const genComputerChoice = function () {
  const indexChoice = Math.floor(Math.random() * 3);
  computerChoice = GAME_ELEMENTS[indexChoice];

  calculateResult();
};

const calculateResult = function () {
  playerChoiceIndex = GAME_ELEMENTS.indexOf(playerChoice);
  computerChoiceIndex = GAME_ELEMENTS.indexOf(computerChoice);

  //Player WINS only if computer chooses the option before in the ARRAY
  const playerChoiceIndexWin =
    playerChoiceIndex - 1 === -1
      ? GAME_ELEMENTS.length - 1
      : playerChoiceIndex - 1;

  if (playerChoiceIndex === computerChoiceIndex) {
    gameResult = RESULTS_LABEL.TIED;
  } else if (playerChoiceIndexWin === computerChoiceIndex) {
    gameResult = RESULTS_LABEL.WIN;
    score++;
  } else {
    gameResult = RESULTS_LABEL.LOSE;
    score--;
  }

  transitionToSeeResults(
    gameChoice,
    gameResultsBox,
    playerChoiceShow,
    computerChoiceShow,
    gameResultsText,
    gameResultTitle,
    playAgainBtn,
    scoreElement,
    score
  );
  renderResults();
};

const renderResults = function () {
  playerChoiceShow.innerHTML = generateIconMarkup(
    playerChoice,
    playerChoiceIndex
  );

  computerChoiceShow.innerHTML = generateIconMarkup(
    computerChoice,
    computerChoiceIndex
  );

  gameResultTitle.innerHTML = `YOU ${gameResult}`;
};

const generateIconMarkup = function (choice, choiceIndex) {
  return `
    <div
        class="game__icon game__icon--${choice}"
    >
        <img src="${ELEMENTS_IMAGES[choiceIndex]}" alt="Paper icon" />
    </div>
    `;
};

gameChoice.addEventListener('click', getPlayerChoice);
playAgainBtn.addEventListener('click', initGame);
openPopupBtn.addEventListener(
  'click',
  openPopup.bind(null, popup, popupBackground)
);
closePopupBtn.addEventListener(
  'click',
  closePopup.bind(null, popup, popupBackground)
);
