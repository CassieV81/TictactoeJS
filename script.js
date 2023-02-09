'use strict'

const grids = document.querySelectorAll('.grid');
let gameInProgress = false;

const playGame = () => {


  const humanPlay = () => {
    grids.forEach(grid => {
      grid.addEventListener('click', function() {
        if (grid.innerText == '') {
          grid.innerText = 'x';
          gameInProgress = true;
          if (gameInProgress) {
            setTimeout(computerPlay, 1000);
          }
        }
      });
    });
  };
  
  const computerPlay = () => {
    let random = grids[Math.floor(Math.random() * grids.length)];
    if (random.innerText == '') {
      random.innerText = 'o'; 
      gameInProgress = false;
    } else {
      computerPlay();
    }
  };

  const checkWin = () => {
    
  }

  return {humanPlay, computerPlay};
}

const human = playGame();
const computer = playGame();
human.humanPlay();
// const play = () => {
   
//     human.humanPlay();
//     if (gameInProgress) {
//       computer.computerPlay;
//     }
// } 
// play();
// console.log(grids.length)


