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
    this.size = 2;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.ctx.fill();
  }
}
