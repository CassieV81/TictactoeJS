'use strict'

const grids = document.querySelectorAll('.grid');

const player = (name, marker) => {
  return { name, marker };
}

grids.forEach(grid => {
  grid.addEventListener('click', function() {
    grid.innerText = 'o';
  });
});
