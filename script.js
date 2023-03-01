'use strict'

const grids = document.querySelectorAll('#grid');
const message = document.getElementById('message');
const popUp = document.querySelector('.popUpWrap');
const restart = document.querySelector('.restart');
const closePopUp = document.querySelector('.close');
const winLine = document.querySelector('.winLine');
const easyBtn = document.querySelector('.easy');
const mediumBtn = document.querySelector('.medium');
const popUpWraps = document.querySelector('.popUpWraps');
const markerX = document.querySelector('.markerX');
const markerO = document.querySelector('.markerO');
let gameInProgress = false;
let gameOver = false;

const playGame = (player, marker) => {


  const hardPlay = () => {
    if (gameOver) {
      return;
    }
    player = 'Player 1';
    grids.forEach(grid => {
      grid.addEventListener('click', function() {
        if (gameInProgress == false) {
          if (grid.hasAttribute('class') == false) {
            grid.setAttribute('class', 'markerX');
            marker = grid.getAttribute('class');
            gameInProgress = true;
            checkWin(player, marker);
            if (gameInProgress) {
              setTimeout(computerHard, 1000);
            }
          }
        }
      });
    });
  };
  const easyPlay = () => {
    if (gameOver) {
      return;
    }
    player = 'Player 1';
    grids.forEach(grid => {
      grid.addEventListener('click', function() {
        if (gameInProgress == false) {
          if (grid.hasAttribute('class') == false) {
            grid.setAttribute('class', 'markerX');
            marker = grid.getAttribute('class');
            gameInProgress = true;
            checkWin(player, marker);
            if (gameInProgress) {
              setTimeout(computerEasy, 1000);
            }
          }
        }
      });
    });
  }
  const computerHard = (player, marker) => {
    if (gameOver) {
      return;
    }
    player = 'Computer';
    marker = markerO;
  }
  
  const computerEasy = (player, marker) => {
    if (gameOver) {
      return;
    }
    player = 'Computer';
    let random = grids[Math.floor(Math.random() * grids.length)];
    if (random.hasAttribute('class') == false) {
      random.setAttribute('class', 'markerO');
      marker = random.getAttribute('class');
      gameInProgress = false;
      checkWin(player, marker);
    } else {
      computerEasy();
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
    let isNotEmpty = (grid) => grid != '';
    grids.forEach((grid) => {
      if (grid.className == 'markerX' || grid.className == 'markerO') {
        newGrid.push(grid.className);
      } else {
        newGrid.push('');
      }
    })
    if (newGrid.every(isNotEmpty)) {
      message.innerText = 'It is a tie!';
      popUpMessage('block');
      gameOver = true;
    }
  }
  const showWin = (string) => {
    winLine.setAttribute('class', string);
  }
  const hideWin = (string) => {
    winLine.removeAttribute('class', string);
    winLine.setAttribute('class', 'winLine');
  }
  
  closePopUp.addEventListener('click', (e) => popUpMessage('none'));

  const checkWin = (player, marker) => {
    if (grids[0].className == marker && grids[1].className == marker && grids[2].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine1');
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine1');
    } else if (grids[3].className == marker && grids[4].className == marker && grids[5].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine2');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine2');
    } else if (grids[6].className == marker && grids[7].className == marker && grids[8].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine3');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine3');
    } else if (grids[0].className == marker && grids[3].className == marker && grids[6].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine4');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine4');
    } else if (grids[1].className == marker && grids[4].className == marker && grids[7].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine5');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine5');
    } else if (grids[2].className == marker && grids[5].className == marker && grids[8].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine6');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine6');
    } else if (grids[0].className == marker && grids[4].className == marker && grids[8].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine7');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine7');
    } else if (grids[2].className == marker && grids[4].className == marker && grids[6].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine8');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine8');
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

  return {hardPlay, easyPlay};
}




const play = playGame();

const easy = () => {
  play.easyPlay();
  popUpWraps.style.display = 'none';
}

const hard = () => {
  play.hardPlay();
  popUpWraps.style.display = 'none';
}

easyBtn.addEventListener('click', (e) => easy());
mediumBtn.addEventListener('click', (e) => hard());