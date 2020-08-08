# Gridded.js
[![Build Status](https://travis-ci.com/pirtwo/griddedjs.svg?branch=master)](https://travis-ci.com/pirtwo/griddedjs)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/pirtwo/griddedjs/issues)
[![](https://img.shields.io/github/license/pirtwo/griddedjs)](https://github.com/pirtwo/griddedjs/blob/master/LICENSE)


### 2D grid library for JavaScript
The porpose of this library is to make working with 2D arrays easier. With the help of this library you can
easily create a grid structure, and store or retrieve your data with ease in that context.

### Usage
**important**: library exports the Cell2D class for wrapping cell data, all values should be wrapped with Cell2D class before adding to the Grid2D.

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

    // get all neighbor of cell
    cell.neighbor().forEach(i => { 
        // do stuff with neighbor
    });
    
    // get all adjacent of cell
    cell.adjacent().forEach(i => { 
        // do stuff with adjacent
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

