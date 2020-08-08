const Grid2d = require('../src/grid2d');

const x = randInt(1, 10);
const y = randInt(1, 10);
const grid = new Grid2d(x, y);
grid.fill([...new Array(x * y).keys()]);

test('test cell2d', () => {
    let randX = randInt(0, x - 1),
        randY = randInt(0, y - 1),
        sample = grid.cell(randX, randY);

    expect(
            sample.position().x === randX &&
            sample.position().y === randY &&
            sample.value === (randY * x + randX))
        .toBe(true);
});

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}