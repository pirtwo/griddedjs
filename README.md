# Gridded.js
[![Build Status](https://travis-ci.com/pirtwo/griddedjs.svg?branch=master)](https://travis-ci.com/pirtwo/griddedjs)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

### 2D grid library for JavaScript
create 2d array for storing your data in a grid structure and access data with x (column) and y (row) coordinates.

### Usage
**important**: library exports the Cell2D class for wrappeing user data, all values should be wrapped with Cell2D class before adding to the Grid2D.

```javascript
import { Grid2D, Cell2D } from 'gridded';

// Grid2D(x, y)
// create a grid with 2 rows and 3 columns
const grid = new Grid2D(3, 2);

// fill with value
grid.fill(1);

// fill with array
grid.fill([ 1, 2, 3, 4, 5, 6]); 

// fill with callback fn
grid.fill(() => Math.random());

// fill with custom method
grid.cells = new Array(6).fill(undefined).map(i => new Cell2D(grid, Math.random()));

let rows = [...grid.getY()];
let cols = [...grid.getX()];

// iterate through cells
for (cell in grid) {
    // get or set cell value
    cell.value *= 2;
    
    // get cell position in grid {x, y}
    cell.position();

    // get cell index in the grid.cells array
    cell.index();

    // get all neighbours of cell
    cell.neighbours().forEach(i => { 
        // do stuff with neighbours
    });
    
    // get all adjacents of cell
    cell.adjacents().forEach(i => { 
        // do stuff with adjacents
    });
}

// iterate through grid rows
for (row in grid.getY()) {
    // do stuff with rows
}

// iterate through grid cols
for (col in grid.getX()) {
    // do stuff with columns
}

// add new row
grid.insertY(3).forEach(cell => {
    // do stuff with new cells
});

// add new column
grid.insertX(3).forEach(newCell => {
    // do stuff with new cells
});

// delete row
grid.deleteY(3);

// delete column
grid.deleteX(3);
```

