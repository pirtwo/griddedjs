const Cell2D = require('./cell2d');

class Grid2D {
    /**
     * creates new instance of Grid2D.
     * @param {Number} x number of columns
     * @param {Number} y number of rows
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cells = new Array(x * y)
            .fill(undefined)
            .map(i => {
                return new Cell2D(this, undefined);
            });
    }

    *[Symbol.iterator]() {
        let count = 0;
        for (let i = 0; i < this.cells.length; i++) {
            count++;
            yield this.cells[i];
        }
        return count;
    }

    /**
     * iterate through grid rows.
     */
    * getY() {
        let count = 0;
        for (let i = 0; i < this.y; i++) {
            count++;
            yield this.cells.slice(i * this.x, i * this.x + this.x);
        }
        return count;
    }

    /**
     * iterate through grid columns.
     */
    * getX() {
        let count = 0;
        for (let i = 0; i < this.x; i++) {
            count++;
            yield this.cells.filter((value, index) => (index - i) % this.x === 0);
        }
        return count;
    }

    /**
     * fills the grid with a value, array or value returned from fn.
     * @example
     * let grid = new Grid2D(3, 3);
     * grid.fill(() => {
     *      return Math.random();
     * });
     * 
     * @param {any} value 
     */
    fill(value) {
        for (let i = 0; i < this.cells.length; i++) {
            if (Array.isArray(value) && i < value.length)
                this.cells[i].value = value[i];
            else if (typeof value === 'function')
                this.cells[i].value = value();
            else
                this.cells[i].value = value;
        }
    }

    /**
     * returns a cell based on its position in the grid.
     * @param {Number} x 
     * @param {Number} y 
     */
    cell(x, y) {
        return this.cells[y * this.x + x];
    }

    /**
     * inserts a new column in given index, shifts remainig columns to right.
     * @param {Number} index 
     */
    insertX(index) {
        if (index < 0 || index > this.x)
            throw Error(`Grid2D: invalid X index ${index} in insert.`);

        for (let i = this.y - 1; i >= 0; i--) {
            let elmIndex = i * this.x + index;
            this.cells.splice(elmIndex, 0, new Cell2D(this, undefined));
        }
        this.x++;

        return [...this.getX()][index];
    }

    /**
     * inserts a new row in given index, shifts remainig rows down.
     * @param {Number} index 
     */
    insertY(index) {
        if (index < 0 || index > this.y)
            throw Error(`Grid2D: invalid Y index ${index} in insert.`);

        this.cells.splice(index * this.x, 0, ...new Array(this.x).fill(undefined).map(i => {
            return new Cell2D(this, undefined);
        }));
        this.y++;

        return [...this.getY()][index];
    }

    /**
     * deletes the column with provided index from grid.
     * @param {Number} index 
     */
    deleteX(index) {
        if (index < 0 || index > this.x)
            throw Error(`Grid2D: invalid X index ${index} in delete.`);

        for (let i = this.y - 1; i >= 0; i--) {
            let elmIndex = i * this.x + index;
            this.cells.splice(elmIndex, 1);   
        }
        this.x--;
    }

    /**
     * deletes the row with provided index from grid.
     * @param {Number} index 
     */
    deleteY(index) {
        if (index < 0 || index > this.y)
            throw Error(`Grid2D: invalid Y index ${index} in delete.`);

        this.cells.splice(index * this.x, this.x);
        this.y--;
    }
}

module.exports = Grid2D;