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
        this.attackHit(1, 1);
        this.attackMiss(1, 2);
    }
    renderBoard(type, size = 10) {
        let table = `<table class="ships__board ships__board--${type}">`;
        table += '<tbody>';
        for (let i = 0; i < size; i++) {
            table += `<tr data-row="${i}" class="ships__board-row">`;
            for (let j = 0; j < size; j++) {
                table += `<td data-col="${j}" class="ships__board-cell">`;
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
        //
    }
    defendHit(row, col) {
        //
    }
    attackMiss(row, col) {
        this.attack(row, col, 'attack', 'miss');
    }
    attackHit(row, col) {
        this.attack(row, col, 'attack', 'hit');
    }
    attack(row, col, grid, type) {
        const cell = document.querySelector(`table.ships__board--${grid} tr[data-row="${row}"] td[data-col="${col}"] button`);
        if (cell) {
            const className = 'ships__cell-button';
            cell.className = `${className} ${className}--${type}`;
        }
    }
}
//# sourceMappingURL=board.js.map