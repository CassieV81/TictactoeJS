'use strict'

const grids = document.querySelectorAll('#grid');
const message = document.getElementById('message');
const gameBoard = document.getElementById('gameBoard');
const popUp = document.querySelector('.popUpWrap');
const restart = document.querySelector('.restart');
const newLevel = document.querySelector('.close');
const winLine = document.querySelector('.winLine');
const easyBtn = document.querySelector('.easy');
const mediumBtn = document.querySelector('.medium');
const hardBtn = document.querySelector('.hard');
const popUpWraps = document.querySelector('.popUpWraps');
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
  const mediumPlay = () => {
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
              setTimeout(computerMedium, 1000);
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

  const getBoardState = () => {
    const state = Array.from(grids).map(grid => grid.classList.contains("markerX") ? "X" : grid.classList.contains("markerO") ? "O" : "");
    return state;
  };
  
  const getAvailableMoves = (board) => {
    return board.reduce((moves, marker, index) => {
      if (marker === "") {
        moves.push(index);
      }
      return moves;
    }, []);
  };
  
  const evaluate = (board) => {
    const winPatterns = [    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        return board[a] === "X" ? -10 : 10;
      }
    }
    return 0;
  };
  
  const minimax = (board, depth, isMaximizingPlayer) => {
    const moves = getAvailableMoves(board);
    const score = evaluate(board);
    if (score !== 0 || depth === 0) {
      return score;
    }
    if (moves.length === 0) {
      return 0;
    }
    let bestScore;
    if (isMaximizingPlayer) {
      bestScore = -Infinity;
      for (const move of moves) {
        const newBoard = [...board];
        newBoard[move] = "O";
        const moveScore = minimax(newBoard, depth - 1, false);
        bestScore = Math.max(bestScore, moveScore);
      }
    } else {
      bestScore = Infinity;
      for (const move of moves) {
        const newBoard = [...board];
        newBoard[move] = "X";
        const moveScore = minimax(newBoard, depth - 1, true);
        bestScore = Math.min(bestScore, moveScore);
      }
    }
    return bestScore;
  };
  
  const computerHard = (marker) => {
    if (gameOver) {
      return;
    }
    const board = getBoardState();
    let bestMove;
    let bestScore = -Infinity;
    const moves = getAvailableMoves(board);
    for (const move of moves) {
      const newBoard = [...board];
      newBoard[move] = "O";
      const moveScore = minimax(newBoard, 6, false);
      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = move;
      }
    }
    const grid = grids[bestMove];
    grid.classList.add("markerO");
    marker = grid.classList;
    gameInProgress = false;
    checkWin("Computer", marker);
  };
  
  const computerMedium = (marker) => {
    if (gameOver) {
      return;
    }
    const board = getBoardState();
    let bestMove;
    let bestScore = -Infinity;
    const moves = getAvailableMoves(board);
    for (const move of moves) {
      const newBoard = [...board];
      newBoard[move] = "O";
      const moveScore = minimax(newBoard, 2, false);
      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = move;
      }
    }
    const grid = grids[bestMove];
    grid.classList.add("markerO");
    marker = grid.classList;
    gameInProgress = false;
    checkWin("Computer", marker);
  };  
  
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
  const hideWin = () => {
    winLine.removeAttribute('class');
    winLine.setAttribute('class', 'winLine');
  }

  const checkWin = (player, marker) => {
    if (grids[0].className == marker && grids[1].className == marker && grids[2].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine1');
      setTimeout(winMessage, 2000, player);
    } else if (grids[3].className == marker && grids[4].className == marker && grids[5].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine2');      
      setTimeout(winMessage, 2000, player);
    } else if (grids[6].className == marker && grids[7].className == marker && grids[8].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine3');      
      setTimeout(winMessage, 2000, player);
    } else if (grids[0].className == marker && grids[3].className == marker && grids[6].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine4');      
      setTimeout(winMessage, 2000, player);
    } else if (grids[1].className == marker && grids[4].className == marker && grids[7].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine5');      
      setTimeout(winMessage, 2000, player);
    } else if (grids[2].className == marker && grids[5].className == marker && grids[8].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine6');      
      setTimeout(winMessage, 2000, player);
    } else if (grids[0].className == marker && grids[4].className == marker && grids[8].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine7');      
      setTimeout(winMessage, 2000, player);
    } else if (grids[2].className == marker && grids[4].className == marker && grids[6].className == marker) {
      gameOver = true;
      setTimeout(showWin, 1000, 'winLine8');      
      setTimeout(winMessage, 2000, player);
    } else {
      checkGrids();
    }
  }

  const clearGame = () => {
    hideWin();
    grids.forEach((grid) => grid.removeAttribute('class'));
    popUpMessage('none');
    gameOver = false;
    gameInProgress = false;
  }
//Changed restart to play again, then changed close class to select new level.
  restart.addEventListener('click', (e) => clearGame())
  
  newLevel.addEventListener('click', (e) => location.reload());

  return {hardPlay, mediumPlay, easyPlay};
}


const play = playGame();

const easy = () => {
  play.easyPlay();
  popUpWraps.style.display = 'none';
}
const medium = () => {
  play.mediumPlay();
  popUpWraps.style.display = 'none';
}
const hard = () => {
  play.hardPlay();
  popUpWraps.style.display = 'none';
}

easyBtn.addEventListener('click', (e) => easy());
mediumBtn.addEventListener('click', (e) => medium());
hardBtn.addEventListener('click', (e) => hard());