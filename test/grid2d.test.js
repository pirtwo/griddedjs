const Grid2d = require('../src/grid2d');

const x = randInt(1, 10);
const y = randInt(1, 10);
const grid = new Grid2d(x, y);
grid.fill([...new Array(x * y).keys()]);

test('test constructor', () => {
  expect(grid.x).toBe(x);
  expect(grid.y).toBe(y);
  expect(grid.cells.length).toBe(x * y);

  //console.log([...grid.getY()]);
});

test('test getX', () => {
  let index = randInt(0, x - 1);
  let sample = [...grid.getX()][index].map(i => i.value);

  let count = 0;
  sample.forEach(elm => {
    expect(elm).toBe(count * x + index);
    count++;
  });
});

test('test getY', () => {
  let index = randInt(0, y - 1);
  let sample = [...grid.getY()][index].map(i => i.value);

  let count = 0;
  sample.forEach(elm => {
    expect(elm).toBe(index * x + count);
    count++;
  });
});

test('test insert', () => {
  let sample, indexX = randInt(0, x - 1), indexY = randInt(0, y - 1);

  grid.insertX(indexX).map(i => i.value = 'z');
  sample = [...grid.getX()][indexX].map(i => i.value);
  expect(sample.every(i => i === 'z'));

  //console.log([...grid.getY()]);

  grid.insertY(indexY).map(i => i.value = 'x');
  sample = [...grid.getY()][indexY].map(i => i.value);
  expect(sample.every(i => i === 'x'));

  //console.log([...grid.getY()]);
});


function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}