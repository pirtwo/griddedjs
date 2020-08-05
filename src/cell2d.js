class Cell2D {
    constructor(grid, value = undefined) {
        this.grid = grid;
        this.value = value;
    }

    /**
     * returns cell index in the array.
     */
    index() {
        return this.grid.cells.indexOf(this);
    }

    /**
     * returns cell x and y coordinates in the grid.
     */
    coord() {
        let i = this.index();
        let y = Math.floor(i / this.grid.x);
        let x = i - y * this.grid.x;
        return { x, y }
    }

    /**
     * returns array of adjacent cells.
     * @returns {Array}
     */
    adjacents() {
        let { x, y } = this.coord();

        return [...this.grid].filter(cell => (
                (cell.coord().y >= y - 1 && cell.coord().y <= y + 1 && cell.coord().x === x) ||
                (cell.coord().x >= x - 1 && cell.coord().x <= x + 1 && cell.coord().y === y)) &&
            !(cell.coord().y === y && cell.coord().x === x)
        );
    }

    /**
     * returns array of neighbour cells.
     */
    neighbours() {
        let { x, y } = this.coord();

        return [...this.grid].filter(cell =>
            (cell.coord().y >= y - 1 && cell.coord().y <= y + 1) &&
            (cell.coord().x >= x - 1 && cell.coord().x <= x + 1) &&
            !(cell.coord().y === y && cell.coord().x === x)
        );
    }
}

module.exports = Cell2D;