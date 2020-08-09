# Gridded.js
[![Build Status](https://travis-ci.com/pirtwo/griddedjs.svg?branch=master)](https://travis-ci.com/pirtwo/griddedjs)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/pirtwo/griddedjs/issues)
[![](https://img.shields.io/github/license/pirtwo/griddedjs)](https://github.com/pirtwo/griddedjs/blob/master/LICENSE)


### 2D grid library for JavaScript
The aim of this library is to make working with 2D arrays easier. With the help of this library you can easily create a grid structure, and store or retrieve your data with ease in that context.

### Usage
**important**: library exports the Cell2D class for wrapping cell data, all values should be wrapped with Cell2D class before adding to the Grid2D.<br/>
**important**: all indexes starts from 0.

```javascript
import { Grid2D, Cell2D } from 'gridded';

// Grid2D(x, y)
// create a grid with 2 rows and 3 columns
const grid = new Grid2D(3, 2);

// fill with value
grid.fill(1);

// fill with array
grid.fill([ 1, 2, 3, 4, 5, 6]); 

// fill with callback function
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

### Grid2D methods
#### constructor(x, y)
This method takes to integer number ( x > 0 and y > 0) as a dimensions of 2D array and fill the array with cells (class Cell2D) with undefined initial values.
```
            X
    ________________
    |(x0,y0)|(x1,y0)|
 Y  |(x0,y1)|(x1,y1)|
    |(x0,y2)|(x1,y2)|
    ________________
```

#### getX()
This is a generator function to let us iterate through the columns of the grid (x0, x1, x2, ...) with using the for in or spread values.
```javascript
let column0 = [...grid.getX()][0];

for (col in grid.getX()) {
    // do stuff
}
```

#### getY()
This is a generator function to let us iterate through the rows of the grid (y0, y1, y2, ...) with using the for in or spread values.
```javascript
let row0 = [...grid.getY()][0];

for (row in grid.getY()) {
    // do stuff
}
```

#### fill(value)
This method fills the grid (2D array) with provided value, the value could be a primitive or array. The provided values will wrap with class Cell2D before adding to the 2D array. Also you can provide a callback function that will be called for each cell and the returned value from function will be used as cell value.

#### cell(x, y)
This method will return the cell (class Cell2D) at position x and y if exists.

#### insertX(index)
This method will insert a new column at index and will shift the columns after index + 1 to the right. The new cells will be initialized with undefined value and will be returned as an array.
```javascript
let grid = new Grid2D(2, 5);    // create grid with 5 row and 2 column
let newCol = grid.insertX(3);   // insert new column to the end

```

#### insertY(index)
This method will insert a new row at index and will shift the rows after index + 1 to down. The new cells will be initialized with undefined value and will be returned as an array.
```javascript
let grid = new Grid2D(2, 2);    // create grid with 5 row and 2 column
let newRow = grid.insertY(1);   // insert new row between row-0 and row-2
```

#### deleteX(index)
This method deletes the column[index] of the grid.

#### deleteY(index)
This method deletes the row[index] of the grid.


### Cell2D methods
#### constructor(grid, value = undefined)
This class is a wrapper for the values in the 2D array and takes two arguments, first one is the related grid that this cells is belong to and the second one is the value of the cell.

#### index()
Returns the index of the cell (all cells in Grid2D class will be stored in a an array).
```javascript
let grid = new Grid2D(2, 2);
let cell = [...grid][3];
cell.index();                   //result will be 3
```

#### position()
Returns the position of the cell in the grid {x, y}.
```javascript
let grid = new Grid2D(2, 2);
let {x, y} = grid.cell(1, 1).position();  // result will be x = 1 and y = 1
```

#### adjacent()
Returns the adjacent of the cell as an array.
```
            X
    _________________________
    |       | adj-1 |       |
 Y  | adj-2 |(x1,y1)| adj-3 |
    |       | adj-4 |       |
    _________________________
```

#### neighbor()
Returns the neighbors of the cell as an array.
```
            X
    _________________________
    | nei-1 | nei-2 | nei-3 |
 Y  | nei-4 |(x1,y1)| nei-5 |
    | nei-6 | nei-7 | nei-8 |
    _________________________
```
