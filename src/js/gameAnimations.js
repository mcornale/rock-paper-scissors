export const transitionToSeeResults = async function (
  gameChoice,
  gameResultsBox,
  playerChoiceShow,
  computerChoiceShow,
  gameResultsText,
  gameResultTitle,
  playAgainBtn,
  scoreElement,
  score
) {
  const iconScale = getComputedStyle(document.documentElement).getPropertyValue(
    '--scale-icon-value'
  );

  await gameChoice.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(0.4)', opacity: '0' }],
    {
      duration: 600,
      easing: 'cubic-bezier(0.42, 0, 0, 0.92)',
      fill: 'both',
    }
  ).finished;

  gameResultsBox.classList.remove('hidden');

  await gameResultsBox.animate(
    [
      { transform: 'scale(0.4)', opacity: '0' },
      { transform: 'scale(1)', opacity: '1' },
    ],
    {
      duration: 300,
      easing: 'linear',
      fill: 'both',
    }
  ).finished;

  await playerChoiceShow.querySelector('.game__icon').animate(
    [
      { transform: 'scale(0.4)', opacity: '0' },
      { transform: `scale(${iconScale})`, opacity: '1' },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0.42, 0, 0, 0.92)',
      fill: 'both',
    }
  ).finished;

  await computerChoiceShow.querySelector('.game__icon').animate(
    [
      { transform: 'scale(0.4)', opacity: '0' },
      { transform: `scale(${iconScale})`, opacity: '1' },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0.42, 0, 0, 0.92)',
      fill: 'both',
    }
  ).finished;

  if (getComputedStyle(gameResultsText).order !== '3') {
    await gameResultsText.animate(
      [
        { transform: 'scale(0)', width: '0rem' },
        { transform: 'scale(1)', width: '30rem' },
      ],
      {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both',
      }
    ).finished;
  }

  gameResultTitle.classList.remove('hidden');
  playAgainBtn.classList.remove('hidden');

  gameResultTitle.animate(
    [{ transform: 'scale(0)' }, { transform: `scale(1)` }],
    {
      duration: 600,
      easing: 'cubic-bezier(0.42, 0, 0, 0.92)',
      fill: 'both',
    }
  ).finished;

  playAgainBtn.animate([{ transform: 'scale(0)' }, { transform: `scale(1)` }], {
    duration: 600,
    easing: 'cubic-bezier(0.42, 0, 0, 0.92)',
    fill: 'both',
  }).finished;

  scoreElement.innerHTML = score;
};

export const transitionToInit = async function (
  gameResultsBox,
  gameChoice,
  gameResultTitle,
  playAgainBtn,
  gameResultsText
) {
  await gameResultsBox.animate(
    [
      { transform: 'scale(1)', opacity: '1' },
      { transform: 'scale(0.4)', opacity: '0' },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0.42, 0, 0, 0.92)',
      fill: 'both',
    }
  ).finished;

  gameResultsBox.classList.add('hidden');

  await gameChoice.animate(
    [{ transform: 'scale(0.4)' }, { transform: 'scale(1)', opacity: '1' }],
    {
      duration: 300,
      easing: 'linear',
      fill: 'both',
    }
  ).finished;

  gameResultTitle.classList.add('hidden');
  playAgainBtn.classList.add('hidden');

  if (getComputedStyle(gameResultsText).order !== '3') {
    gameResultsText.animate(
      [
        { transform: 'scale(1)', width: '30rem' },
        { transform: 'scale(0)', width: '0rem' },
      ],
      {
        duration: 0,
        easing: 'ease-in-out',
        fill: 'both',
      }
    );
  }
};
