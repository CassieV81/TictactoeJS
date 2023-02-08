'use strict'

const grids = document.querySelectorAll('.grid');

const gamePlay = () => {
  const player1 = 'o';
  const player2 = 'x';

  const addMarker = () => {
    grids.forEach(grid => {
      grid.addEventListener('click', function() {
        grid.innerText = player1;
      });
    });
  }

  const computerPlay = () => {
    let random = Math.floor(Math.random() * 10);
    grids[random].innerText = player2;
  }

  return addMarker(), computerPlay();
}

const play = gamePlay();

