import { radioInit } from './radio.js';
import { audioInit } from './audio.js';
import { videoInit } from './video.js';

const playerBtn = document.querySelectorAll('.player-btn'),
      playerBlock = document.querySelectorAll('.player-block'),
      temp = document.querySelector('.temp');

const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));
};


/* Обработчик событий */
playerBtn.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
  })});


radioInit();
audioInit();
videoInit();