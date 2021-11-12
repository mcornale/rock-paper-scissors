export const openPopup = async function (popup, popupBackground) {
  popup.classList.remove('hidden');
  popupBackground.classList.remove('hidden');

  popupBackground.animate([{ opacity: '0' }, { opacity: '1' }], {
    duration: 200,
    easing: 'ease-in',
    fill: 'both',
  });

  popup.animate(
    [
      {
        transform: 'translate(-50%, -50%) scale(0.8)',
        opacity: '0',
      },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
    ],
    {
      duration: 400,
      easing: 'cubic-bezier(0.42, 0, 0, 0.92)',
      fill: 'both',
    }
  );
};

export const closePopup = async function (popup, popupBackground) {
  popupBackground.animate([{ opacity: '1' }, { opacity: '0' }], {
    duration: 200,
    easing: 'ease-in',
    fill: 'both',
  });

  await popup.animate(
    [
      { transform: 'translate(-50%, -50%) scale(1)' },
      {
        transform: 'translate(-50%, -50%) scale(0)',
        borderRadius: '50%',
      },
    ],
    {
      duration: 400,
      easing: 'cubic-bezier(0.42, 0, 0, 0.92)',
      fill: 'both',
    }
  ).finished;

  popup.animate(
    [
      {
        borderRadius: '1rem',
      },
    ],
    {
      duration: 0,
      fill: 'both',
    }
  );

  popup.classList.add('hidden');
  popupBackground.classList.add('hidden');
};
