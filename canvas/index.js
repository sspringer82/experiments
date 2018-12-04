document.addEventListener('DOMContentLoaded', () => {
  const matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.translate(0.5, 0.5);
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  matrix.forEach((x, row) => {
    x.forEach((y, col) => {
      const dot = new Dot(ctx, col + 1, row + 1);
      dot.render();
      matrix[row][col] = dot;
    });
  });
});

function drawDot(ctx, x, y, size) {}

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
