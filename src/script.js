const GAME_ELEMENTS = ["paper", "scissors", "rock"];

const gameChoice = document.querySelector(".game__choice");

let playerChoice;
let computerChoice;

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
    const playerChoiceIndex = GAME_ELEMENTS.indexOf(playerChoice);
    const computerChoiceIndex = GAME_ELEMENTS.indexOf(computerChoice);

    //Player WINS only if computer chooses the option before in the ARRAY
    const playerChoiceIndexWin =
        playerChoiceIndex - 1 === -1
            ? GAME_ELEMENTS.length - 1
            : playerChoiceIndex - 1;

    if (playerChoiceIndex === computerChoiceIndex) {
        console.log("DRAW");
    } else if (playerChoiceIndexWin === computerChoiceIndex) {
        console.log("WIN");
    } else {
        console.log("LOSE");
    }
};

gameChoice.addEventListener("click", getPlayerChoice);
