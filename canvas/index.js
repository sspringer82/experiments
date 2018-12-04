document.addEventListener('DOMContentLoaded', () => {
  const matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.translate(0.5, 0.5);
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  matrixWalker(matrix, (x, y, cell) => {
    matrix[x][y] = new Dot(ctx, x + 1, y + 1);
  });
  matrixWalker(matrix, (x, y, dot) => dot.render());

  canvas.addEventListener('click', e => {
    matrixWalker(
      matrix,
      (x, y, dot) => dot.isClicked(e.offsetX, e.offsetY) && dot.toggle(),
    );
  });
});

function matrixWalker(matrix, cb) {
  matrix.forEach((x, rowIndex) =>
    x.forEach((item, colIndex) => cb(rowIndex, colIndex, item)),
  );
}

class Dot {
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
}

// wave
// color wave
// connect
