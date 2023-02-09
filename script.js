'use strict'

const grids = document.querySelectorAll('.grid');
const message = document.getElementById('message');
const popUp = document.querySelector('.popUpWrap');
const restart = document.querySelector('.restart');
const closePopUp = document.querySelector('.close');
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
      checkWin(player, marker);
    } else {
      computerPlay();
    }
  };
  const popUpMessage = (string) => {
    popUp.style.display = string;
  }
  const winMessage = (player) => {
    message.innerText = player + ' wins';
    popUpMessage('block');
    gameOver = true;
  }
  const checkGrids = () => {
    let newGrid = [];
    let isNotEmpty = (num) => num != '';
    grids.forEach((grid) => {
      newGrid.push(grid.innerText);
      })
      if (newGrid.every(isNotEmpty)) {
        gameOver = true;
      }
    }
  
  closePopUp.addEventListener('click', (e) => popUpMessage('none'));

  const checkWin = (player, marker) => {
    if (grids[0].innerText == marker && grids[1].innerText == marker && grids[2].innerText == marker) {
      winMessage(player);
    } else if (grids[3].innerText == marker && grids[4].innerText == marker && grids[5].innerText == marker) {
      winMessage(player);
    } else if (grids[6].innerText == marker && grids[7].innerText == marker && grids[8].innerText == marker) {
      winMessage(player);
    } else if (grids[0].innerText == marker && grids[3].innerText == marker && grids[6].innerText == marker) {
      winMessage(player);
    } else if (grids[1].innerText == marker && grids[4].innerText == marker && grids[7].innerText == marker) {
      winMessage(player);
    } else if (grids[2].innerText == marker && grids[5].innerText == marker && grids[8].innerText == marker) {
      winMessage(player);
    } else if (grids[0].innerText == marker && grids[4].innerText == marker && grids[8].innerText == marker) {
      winMessage(player);
    } else if (grids[2].innerText == marker && grids[4].innerText == marker && grids[6].innerText == marker) {
      winMessage(player);
    } else {
      checkGrids();
    }
  }

  const clearGame = () => {
    grids.forEach((grid) => grid.innerText = '');
    popUpMessage('none');
    gameOver = false;
    gameInProgress = false;
  }

  restart.addEventListener('click', (e) => clearGame())

  return {humanPlay, computerPlay};
}




const play = playGame();

play.humanPlay();

