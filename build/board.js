const BUTTON_BLOCK = 'ships__cell-button';
const SHIP_BLOCK = 'ships__cell-ship';
export class Board {
    constructor(rootElement) {
        this.rootElement = rootElement;
    }
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
        this.attackHit(3, 1);
    }
    renderBoard(type, size = 10) {
        let table = `<table class="ships__board ships__board--${type}">`;
        table += '<tbody>';
        for (let i = 0; i < size; i++) {
            table += `<tr data-row="${i}" class="ships__board-row">`;
            for (let j = 0; j < size; j++) {
                table += `<td data-col="${j}" class="ships__cell">`;
                table += '<button class="ships__cell-button">';
                table += '<span class="ships__cell-button-label">click</span>';
                table += '</button>';
                table += '</td>';
            }
            table += '</tr>';
        }
        table += '</tbody>';
        table += '</table>';
        return table;
    }
    defendMiss(row, col) {
        this.markAttack(row, col, 'defend', 'miss');
    }
    defendHit(row, col) {
        this.markAttack(row, col, 'defend', 'hit');
    }
    attackMiss(row, col) {
        this.markAttack(row, col, 'attack', 'miss');
    }
    attackHit(row, col) {
        this.markAttack(row, col, 'attack', 'hit');
    }
    markAttack(row, col, grid, attackType) {
        const cell = document.querySelector(`table.ships__board--${grid} tr[data-row="${row}"] td[data-col="${col}"] button`);
        if (cell) {
            const classList = this.removeAttackClassNames(cell);
            classList.push(`${BUTTON_BLOCK}--${attackType}`);
            cell.className = classList.join(' ');
        }
    }
    renderShip({ grid, ship, from, direction }) {
        const cellFrom = document.querySelector(`table.ships__board--${grid} tr[data-row="${from.row}"] td[data-col="${from.col}"] button`);
        if (direction === 'left') {
            const cellTo = document.querySelector(`table.ships__board--${grid} tr[data-row="${from.row}"] td[data-col="${from.col + 2}"] button`);
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
        for (let i = from.col + 1; i < from.col + 2; i++) {
            const cell = document.querySelector(`table.ships__board--${grid} tr[data-row="${from.row}"] td[data-col="${i}"] button`);
            if (cell) {
                const classList = this.removeShipClassNames(cell);
                classList.push(SHIP_BLOCK);
                classList.push(`${SHIP_BLOCK}--horizontal`);
                cell.className = classList.join(' ');
            }
        }
    }
    removeAttackClassNames(element) {
        return Array.from(element.classList).filter(item => item !== `${BUTTON_BLOCK}--hit` && item !== `${BUTTON_BLOCK}--miss`);
    }
    removeShipClassNames(element) {
        return Array.from(element.classList).filter(item => !item.startsWith(SHIP_BLOCK));
    }
}
//# sourceMappingURL=board.js.map