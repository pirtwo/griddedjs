# Gridded.js
[![Build Status](https://travis-ci.com/pirtwo/griddedjs.svg?branch=master)](https://travis-ci.com/pirtwo/griddedjs)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/pirtwo/griddedjs/issues)
[![](https://img.shields.io/github/license/pirtwo/griddedjs)](https://github.com/pirtwo/griddedjs/blob/master/LICENSE)


### 2D grid library for JavaScript
The aim of this library is to make working with 2D arrays easier. With the help of this library, you can easily create a grid structure and store or retrieve your data with ease in that context.

### install
```
npm i --save griddedjs
```

### Usage
**important**: This library exports the Cell2D class for wrapping cell data, all values should be wrapped with Cell2D class before adding to the Grid2D.<br/>
**important**: All indexes starts from 0.

```javascript
import { Grid2D, Cell2D } from 'griddedjs';

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
This method takes two integer numbers ( x > 0 and y > 0) as dimensions of the grid and fills it with cells (class Cell2D). The initial value of each cell is undefined.
```
            X
    ________________
    |(x0,y0)|(x1,y0)|
 Y  |(x0,y1)|(x1,y1)|
    |(x0,y2)|(x1,y2)|
    ________________
```

#### getX()
Generator function, lets us iterate through the columns of the grid (x0, x1, x2, ...).
```javascript
let column0 = [...grid.getX()][0];

for (col in grid.getX()) {
    // do stuff
}
```

#### getY()
Generator function, lets us iterate through the rows of the grid (y0, y1, y2, ...).
```javascript
let row0 = [...grid.getY()][0];

for (row in grid.getY()) {
    // do stuff
}
```

#### fill(value)
This method fills the grid with provided value, the value could be a primitive or array. Provided values will be wrapped by class Cell2D. Also, you can provide a callback function that will be called for each cell and the returned value from the function will be used as cell value.
```javascript
let grid = new Grid2D(2, 2);
grid.fill(0);                   // fill with value
grid,fill([0, 0, 1, 1]          // fill with array
grid.fill(() => {               // fill with callback function
    return { price: 2.99 }
});

```

#### cell(x, y)
Returns the cell (class Cell2D) at position x and y.
```javascript
let grid = new Grid2D(2, 2);
let cell = grid.cell(0, 1);
```

#### insertX(index)
This method will insert a new column at the parameter index. New cells will be initialized with undefined value and will be returned as an array.
```javascript
let grid = new Grid2D(2, 5);    // create grid with 5 row and 2 column
let newCol = grid.insertX(3);   // insert new column to the end

```

#### insertY(index)
This method will insert a new row at the parameter index. New cells will be initialized with undefined value and will be returned as an array.
```javascript
let grid = new Grid2D(2, 2);    // create grid with 5 row and 2 column
let newRow = grid.insertY(1);   // insert new row between row-0 and row-2
```

#### deleteX(index)
This method deletes the column[index] of the grid.
```javascript
let grid = new Grid2D(2, 2);
grid.deleteX(0);                // deletes first column of grid
```

#### deleteY(index)
This method deletes the row[index] of the grid.
```javascript
let grid = new Grid2D(2, 2);
grid.deleteY(0);                // deletes first row of grid
```


### Cell2D methods
#### constructor(grid, value = undefined)
This class is a wrapper for the cell value. The first parameter is the related grid that this cell belongs to, the second parameter is the value of the cell.

#### index()
Returns the index of the cell (all cells in Grid2D class will be stored in an array).
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
```javascript
let grid = new Grid2D(3, 3);
grid.cell(1, 1).adjacent().forEach(i => {
    // do stuff
});
```
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
```javascript
let grid = new Grid2D(3, 3);
grid.cell(1, 1).neighbor().forEach(i => {
    // do stuff
});
```
```
            X
    _________________________
    | nei-1 | nei-2 | nei-3 |
 Y  | nei-4 |(x1,y1)| nei-5 |
    | nei-6 | nei-7 | nei-8 |
    _________________________
```
