'use strict'

const grids = document.querySelectorAll('.grid');
const message = document.getElementById('message');
const popUp = document.querySelector('.popUpWrap');
const restart = document.querySelector('.restart');
const closePopUp = document.querySelector('.close');
const winLine = document.querySelector('.winLine');
let gameInProgress = false;
let gameOver = false;

const playGame = (player, marker) => {


  const hardPlay = () => {
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
    marker = 'x';
    grids.forEach(grid => {
      grid.addEventListener('click', function() {
        if (gameInProgress == false) {
          if (grid.innerText == '') {
            grid.innerText = marker;
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
    marker = 'o';
    if ((grids[0].innerText == '' && grids[1].innerText == 'x' && grids[2].innerText == 'x') ||
        (grids[0].innerText == '' && grids[3].innerText == 'x' && grids[6].innerText == 'x') ||
        (grids[0].innerText == '' && grids[4].innerText == 'x' && grids[8].innerText == 'x')) {
          grids[0].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else if ((grids[2].innerText == '' && grids[1].innerText == 'x' && grids[0].innerText == 'x') ||
               (grids[2].innerText == '' && grids[5].innerText == 'x' && grids[8].innerText == 'x') ||
               (grids[2].innerText == '' && grids[4].innerText == 'x' && grids[6].innerText == 'x')) {
          grids[2].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else if ((grids[6].innerText == '' && grids[3].innerText == 'x' && grids[0].innerText == 'x') ||
               (grids[6].innerText == '' && grids[5].innerText == 'x' && grids[2].innerText == 'x') ||
               (grids[6].innerText == '' && grids[7].innerText == 'x' && grids[8].innerText == 'x')) {
          grids[6].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else if ((grids[8].innerText == '' && grids[4].innerText == 'x' && grids[0].innerText == 'x') ||
               (grids[8].innerText == '' && grids[5].innerText == 'x' && grids[2].innerText == 'x') ||
               (grids[8].innerText == '' && grids[7].innerText == 'x' && grids[6].innerText == 'x')) {
          grids[8].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else if (grids[1].innerText == '' && grids[4].innerText == 'x' && grids[7].innerText == 'x') {
          grids[1].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else if (grids[3].innerText == '' && grids[4].innerText == 'x' && grids[5].innerText == 'x') {
          grids[3].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else if (grids[7].innerText == '' && grids[4].innerText == 'x' && grids[1].innerText == 'x') {
          grids[7].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else if (grids[5].innerText == '' && grids[4].innerText == 'x' && grids[3].innerText == 'x') {
          grids[5].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else if ((grids[4].innerText == '' && grids[0].innerText == 'x' && grids[8].innerText == 'x') ||
               (grids[4].innerText == '' && grids[2].innerText == 'x' && grids[6].innerText == 'x') ||
               (grids[4].innerText == '' && grids[7].innerText == 'x' && grids[1].innerText == 'x') ||
               (grids[4].innerText == '' && grids[3].innerText == 'x' && grids[5].innerText == 'x')) {
          grids[4].innerText = marker;
          gameInProgress = false;
          checkWin(player, marker);
    } else {
      let random = grids[Math.floor(Math.random() * grids.length)];
      if (random.innerText == '') {
        random.innerText = 'o'; 
        gameInProgress = false;
        checkWin(player, marker);
      } else {
        computerHard();
      }
    }
  }
  
  const computerEasy = (player, marker) => {
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
    let isNotEmpty = (num) => num != '';
    grids.forEach((grid) => {
      newGrid.push(grid.innerText);
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
    if (grids[0].innerText == marker && grids[1].innerText == marker && grids[2].innerText == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine1');
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine1');
    } else if (grids[3].innerText == marker && grids[4].innerText == marker && grids[5].innerText == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine2');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine2');
    } else if (grids[6].innerText == marker && grids[7].innerText == marker && grids[8].innerText == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine3');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine3');
    } else if (grids[0].innerText == marker && grids[3].innerText == marker && grids[6].innerText == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine4');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine4');
    } else if (grids[1].innerText == marker && grids[4].innerText == marker && grids[7].innerText == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine5');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine5');
    } else if (grids[2].innerText == marker && grids[5].innerText == marker && grids[8].innerText == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine6');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine6');
    } else if (grids[0].innerText == marker && grids[4].innerText == marker && grids[8].innerText == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine7');      
      setTimeout(winMessage, 2000, player);
      setTimeout(hideWin, 3000, 'winLine7');
    } else if (grids[2].innerText == marker && grids[4].innerText == marker && grids[6].innerText == marker) {
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

play.easyPlay();

