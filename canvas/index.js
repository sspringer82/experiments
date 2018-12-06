document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const matrix = new Matrix(ctx, 6, 3);
  ctx.translate(0.5, 0.5);
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  let interval = null;

  matrix.fill(Dot.getInstance);

  matrix.matrixWalker((x, y, dot) => dot.render());
  canvas.addEventListener('click', matrix.createClickHandler(matrix));

  document.getElementById('wave').addEventListener('click', doTheWave);
  function doTheWave() {
    if (interval === null) {
      let current = 0;
      interval = setInterval(() => {
        matrix.reset();
        for (let i = 0; i < matrix.rows; i++) {
          matrix.getItem(current, i).toggle();
        }
        current = current < matrix.cols - 1 ? current + 1 : 0;
      }, 1000);
    } else {
      clearInterval(interval);
      interval = null;
    }
  }
});

class Matrix {
  constructor(ctx, cols, rows) {
    this.ctx = ctx;
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array(cols)
      .fill(0, 0, cols)
      .map(row => new Array(rows).fill(0, 0, rows));
  }

  fill(creator) {
    this.matrixWalker(
      (x, y, cell) => (this.matrix[x][y] = creator(this.ctx, x + 1, y + 1)),
    );
  }

  matrixWalker(cb) {
    this.matrix.forEach((x, rowIndex) =>
      x.forEach((item, colIndex) => cb(rowIndex, colIndex, item)),
    );
  }

  createClickHandler() {
    return e =>
      this.matrixWalker(
        (x, y, dot) => dot.isClicked(e.offsetX, e.offsetY) && dot.toggle(),
      );
  }

  getItem(x, y) {
    return this.matrix[x][y];
  }

  reset() {
    this.matrixWalker((x, y, cell) => cell.reset());
  }
}

class Dot {
  static getInstance(ctx, x, y) {
    return new Dot(ctx, x, y);
  }

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.spaceHorizontal = 30;
    this.spaceVertical = 30;
    this.x = x * this.spaceHorizontal;
    this.y = y * this.spaceVertical;
    this.size = 4;
    this.active = false;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  isClicked(x, y) {
    return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2) < this.size;
  }

  clear() {
    this.ctx.clearRect(
      this.x - this.size - 1,
      this.y - this.size - 1,
      2 * this.size + 2,
      2 * this.size + 2,
    );
  }

  toggle() {
    this.clear();
    if (this.active) {
      this.size = 4;
      this.ctx.fillStyle = 'black';
    } else {
      this.size = 8;
      this.ctx.fillStyle = 'red';
    }
    this.active = !this.active;
    this.render();
  }

  reset() {
    this.clear();
    this.size = 4;
    this.active = false;
    this.ctx.fillStyle = 'black';
    this.render();
  }
}

// wave
// color wave
// connect
