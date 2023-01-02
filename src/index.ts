import { Board } from './board.js';

function play() {
  const board = new Board(document.querySelector('.ships__game') as HTMLElement);
  board.render()
}

play()
