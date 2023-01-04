export type Coord = {
  row: number;
  col: number;
}

const BUTTON_BLOCK = 'ships__cell-button';
const SHIP_BLOCK = 'ships__cell-ship';

export type Ship = 'patrol' | 'destroyer' | 'submarine' | 'battleship' | 'aircraft';
export type Direction = 'left' | 'down' | 'right' | 'up';

export class Board {
  constructor(private rootElement: HTMLElement) {}

  render(size = 10) {
    this.rootElement.innerHTML = [
      this.renderBoard('attack', size),
      this.renderBoard('defend', size)
    ].join('\n');

    // temp:
    this.defendHit(1, 1);
    this.defendMiss(1, 2);
    this.attackHit(1, 1);
    this.attackMiss(1, 2);
    this.renderShip({
      grid: 'attack',
      ship: 'destroyer',
      from: { row: 3, col: 1 },
      direction: 'left'
    });
    this.renderShip({
      grid: 'attack',
      ship: 'destroyer',
      from: { row: 5, col: 1 },
      direction: 'down'
    });
    this.attackHit(5, 1);
  }

  private renderBoard(type: 'attack' | 'defend', size = 10) {
    let table = `<table class="ships__board ships__board--${type}">`;
    table += '<tbody>'
    for (let i = 0; i < size; i++) {
      table += `<tr data-row="${i}" class="ships__board-row">`;
      for (let j = 0; j < size; j++) {
        table += `<td data-col="${j}" class="ships__cell">`
        table += '<button class="ships__cell-button">'
        table += '<span class="ships__cell-button-label">click</span>'
        table += '</button>'
        table += '</td>'
      }
      table += '</tr>'
    }
    table += '</tbody>'
    table += '</table>'
    return table;
  }

  defendMiss(row: number, col: number) {
    this.markAttack(row, col, 'defend', 'miss');
  }

  defendHit(row: number, col: number) {
    this.markAttack(row, col, 'defend', 'hit');
  }

  attackMiss(row: number, col: number) {
    this.markAttack(row, col, 'attack', 'miss');
  }

  attackHit(row: number, col: number) {
    this.markAttack(row, col, 'attack', 'hit');
  }

  private markAttack(row: number, col:number, grid: 'attack' | 'defend', attackType: 'hit' | 'miss') {
    const cell = document.querySelector(`table.ships__board--${grid} tr[data-row="${row}"] td[data-col="${col}"] button`)
    if (cell) {
      const classList = this.removeAttackClassNames(cell);
      classList.push(`${BUTTON_BLOCK}--${attackType}`)
      cell.className = classList.join(' ');
    }
  }

  renderShip({ grid, ship, from, direction }: {
    grid: 'attack' | 'defend';
    ship: Ship,
    from: Coord;
    direction: Direction;
  }) {
    const cellFrom = document.querySelector(`table.ships__board--${grid} tr[data-row="${from.row}"] td[data-col="${from.col}"] button`)
    if (direction === 'left') {
      const cellTo = document.querySelector(`table.ships__board--${grid} tr[data-row="${from.row}"] td[data-col="${from.col + 1}"] button`);
      if (cellTo) {
        const classList = this.removeShipClassNames(cellTo);
        classList.push(SHIP_BLOCK);
        classList.push(`${SHIP_BLOCK}--right`);
        cellTo.className = classList.join(' ');
      }
    }

    if (cellFrom) {
      const classList = this.removeShipClassNames(cellFrom);
      classList.push(SHIP_BLOCK);
      classList.push(`${SHIP_BLOCK}--left`);
      cellFrom.className = classList.join(' ');
    }
    // for (let i = from.col + 1; i < from.col + 2; i++) {
    //   const cell = document.querySelector(`table.ships__board--${grid} tr[data-row="${from.row}"] td[data-col="${i}"] button`);
    //   if (cell) {
    //     const classList = this.removeShipClassNames(cell);
    //     classList.push(SHIP_BLOCK);
    //     classList.push(`${SHIP_BLOCK}--horizontal`);
    //     cell.className = classList.join(' ');
    //   }
    // }
  }

  private removeAttackClassNames(element: Element) {
    return Array.from(element.classList).filter(item =>
      item !== `${BUTTON_BLOCK}--hit` && item !== `${BUTTON_BLOCK}--miss`);
  }

  private removeShipClassNames(element: Element) {
    return Array.from(element.classList).filter(item => !item.startsWith(SHIP_BLOCK));
  }
}
