import "regenerator-runtime/runtime";

import paperImage from "/images/icon-paper.svg";
import scissorsImage from "/images/icon-scissors.svg";
import rockImage from "/images/icon-rock.svg";

const GAME_ELEMENTS = ["paper", "scissors", "rock"];
const ELEMENTS_IMAGES = [paperImage, scissorsImage, rockImage];

const gameChoice = document.querySelector(".game__choice");
const gameResultsBox = document.querySelector(".game__results-box");
const playerChoiceShow = document.querySelector(
    ".game__player .game__choice-box"
);
const computerChoiceShow = document.querySelector(
    ".game__computer .game__choice-box"
);
const scoreElement = document.querySelector(".score__value");

const gameResultsText = document.querySelector(".game__result");
const gameResultTitle = document.querySelector(".game__result-title");
const playAgainBtn = document.querySelector(".button--play-again");

let playerChoice;
let computerChoice;
let playerChoiceIndex;
let computerChoiceIndex;
let gameResult;
let score = 0;

const initGame = function () {
    playerChoice = "";
    computerChoice = "";
    playerChoiceIndex = "";
    computerChoiceIndex = "";
    gameResult = "";

    playerChoiceShow.innerHTML = "";
    computerChoiceShow.innerHTML = "";
    gameResultTitle.innerHTML = "";

    transitionToInit();
};

const getPlayerChoice = function (e) {
    const choiceEl = e.target.closest(".game__icon");

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
        gameResult = "TIED";
    } else if (playerChoiceIndexWin === computerChoiceIndex) {
        gameResult = "WIN";
        score++;
    } else {
        gameResult = "LOSE";
    }

    transitionToSeeResults();
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
        data-choice="paper"
    >
        <img src="${ELEMENTS_IMAGES[choiceIndex]}" alt="Paper icon" />
    </div>
    `;
};

const transitionToSeeResults = async function () {
    const iconScale = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--scale-icon-value");

    await gameChoice.animate(
        [{ transform: "scale(1)" }, { transform: "scale(0.4)", opacity: "0" }],
        {
            duration: 600,
            easing: "cubic-bezier(0.42, 0, 0, 0.92)",
            fill: "both",
        }
    ).finished;

    gameResultsBox.classList.remove("hidden");

    await gameResultsBox.animate(
        [
            { transform: "scale(0.4)", opacity: "0" },
            { transform: "scale(1)", opacity: "1" },
        ],
        {
            duration: 300,
            easing: "linear",
            fill: "both",
        }
    ).finished;

    await playerChoiceShow.querySelector(".game__icon").animate(
        [
            { transform: "scale(0.4)", opacity: "0" },
            { transform: `scale(${iconScale})`, opacity: "1" },
        ],
        {
            duration: 600,
            easing: "cubic-bezier(0.42, 0, 0, 0.92)",
            fill: "both",
        }
    ).finished;

    await computerChoiceShow.querySelector(".game__icon").animate(
        [
            { transform: "scale(0.4)", opacity: "0" },
            { transform: `scale(${iconScale})`, opacity: "1" },
        ],
        {
            duration: 600,
            easing: "cubic-bezier(0.42, 0, 0, 0.92)",
            fill: "both",
        }
    ).finished;

    if (getComputedStyle(gameResultsText).order !== "3") {
        await gameResultsText.animate(
            [
                { transform: "scale(0)", width: "0rem" },
                { transform: "scale(1)", width: "30rem" },
            ],
            {
                duration: 600,
                easing: "ease-in-out",
                fill: "both",
            }
        ).finished;
    }

    gameResultTitle.classList.remove("hidden");
    playAgainBtn.classList.remove("hidden");

    gameResultTitle.animate(
        [{ transform: "scale(0)" }, { transform: `scale(1)` }],
        {
            duration: 600,
            easing: "cubic-bezier(0.42, 0, 0, 0.92)",
            fill: "both",
        }
    ).finished;

    playAgainBtn.animate(
        [{ transform: "scale(0)" }, { transform: `scale(1)` }],
        {
            duration: 600,
            easing: "cubic-bezier(0.42, 0, 0, 0.92)",
            fill: "both",
        }
    ).finished;

    scoreElement.innerHTML = score;
};

const transitionToInit = async function () {
    await gameResultsBox.animate(
        [
            { transform: "scale(1)", opacity: "1" },
            { transform: "scale(0.4)", opacity: "0" },
        ],
        {
            duration: 600,
            easing: "cubic-bezier(0.42, 0, 0, 0.92)",
            fill: "both",
        }
    ).finished;

    gameResultsBox.classList.add("hidden");

    await gameChoice.animate(
        [{ transform: "scale(0.4)" }, { transform: "scale(1)", opacity: "1" }],
        {
            duration: 300,
            easing: "linear",
            fill: "both",
        }
    ).finished;

    gameResultTitle.classList.add("hidden");
    playAgainBtn.classList.add("hidden");
};

gameChoice.addEventListener("click", getPlayerChoice);
playAgainBtn.addEventListener("click", initGame);
