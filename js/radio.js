export const radioInit = () => {
  const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIcon = () => {
      if (audio.paused) { 
        radio.classList.remove('play');
        radioStop.classList.add('fa-play');
        radioStop.classList.remove('fa-stop');
      } else {
        radio.classList.add('play');
        radioStop.classList.add('fa-stop');
        radioStop.classList.remove('fa-play');
      }
    };

    const selectItem = elem => {
      radioItem.forEach(item => item.classList.remove('select'));
      elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', event => {
      const target = event.target;
      const parrent = target.closest('.radio-item');
      selectItem(parrent);

      const title = parrent.querySelector('.radio-name').textContent;
      radioHeaderBig.textContent = title;

      const urlImg = parrent.querySelector('.radio-img').src;
      radioCoverImg.src = urlImg;
      
      radioStop.disabled = false;
      audio.src = target.dataset.radioStantion;
      audio.play();
      changeIcon();
    });

    radioStop.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      changeIcon();
    });
};