'use strict'

const grids = document.querySelectorAll('.grid');
const message = document.getElementById('message');
const popUp = document.querySelector('.popUpWrap');
const restart = document.querySelector('.restart');
const close = document.querySelector('.close');
let gameInProgress = false;
let gameOver = false;

const playGame = (player, marker) => {


  const humanPlay = () => {
    if (gameOver) {
      return;
    }
    player = 'Player 1';
    marker = 'x';
    grids.forEach(grid => {
      grid.addEventListener('click', function() {
        if (gameInProgress == false) {
          if (grid.innerText == '') {
            grid.innerText = marker;
            gameInProgress = true;
            checkWin(player, marker);
            if (gameInProgress) {
              setTimeout(computerPlay, 1000);
            }
          }
        }
      });
    });
  };
  
  const computerPlay = (player, marker) => {
    if (gameOver) {
      return;
    }
    player = 'Computer';
    marker = 'o';
    let random = grids[Math.floor(Math.random() * grids.length)];
    if (random.innerText == '') {
      random.innerText = 'o'; 
      gameInProgress = false;
      checkWin(player);
    } else {
      computerPlay();
    }
  };
  const winMessage = () => {
    message.innerText = player + ' wins';
    popUp.style.display = 'block';
    gameOver = true;
  }

  const checkWin = (player, marker) => {
    if (grids[0].innerText == marker && grids[1].innerText == marker && grids[2].innerText == marker) {
      winMessage();
    } else if (grids[3].innerText == marker && grids[4].innerText == marker && grids[5].innerText == marker) {
      winMessage();
    } else if (grids[6].innerText == marker && grids[7].innerText == marker && grids[8].innerText == marker) {
      winMessage();
    } else if (grids[0].innerText == marker && grids[3].innerText == marker && grids[6].innerText == marker) {
      winMessage();
    } else if (grids[1].innerText == marker && grids[4].innerText == marker && grids[7].innerText == marker) {
      winMessage();
    } else if (grids[2].innerText == marker && grids[5].innerText == marker && grids[8].innerText == marker) {
      winMessage();
    } else if (grids[0].innerText == marker && grids[4].innerText == marker && grids[8].innerText == marker) {
      winMessage();
    } else if (grids[2].innerText == marker && grids[4].innerText == marker && grids[6].innerText == marker) {
      winMessage();
    }
  }

  return {humanPlay, computerPlay};
}

const play = playGame();

play.humanPlay();

