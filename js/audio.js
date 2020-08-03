import { addZero } from './subMain.js';
export const audioInit = () => {
  const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPLay = document.querySelector('.audio-button__play'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioTimeTotal = document.querySelector('.audio-time__total');
    
    const playList = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
      const isPlayed = audioPlayer.paused;
      const track = playList[trackIndex];
      audioImg.src = `./audio/${track}.jpg`;
      audioHeader.textContent = track.toUpperCase();
      audioPlayer.src = `./audio/${track}.mp3`;

      if (isPlayed) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
      audioPlayer.addEventListener('canplay', () => {
        updateTime();
      });
    };

    const prevTrack = () => {
      if (trackIndex) {
        trackIndex--;
      }  else {
        trackIndex = playList.length - 1;
      }
      loadTrack();
    };

    const nextTrack = () => {
      if (trackIndex !== playList.length - 1) {
        trackIndex++;
      } else {
        trackIndex = 0;
      }
      loadTrack();
    };

    const updateTime = () => {
      const duration = audioPlayer.duration;
      const currentTime = audioPlayer.currentTime;
      const progress = (currentTime / duration) * 100;

      audioProgressTiming.style.width = progress + '%';

      const minutePassed = Math.floor(currentTime / 60) || '0';
      const secondPassed = Math.floor(currentTime % 60) || '0';

      const minuteTotal = Math.floor(duration / 60) || '0';
      const secondTotal = Math.floor(duration % 60) || '0';

      audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;
      audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;
    };

    audioNavigation.addEventListener('click', event => {
      const target = event.target;

      if (target.classList.contains('audio-button__play')) {
        audio.classList.toggle('play');
        audioButtonPLay.classList.toggle('fa-play');
        audioButtonPLay.classList.toggle('fa-pause');

        if (audioPlayer.paused) {
          audioPlayer.play();
        } else {
          audioPlayer.pause();
        }
        const track = playList[trackIndex];
        audioHeader.textContent = track.toUpperCase();
      } 

      if (target.classList.contains('audio-button__prev')) {
        prevTrack();
      }

      if (target.classList.contains('audio-button__next')) {
        nextTrack();
      }
    });

    audioPlayer.addEventListener('ended', () => {
      nextTrack();
      audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', updateTime);

    audioProgress.addEventListener('click', event => {
      const x = event. offsetX;
      const allWidth = audioProgress.clientWidth;
      const progress = (x / allWidth) * audioPlayer.duration;
      audioPlayer.currentTime = progress;
    });

    audioInit.stop = () => {
      if (!audioPlayer.paused) {
        audioPlayer.pause();
        audio.classList.remove('play');
        audioButtonPLay.classList.remove('fa-pause');
        audioButtonPLay.classList.add('fa-play');
      }
    }
    updateTime();
}; 
