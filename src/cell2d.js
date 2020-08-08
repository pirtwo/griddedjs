/**
 * wrapper class for storing values in grid2d.
 */
class Cell2D {
    /**
     * 
     * @param {Grid2D} grid 
     * @param {any} value 
     */
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
     * returns cell x and y position in the grid.
     */
    position() {
        let i = this.index();
        let y = Math.floor(i / this.grid.x);
        let x = i - y * this.grid.x;
        return { x, y }
    }

    /**
     * returns array of adjacent cells.
     * @returns {Array}
     */
    adjacent() {
        let { x, y } = this.position();

        return [...this.grid].filter(cell => (
                (cell.position().y >= y - 1 && cell.position().y <= y + 1 && cell.position().x === x) ||
                (cell.position().x >= x - 1 && cell.position().x <= x + 1 && cell.position().y === y)) &&
            !(cell.position().y === y && cell.position().x === x)
        );
    }

    /**
     * returns array of neighbor cells.
     */
    neighbor() {
        let { x, y } = this.position();

        return [...this.grid].filter(cell =>
            (cell.position().y >= y - 1 && cell.position().y <= y + 1) &&
            (cell.position().x >= x - 1 && cell.position().x <= x + 1) &&
            !(cell.position().y === y && cell.position().x === x)
        );
    }
}

module.exports = Cell2D;